// Database types for Supabase tables

export type Profile = {
    id: string;
    email: string;
    full_name: string | null;
    avatar_url: string | null;
    referral_code: string;
    referred_by: string | null;
    points_balance: number;
    current_streak: number;
    last_streak_claim: string | null;
    created_at: string;
    updated_at: string;
};

export type NotificationType =
    | "streak"
    | "welcome"
    | "referral"
    | "reward"
    | "system";

export type Notification = {
    id: string;
    user_id: string;
    type: NotificationType;
    title: string;
    description: string;
    is_read: boolean;
    created_at: string;
};

export type RewardStatus = "unlocked" | "locked" | "coming-soon";

export type Reward = {
    id: string;
    title: string;
    description: string;
    points_cost: number;
    status: RewardStatus;
    image: string;
    is_active: boolean;
    created_at: string;
};

export type RewardClaimStatus = "pending" | "approved" | "rejected" | "fulfilled";

export type RewardClaim = {
    id: string;
    user_id: string;
    reward_id: string;
    status: RewardClaimStatus;
    claimed_at: string;
};

export type PointTransactionType =
    | "streak"
    | "referral"
    | "claim"
    | "redemption"
    | "bonus";

export type PointTransaction = {
    id: string;
    user_id: string;
    amount: number;
    type: PointTransactionType;
    description: string | null;
    created_at: string;
};

// API Response types
export type ReferralStats = {
    referral_count: number;
    points_earned_from_referrals: number;
};

export type StreakStatus = {
    current_streak: number;
    can_claim_today: boolean;
    last_claim_date: string | null;
    streak_days: boolean[]; // Array of 7 booleans for current week
};
