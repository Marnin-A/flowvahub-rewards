"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import type { StreakStatus } from "@/types/database";

const STREAK_POINTS = 5;

export async function getStreakStatus(): Promise<StreakStatus | null> {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return null;
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("current_streak, last_streak_claim")
        .eq("id", user.id)
        .single();

    if (!profile) {
        return null;
    }

    const lastClaim = profile.last_streak_claim
        ? new Date(profile.last_streak_claim)
        : null;
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Check if user can claim today
    let canClaimToday = true;
    if (lastClaim) {
        const lastClaimDate = new Date(
            lastClaim.getFullYear(),
            lastClaim.getMonth(),
            lastClaim.getDate()
        );
        canClaimToday = lastClaimDate.getTime() < today.getTime();
    }

    // Calculate streak days for current week (Monday to Sunday)
    const dayOfWeek = now.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);
    monday.setHours(0, 0, 0, 0);

    // Use admin client to bypass RLS for reading transactions
    const adminClient = createAdminClient();
    const { data: transactions, error: txError } = await adminClient
        .from("point_transactions")
        .select("created_at")
        .eq("user_id", user.id)
        .eq("type", "streak")
        .gte("created_at", monday.toISOString())
        .order("created_at", { ascending: true });

    if (txError) {
        console.error("Error fetching streak transactions:", txError);
    }

    // Create array of 7 booleans for each day of the week
    const streakDays = Array(7).fill(false);
    if (transactions) {
        transactions.forEach((tx) => {
            const txDate = new Date(tx.created_at);
            // Normalize to local date for comparison
            const txLocalDate = new Date(
                txDate.getFullYear(),
                txDate.getMonth(),
                txDate.getDate()
            );
            const txDay = txLocalDate.getDay();
            const index = txDay === 0 ? 6 : txDay - 1; // Convert to Monday=0, Sunday=6
            streakDays[index] = true;
        });
    }

    return {
        current_streak: profile.current_streak || 0,
        can_claim_today: canClaimToday,
        last_claim_date: profile.last_streak_claim,
        streak_days: streakDays,
    };
}

export async function claimDailyStreak() {
    const supabase = await createClient();
    const adminClient = createAdminClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return { error: "Not authenticated" };
    }

    // Get current streak status
    const status = await getStreakStatus();
    if (!status?.can_claim_today) {
        return { error: "Already claimed today" };
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("current_streak, last_streak_claim, points_balance")
        .eq("id", user.id)
        .single();

    if (!profile) {
        return { error: "Profile not found" };
    }

    const lastClaim = profile.last_streak_claim
        ? new Date(profile.last_streak_claim)
        : null;
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Check if streak should continue or reset
    let newStreak = 1;
    if (lastClaim) {
        const lastClaimDate = new Date(
            lastClaim.getFullYear(),
            lastClaim.getMonth(),
            lastClaim.getDate()
        );
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        // If last claim was yesterday, continue streak
        if (lastClaimDate.getTime() === yesterday.getTime()) {
            newStreak = (profile.current_streak || 0) + 1;
        }
    }

    // Update profile using admin client
    const { error: updateError } = await adminClient
        .from("profiles")
        .update({
            current_streak: newStreak,
            last_streak_claim: now.toISOString(),
            points_balance: (profile.points_balance || 0) + STREAK_POINTS,
        })
        .eq("id", user.id);

    if (updateError) {
        console.error("Error updating profile:", updateError);
        return { error: updateError.message };
    }

    // Record transaction using admin client (RLS blocks INSERT)
    const { error: txError } = await adminClient.from("point_transactions").insert({
        user_id: user.id,
        amount: STREAK_POINTS,
        type: "streak",
        description: `Daily streak day ${newStreak}`,
    });

    if (txError) {
        console.error("Error inserting transaction:", txError);
    }

    // Create streak notification if milestone reached
    if (newStreak === 7 || newStreak === 30 || newStreak === 100) {
        await adminClient.from("notifications").insert({
            user_id: user.id,
            type: "streak",
            title: `${newStreak} Day Streak! 🔥`,
            description: `Amazing! You've maintained a ${newStreak}-day streak. Keep it up!`,
        });
    }

    revalidatePath("/");
    return { success: true, newStreak, pointsEarned: STREAK_POINTS };
}
