"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getStreakStatus, claimDailyStreak } from "@/lib/actions/streak";
import { profileKeys } from "./use-profile";

export const streakKeys = {
    all: ["streak"] as const,
    status: () => [...streakKeys.all, "status"] as const,
};

export function useStreak() {
    return useQuery({
        queryKey: streakKeys.status(),
        queryFn: async () => {
            const status = await getStreakStatus();
            if (!status) throw new Error("Streak status not found");
            return status;
        },
    });
}

export function useClaimStreak() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: claimDailyStreak,
        onSuccess: () => {
            // Invalidate both streak and profile queries to refresh points
            queryClient.invalidateQueries({ queryKey: streakKeys.all });
            queryClient.invalidateQueries({ queryKey: profileKeys.all });
        },
    });
}
