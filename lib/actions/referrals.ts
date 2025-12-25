"use server";

import { createClient } from "@/lib/supabase/server";
import type { ReferralStats } from "@/types/database";

export async function getReferralStats(): Promise<ReferralStats | null> {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return null;
    }

    // Count users who were referred by this user
    const { count: referralCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("referred_by", user.id);

    // Get total points earned from referrals
    const { data: transactions } = await supabase
        .from("point_transactions")
        .select("amount")
        .eq("user_id", user.id)
        .eq("type", "referral");

    const pointsEarned = transactions?.reduce((sum, tx) => sum + tx.amount, 0) || 0;

    return {
        referral_count: referralCount || 0,
        points_earned_from_referrals: pointsEarned,
    };
}

export async function getReferralLink(): Promise<string | null> {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return null;
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("referral_code")
        .eq("id", user.id)
        .single();

    if (!profile?.referral_code) {
        return null;
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://app.flowvahub.com";
    return `${baseUrl}/signup?ref=${profile.referral_code}`;
}
