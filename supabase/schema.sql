-- ===========================================
-- FlowvaHub Rewards Database Schema
-- ===========================================

-- Profiles (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  referral_code text unique not null,
  referred_by uuid references public.profiles(id),
  points_balance integer default 0 not null,
  current_streak integer default 0 not null,
  last_streak_claim timestamptz,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Notifications
create table public.notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  type text not null check (type in ('streak', 'welcome', 'referral', 'reward', 'system')),
  title text not null,
  description text not null,
  is_read boolean default false not null,
  created_at timestamptz default now() not null
);

-- Rewards Catalog
create table public.rewards (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  points_cost integer not null,
  status text not null check (status in ('unlocked', 'locked', 'coming-soon')),
  image text not null,
  is_active boolean default true not null,
  created_at timestamptz default now() not null
);

-- Reward Claims
create table public.reward_claims (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  reward_id uuid references public.rewards(id) on delete cascade not null,
  status text not null check (status in ('pending', 'approved', 'rejected', 'fulfilled')),
  claimed_at timestamptz default now() not null
);

-- Point Transactions (audit log)
create table public.point_transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  amount integer not null,
  type text not null check (type in ('streak', 'referral', 'claim', 'redemption', 'bonus')),
  description text,
  created_at timestamptz default now() not null
);

-- ===========================================
-- Row Level Security Policies
-- ===========================================

alter table public.profiles enable row level security;
alter table public.notifications enable row level security;
alter table public.rewards enable row level security;
alter table public.reward_claims enable row level security;
alter table public.point_transactions enable row level security;

-- Profiles
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Notifications
create policy "Users can view own notifications"
  on public.notifications for select
  using (auth.uid() = user_id);

create policy "Users can update own notifications"
  on public.notifications for update
  using (auth.uid() = user_id);

create policy "Users can delete own notifications"
  on public.notifications for delete
  using (auth.uid() = user_id);

-- Rewards (all authenticated users can view)
create policy "Authenticated users can view rewards"
  on public.rewards for select
  using (auth.role() = 'authenticated');

-- Reward Claims
create policy "Users can view own claims"
  on public.reward_claims for select
  using (auth.uid() = user_id);

create policy "Users can create own claims"
  on public.reward_claims for insert
  with check (auth.uid() = user_id);

-- Point Transactions
create policy "Users can view own transactions"
  on public.point_transactions for select
  using (auth.uid() = user_id);

-- ===========================================
-- Triggers and Functions
-- ===========================================

-- Generate unique referral code
create or replace function generate_referral_code()
returns text as $$
begin
  return 'ref-' || substr(md5(random()::text || now()::text), 1, 8);
end;
$$ language plpgsql;

-- Auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
declare
  new_referral_code text;
begin
  -- Generate unique referral code
  new_referral_code := generate_referral_code();
  
  -- Insert new profile
  insert into public.profiles (id, email, referral_code)
  values (new.id, new.email, new_referral_code);
  
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Update timestamp trigger
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute procedure update_updated_at();

-- Create welcome notification when profile is created
create or replace function public.create_welcome_notification()
returns trigger as $$
begin
  insert into public.notifications (user_id, type, title, description)
  values (
    new.id,
    'welcome',
    'Welcome to Flowva! 🎉',
    'We''re thrilled to have you on board! Start earning points by completing daily streaks and referring friends.'
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_profile_created on public.profiles;
create trigger on_profile_created
  after insert on public.profiles
  for each row execute procedure public.create_welcome_notification();

-- ===========================================
-- Indexes for performance
-- ===========================================

create index idx_notifications_user_id on public.notifications(user_id);
create index idx_notifications_is_read on public.notifications(is_read);
create index idx_reward_claims_user_id on public.reward_claims(user_id);
create index idx_point_transactions_user_id on public.point_transactions(user_id);
create index idx_profiles_referral_code on public.profiles(referral_code);
