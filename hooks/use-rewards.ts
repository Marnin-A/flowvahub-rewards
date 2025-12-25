"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getRewards,
    claimReward,
    getUserRewardClaims,
} from "@/lib/actions/rewards";
import { profileKeys } from "./use-profile";

export const rewardKeys = {
    all: ["rewards"] as const,
    list: () => [...rewardKeys.all, "list"] as const,
    claims: () => [...rewardKeys.all, "claims"] as const,
};

export function useRewards() {
    return useQuery({
        queryKey: rewardKeys.list(),
        queryFn: getRewards,
    });
}

export function useRewardClaims() {
    return useQuery({
        queryKey: rewardKeys.claims(),
        queryFn: getUserRewardClaims,
    });
}

export function useClaimReward() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: claimReward,
        onSuccess: () => {
            // Invalidate rewards, claims, and profile (for points update)
            queryClient.invalidateQueries({ queryKey: rewardKeys.all });
            queryClient.invalidateQueries({ queryKey: profileKeys.all });
        },
    });
}
