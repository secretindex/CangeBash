import { betterAuth } from "better-auth";
import { createClient } from "./supabase/server";

// use with supabase
export const auth = betterAuth({
  database: {
    client: createClient(),
  },
  emailAndPassword: {
    enabled: true,
  },
})