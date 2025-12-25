"use client";

import { useQuery } from "@tanstack/react-query";
import { getReferralStats, getReferralLink } from "@/lib/actions/referrals";

export const referralKeys = {
    all: ["referrals"] as const,
    stats: () => [...referralKeys.all, "stats"] as const,
    link: () => [...referralKeys.all, "link"] as const,
};

export function useReferralStats() {
    return useQuery({
        queryKey: referralKeys.stats(),
        queryFn: async () => {
            const stats = await getReferralStats();
            if (!stats) throw new Error("Referral stats not found");
            return stats;
        },
    });
}

export function useReferralLink() {
    return useQuery({
        queryKey: referralKeys.link(),
        queryFn: async () => {
            const link = await getReferralLink();
            if (!link) throw new Error("Referral link not found");
            return link;
        },
    });
}
