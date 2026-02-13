
import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const createClient = () =>
  createBrowserClient(
    supabaseUrl!,
    supabaseKey!,
    {
      cookies: {
        getAll() {
          return document.cookie.split(";").map((cookie) => {
            const [name, value] = cookie.split("=");
            return { name, value };
          });
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            document.cookie = `${name}=${value};${options.path ? `path=${options.path};` : ""}${options.expires ? `expires=${options.expires};` : ""}${options.maxAge ? `max-age=${options.maxAge};` : ""}${options.domain ? `domain=${options.domain};` : ""}${options.secure ? "secure;" : ""}${options.sameSite ? `sameSite=${options.sameSite};` : ""}`;
          });
        },
      },
    }
  );
