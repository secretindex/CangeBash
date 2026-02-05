"use client"

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useContext } from "react";
import { SessionContext } from "./context/UserSession";

const SignOut = () => {
  const supabase = createClient();
  const router = useRouter();
  supabase.auth.signOut();
  const session = useContext(SessionContext);

  return(
    <Button onClick={() => router.push("/sign-in")} variant="outline" className={session ? "text-red-500 hover:text-red-600 border-none shadow-none" : "hidden"}>
      <LogOut />
    </Button>
  )
}

export default SignOut;
