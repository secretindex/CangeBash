"use client"

import { useState, useEffect, createContext, ReactNode } from "react"
import { createClient } from "@/utils/supabase/client"
import { Session } from "@supabase/supabase-js"

const supabase = createClient()

export const SessionContext = createContext<Session | null>(null)

interface ContextProps {
  children: ReactNode;
}

export default function UserSessionContext({ children }: ContextProps) {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          setSession(null)
        } else if (session) {
          setSession(session)
        }
      })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  )
}