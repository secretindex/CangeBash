"use client"

import { useContext } from "react";
import { createContext } from "react";
import { createClient } from "@/utils/supabase/client";

import { useState, useEffect, ReactNode } from "react";

export interface TokenContextType {
  id: string | null;
  token: string | null;
  created_at: string | null;
}

export const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider = ({ children }: { children: ReactNode }) => {
  const [id, setId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [created_at, setCreatedAt] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const client = createClient();
        const { data, error } = await client.from("cange-token").select("*");

        if (error) throw error;

        setId(data[0].id);
        setToken(data[0].token);
        setCreatedAt(data[0].created_at);
      } catch (err) {
        console.log(err);
      }
    };

    fetchToken();
  }, []);

  return (
    <TokenContext.Provider value={{ id, token, created_at }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error("useToken deve ser usado dentro de um TokenProvider");
  }
  return context;
};
