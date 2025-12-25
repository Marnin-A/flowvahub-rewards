"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfile, updateProfile } from "@/lib/actions/profile";
import type { Profile } from "@/types/database";

export const profileKeys = {
    all: ["profile"] as const,
    detail: () => [...profileKeys.all, "detail"] as const,
};

export function useProfile() {
    return useQuery({
        queryKey: profileKeys.detail(),
        queryFn: async () => {
            const profile = await getProfile();
            if (!profile) throw new Error("Profile not found");
            return profile;
        },
    });
}

export function useUpdateProfile() {
    const queryClient = useQueryClient();

    return async (data: Partial<Pick<Profile, "full_name" | "avatar_url">>) => {
        const result = await updateProfile(data);
        if (result.success) {
            queryClient.invalidateQueries({ queryKey: profileKeys.all });
        }
        return result;
    };
}
