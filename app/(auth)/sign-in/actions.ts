"use server"

import { createClient } from "@/utils/supabase/server";

export async function signIn(email: string, password: string) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return { error: error.message };
    }

    await supabase.auth.refreshSession()

    return { data };
}