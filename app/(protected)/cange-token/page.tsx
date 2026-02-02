"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { useContext, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { TokenContext } from "@/components/context/CangeToken";

export default function CangeToken() {
  const [token, setToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const tokenContext = useContext(TokenContext);

  const authenticateToken = async () => {
    const authenticated = await fetch("https://api.cange.me/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `https://app.cange.me`,
      },
      body: JSON.stringify({
        email: "caio@futuratec.srv.br",
        apikey: token
      })
    })

    const jsonAuthenticated = await authenticated.json();

    console.log(jsonAuthenticated);
    console.log(jsonAuthenticated.token);

    if (authenticated.status === 200) {
      toast.success("Token autenticado com sucesso");
    }

    handleSaveToken(jsonAuthenticated.token as string);
  }

  const handleSaveToken = async (authenticatedToken: string) => {
    setIsLoading(true);
    const client = createClient();

    console.log("bom dia")

    const { data: tokenData, error: tokenError } = await client.from("cange-token").select("*", { count: "exact" });

    if (tokenError) {
      toast.error("Erro ao buscar token");
      return;
    }

    if (tokenData.length > 0 || tokenContext?.id) {
      const now = new Date().getTime()

      const { data, error } = await client.from("cange-token").update({
        token: authenticatedToken,
        created_at: new Date(now).toISOString(),
      }).eq("id", tokenContext?.id);
      if (error) {
        toast.error("Erro ao atualizar token");
        return;
      }

      console.log("atualizado no banco")

      toast.success("Token atualizado com sucesso");
      setIsLoading(false);
      return;
    }

    const { data, error } = await client.from("cange-token").insert({
      token: authenticatedToken,
    });

    if (error) {
      toast.error("Erro ao salvar token");
      return;
    }

    console.log("inserido no banco")

    setToken("");

    toast.success("Token salvo com sucesso");
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col gap-2 w-full items-center mt-14">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Inserir Token da API do Cange
          </CardTitle>
          <CardDescription className="text-sm text-neutral-600">Crie um novo Token no Cange e cole aqui. Ele atualiza automaticamente.</CardDescription>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm text-neutral-600">
            <div className="rounded-md bg-neutral-100 p-2 overflow-hidden">
              <p className="text-sm text-neutral-800 font-bold truncate">Token ativo:</p>

              <p className="text-sm text-neutral-500 truncate">{tokenContext?.token}</p>
              <p className="text-sm text-neutral-900 truncate">Criado em: {new Date(tokenContext?.created_at!).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}</p>

              <p className="text-sm text-orange-600 truncate">Expira em: {new Date(new Date(tokenContext?.created_at!).getTime() + 8 * 60 * 60 * 1000).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}</p>
            </div>
          </CardDescription>
        </CardContent>
        <CardContent className="flex flex-col gap-3">
          <Input placeholder="Token" type="password" value={token} onChange={(e) => setToken(e.target.value)} className="w-full" />
          <Button onClick={authenticateToken} className="w-full" disabled={isLoading}>{isLoading ? <Spinner /> : "Autenticar"}</Button>
        </CardContent>
      </Card>
    </div>
  )
}