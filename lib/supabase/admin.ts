import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Admin client that bypasses RLS - use only for trusted server-side operations
export function createAdminClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    if (!supabaseServiceRoleKey) {
        throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
    }

    return createSupabaseClient(supabaseUrl, supabaseServiceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });
}
