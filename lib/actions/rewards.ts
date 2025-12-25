"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { Reward, RewardClaim } from "@/types/database";

export async function getRewards(): Promise<Reward[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("rewards")
        .select("*")
        .eq("is_active", true)
        .order("points_cost", { ascending: true });

    if (error) {
        console.error("Error fetching rewards:", error);
        return [];
    }

    return data as Reward[];
}

export async function getRewardsByStatus(
    status: "unlocked" | "locked" | "coming-soon"
): Promise<Reward[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("rewards")
        .select("*")
        .eq("is_active", true)
        .eq("status", status)
        .order("points_cost", { ascending: true });

    if (error) {
        console.error("Error fetching rewards:", error);
        return [];
    }

    return data as Reward[];
}

export async function getUserRewardClaims(): Promise<RewardClaim[]> {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return [];
    }

    const { data, error } = await supabase
        .from("reward_claims")
        .select("*")
        .eq("user_id", user.id)
        .order("claimed_at", { ascending: false });

    if (error) {
        console.error("Error fetching reward claims:", error);
        return [];
    }

    return data as RewardClaim[];
}

export async function claimReward(rewardId: string) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return { error: "Not authenticated" };
    }

    // Get the reward details
    const { data: reward, error: rewardError } = await supabase
        .from("rewards")
        .select("*")
        .eq("id", rewardId)
        .single();

    if (rewardError || !reward) {
        return { error: "Reward not found" };
    }

    // Get user's current points balance
    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("points_balance")
        .eq("id", user.id)
        .single();

    if (profileError || !profile) {
        return { error: "Profile not found" };
    }

    // Check if user has enough points
    if (profile.points_balance < reward.points_cost) {
        return { error: "Insufficient points" };
    }

    // Create the claim
    const { error: claimError } = await supabase.from("reward_claims").insert({
        user_id: user.id,
        reward_id: rewardId,
        status: "pending",
    });

    if (claimError) {
        return { error: claimError.message };
    }

    // Deduct points
    const { error: updateError } = await supabase
        .from("profiles")
        .update({
            points_balance: profile.points_balance - reward.points_cost,
        })
        .eq("id", user.id);

    if (updateError) {
        return { error: updateError.message };
    }

    // Record transaction
    await supabase.from("point_transactions").insert({
        user_id: user.id,
        amount: -reward.points_cost,
        type: "redemption",
        description: `Redeemed ${reward.title}`,
    });

    // Create notification
    await supabase.from("notifications").insert({
        user_id: user.id,
        type: "reward",
        title: "Reward Claimed! 🎁",
        description: `You've successfully claimed ${reward.title}. We'll process it shortly.`,
    });

    revalidatePath("/");
    return { success: true };
}
