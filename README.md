# FlowvaHub Rewards

A pixel-perfect recreation of the FlowvaHub Rewards dashboard, demonstrating solid React fundamentals, meaningful Supabase integration, and proper handling of loading, empty, and error states.

> **Live Demo**: [flowvahub-rewards-tau.vercel.app](https://flowvahub-rewards-tau.vercel.app/)

---

## ✨ Features

| Feature                | Description                                                                      |
| ---------------------- | -------------------------------------------------------------------------------- |
| 🔥 **Daily Streaks**   | Claim points daily with visual weekly progress; streaks reset if a day is missed |
| 👥 **Referral System** | Share a unique link and earn 25 points when referred users sign up               |
| 🎁 **Rewards Catalog** | Browse and redeem rewards with real-time points balance checks                   |
| 🔔 **Notifications**   | Real-time alerts for streak milestones, referrals, and system messages           |
| 🔐 **Authentication**  | Email/password and Google OAuth with password strength validation                |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and pnpm (or npm/yarn)
- A Supabase project ([create one free](https://supabase.com))

### 1. Clone & Install

```bash
git clone https://github.com/Marnin-A/flowvahub-rewards.git
cd flowvahub-rewards
pnpm install
```

### 2. Configure Environment

Create `.env.local` in the project root:

```env
# Supabase (required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# OAuth / Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Find these values in **Supabase Dashboard → Settings → API**.

### 3. Set Up Database

Run the SQL schema in your Supabase SQL Editor:

1. Go to **SQL Editor** in your Supabase dashboard
2. Copy the contents of [`supabase/schema.sql`](./supabase/schema.sql)
3. Execute the query

This creates:

- **Tables**: `profiles`, `notifications`, `rewards`, `reward_claims`, `point_transactions`
- **RLS Policies**: Users can only access their own data
- **Triggers**: Auto-create profile on signup, welcome notification, referral code generation
- **Functions**: `increment_points`, `increment_referral_count` (RPC functions for atomic updates)
- **Indexes**: Performance indexes on frequently queried columns

### 4. Configure Google OAuth (Optional)

1. Go to **Authentication → Providers** in Supabase
2. Enable Google and add your OAuth credentials from [Google Cloud Console](https://console.cloud.google.com/)
3. Set the authorized redirect URI to: `https://your-project-id.supabase.co/auth/v1/callback`

### 5. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 📜 Available Scripts

| Command      | Description              |
| ------------ | ------------------------ |
| `pnpm dev`   | Start development server |
| `pnpm build` | Build for production     |
| `pnpm start` | Start production server  |
| `pnpm lint`  | Run ESLint               |

---

## 🛠 Tech Stack

| Layer                  | Technology                                                      |
| ---------------------- | --------------------------------------------------------------- |
| **Framework**          | Next.js 16 (App Router)                                         |
| **UI**                 | React 19, Tailwind CSS 4, Ant Design 5, shadcn/ui, Lucide Icons |
| **Backend & Database** | Supabase (Auth, PostgreSQL, Row Level Security)                 |
| **Data Fetching**      | TanStack Query (React Query)                                    |
| **Forms**              | React Hook Form + Zod validation                                |
| **Language**           | TypeScript                                                      |

---

## 📁 Project Structure

```
flowvahub-rewards/
├── app/                     # Next.js App Router
│   ├── (auth)/              # Auth pages (login, signup)
│   │   ├── login/
│   │   └── signup/
│   ├── auth/callback/       # OAuth callback handler
│   ├── dashboard/           # Main dashboard pages
│   │   └── earn-rewards/
│   ├── globals.css          # Tailwind config & custom animations
│   ├── layout.tsx           # Root layout with providers
│   └── loading.tsx          # Global loading state
├── components/
│   ├── earn-points/         # Streak, referral, journey components
│   │   ├── earn-more-points/
│   │   ├── refer-and-earn/
│   │   └── reward-journey/
│   ├── header/              # Header, notifications, sign-out
│   ├── redeem-rewards/      # Rewards catalog components
│   └── ui/                  # Reusable primitives
│       ├── button.tsx
│       ├── empty-state.tsx
│       ├── error-state.tsx
│       ├── form-input.tsx
│       ├── password-input.tsx
│       ├── sidebar.tsx
│       ├── skeletons.tsx    # Loading skeletons for all features
│       ├── social-login-button.tsx
│       └── tabs.tsx
├── hooks/                   # TanStack Query hooks
│   ├── use-notifications.ts
│   ├── use-profile.ts
│   ├── use-referrals.ts
│   ├── use-rewards.ts
│   └── use-streak.ts
├── lib/
│   ├── actions/             # Server Actions
│   │   ├── auth.ts          # Sign in/up, OAuth, sign out
│   │   ├── notifications.ts # Mark read, delete
│   │   ├── profile.ts       # Fetch profile
│   │   ├── referrals.ts     # Referral stats & link
│   │   ├── rewards.ts       # Fetch & redeem rewards
│   │   └── streak.ts        # Streak status & claim
│   ├── schemas/             # Zod validation schemas
│   ├── supabase/            # Supabase client utilities
│   │   ├── admin.ts         # Service role client
│   │   ├── client.ts        # Browser client
│   │   └── server.ts        # Server client
│   └── utils.ts
├── providers/               # React context providers
│   └── query-provider.tsx   # TanStack Query provider
├── supabase/
│   └── schema.sql           # Database schema, RLS, triggers
└── types/
    └── database.ts          # TypeScript type definitions
```

---

## 🎯 Key Implementation Details

### Authentication Flow

- **Email/Password**: Server-side validation with Zod; real-time password strength feedback
- **Google OAuth**: Separate flows for sign-in vs. sign-up; referral codes passed through OAuth callback
- **Session Management**: Supabase Auth with automatic token refresh via `@supabase/ssr`

### Data Fetching with TanStack Query

Each feature has its own custom hook that handles:

- Loading states (skeleton components)
- Error states (retry buttons)
- Cache invalidation on mutations
- Optimistic updates where appropriate

### Supabase Row Level Security

All data access is secured at the database level:

<em>Note:</em> Admin operations (awarding referral points, creating notifications) use the service role client server-side.

### Custom Animations

Tailwind v4 theme-based animations registered in `globals.css`:

```css
@theme inline {
  --animate-shake-once: shake-once 0.6s;
  --animate-small-pulse-scale: small-pulse-scale 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

This enables variants like `group-hover:animate-shake-once`.

---

## 🏗 Architecture Decisions

### Trade-offs

| Decision                              | Trade-off                                                                                    |
| ------------------------------------- | -------------------------------------------------------------------------------------------- |
| **Supabase RLS over API middleware**  | Simpler security model but requires careful policy design; all data access rules live in SQL |
| **TanStack Query over SWR**           | More features (mutations, optimistic updates) but slightly larger bundle                     |
| **Server Actions over API routes**    | Cleaner colocation of logic but less RESTful; not ideal for external API consumers           |
| **Points stored directly on profile** | Fast reads but requires RPC functions for atomic updates                                     |

### Assumptions

1. **Single-device sessions**: Multi-device session sync is not implemented
2. **UTC-based streaks**: Daily reset based on UTC; may vary by user timezone
3. **Trusted referral codes**: No additional verification beyond code match at signup
4. **Server-side admin ops**: Referral point awards and notifications use service role without admin UI

### Limitations

- **Static rewards catalog**: Rewards are seeded manually via SQL; no admin CRUD interface
- **No email verification enforcement**: Users can access dashboard immediately after signup

---

## 🧪 Testing the Features

### Daily Streak

1. Log in and navigate to the Earn Rewards page
2. Click "Claim Today's Points" to earn 5 points
3. The button disables until the next day (UTC)
4. Weekly progress dots update to show claimed days

### Referral System

1. Copy your referral link from the Refer & Earn section
2. Open in incognito/another browser and sign up with the `?ref=` code
3. The referrer receives 25 points and a notification

### Rewards Catalog

1. Navigate to Redeem Rewards tab
2. Cards show lock/unlock status based on points balance
3. Click a reward to open the claim modal

### Notifications

1. Click the bell icon in the header
2. New notifications appear with unread indicator
3. Click to mark as read; swipe/click X to delete

---
