import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    const errorDescription = searchParams.get("error_description");
    const mode = searchParams.get("mode"); // "signin" or "signup"
    const referralCode = searchParams.get("ref");
    const next = searchParams.get("next") ?? "/";

    // Handle OAuth errors from provider
    if (error) {
        console.error("OAuth error:", error, errorDescription);
        const redirectPath = mode === "signup" ? "/signup" : "/login";
        return NextResponse.redirect(
            `${origin}${redirectPath}?error=${encodeURIComponent(errorDescription || error)}`
        );
    }

    if (code) {
        const supabase = await createClient();
        const { data: sessionData, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

        if (exchangeError) {
            console.error("Code exchange error:", exchangeError);
            const redirectPath = mode === "signup" ? "/signup" : "/login";
            return NextResponse.redirect(
                `${origin}${redirectPath}?error=${encodeURIComponent(exchangeError.message)}`
            );
        }

        const user = sessionData?.user;

        if (!user) {
            const redirectPath = mode === "signup" ? "/signup" : "/login";
            return NextResponse.redirect(
                `${origin}${redirectPath}?error=Authentication failed`
            );
        }

        // Check if this is a new user by looking at the created_at timestamp
        // If the user was created within the last 30 seconds, they're new
        const createdAt = new Date(user.created_at);
        const now = new Date();
        const isNewUser = (now.getTime() - createdAt.getTime()) < 30000; // 30 seconds

        // If this is a sign-in attempt but the user is new, reject it
        if (mode === "signin" && isNewUser) {
            // Sign out the newly created user
            await supabase.auth.signOut();

            return NextResponse.redirect(
                `${origin}/login?error=${encodeURIComponent("No account found with this Google account. Please sign up first.")}`
            );
        }

        // If this is a signup with a referral code and user is new, process the referral
        if (mode === "signup" && isNewUser && referralCode) {
            const adminClient = createAdminClient();

            // Find the referrer by their referral code
            const { data: referrer } = await adminClient
                .from("profiles")
                .select("id")
                .eq("referral_code", referralCode)
                .single();

            if (referrer) {
                // Update the new user's profile with the referrer's ID
                await adminClient
                    .from("profiles")
                    .update({ referred_by: referrer.id })
                    .eq("id", user.id);

                // Award points to the referrer
                await adminClient.from("point_transactions").insert({
                    user_id: referrer.id,
                    amount: 25,
                    type: "referral",
                    description: `Referral bonus for inviting ${user.email}`,
                });

                // Update referrer's points balance
                const { error: pointsError } = await adminClient.rpc("increment_points", {
                    points_to_add: 25,
                    target_user_id: referrer.id,
                });

                if (pointsError) {
                    console.error("Error updating points:", pointsError);
                }

                // Increment referrer's referral count
                const { error: referralCountError } = await adminClient.rpc("increment_referral_count", {
                    target_user_id: referrer.id,
                });

                if (referralCountError) {
                    console.error("Error updating referral count:", referralCountError);
                }

                // Create notification for referrer
                await adminClient.from("notifications").insert({
                    user_id: referrer.id,
                    type: "referral",
                    title: "New Referral! 🎉",
                    description: `Someone joined using your referral link! You earned 25 points.`,
                });
            }
        }

        // Successfully authenticated - redirect to destination
        return NextResponse.redirect(`${origin}${next}`);
    }

    // No code provided
    return NextResponse.redirect(`${origin}/login?error=auth_callback_error`);
}
