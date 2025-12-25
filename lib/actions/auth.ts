"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { passwordSchema } from "@/lib/schemas/signup-schema";

export async function signIn(email: string, password: string) {
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/", "layout");
    redirect("/");
}

export async function signUp(
    email: string,
    password: string,
    referralCode?: string
) {
    // Server-side password validation
    const passwordValidation = passwordSchema.safeParse(password);
    if (!passwordValidation.success) {
        return { error: passwordValidation.error.issues[0].message };
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/callback`,
        },
    });

    if (error) {
        return { error: error.message };
    }

    // If there's a referral code, update the user's profile
    if (referralCode && data.user) {
        // Find the referrer by their referral code
        const { data: referrer } = await supabase
            .from("profiles")
            .select("id")
            .eq("referral_code", referralCode)
            .single();

        if (referrer) {
            // Update the new user's profile with the referrer's ID
            await supabase
                .from("profiles")
                .update({ referred_by: referrer.id })
                .eq("id", data.user.id);

            // Award points to the referrer
            await supabase.from("point_transactions").insert({
                user_id: referrer.id,
                amount: 25,
                type: "referral",
                description: `Referral bonus for inviting ${email}`,
            });

            // Update referrer's points balance
            await supabase.rpc("increment_points", {
                user_id: referrer.id,
                points_to_add: 25,
            });

            // Create notification for referrer
            await supabase.from("notifications").insert({
                user_id: referrer.id,
                type: "referral",
                title: "New Referral! 🎉",
                description: `Someone joined using your referral link! You earned 25 points.`,
            });
        }
    }

    return { success: true, message: "Check your email to confirm your account" };
}

export async function signInWithGoogle() {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: process.env.NEXT_PUBLIC_OAUTH_CALLBACK,
        },
    });

    if (error) {
        return { error: error.message };
    }

    if (data.url) {
        redirect(data.url);
    }
}

export async function signOut() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    revalidatePath("/", "layout");
    redirect("/login");
}

export async function getCurrentUser() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    return user;
}
