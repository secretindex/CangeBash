"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/client";
import { BaseSyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

export default function SignInPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const { data, error } = await response.json();

    console.log(data, error)

    if (error) {
      toast.error(error.message.includes("Invalid") ? "Email ou senha inválidos" : error.message);
    } else {
      toast.success("Login realizado com sucesso");
      router.push("/");
    }
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Login</CardTitle>
          <CardDescription>Faça login na sua conta</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <Label>Email</Label>
            <Input type="email" placeholder="Email" value={email} onChange={(val: BaseSyntheticEvent) => setEmail(val.target.value)} />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Senha</Label>
            <Input type="password" placeholder="Senha" value={password} onChange={(val: BaseSyntheticEvent) => setPassword(val.target.value)} />
          </div>
          <Button className="bg-indigo-500 hover:bg-indigo-600 text-white" onClick={handleLogin} disabled={loading}>{loading ? <Spinner /> : "Entrar"}</Button>
          <Button variant="link" className="text-center">Esqueci minha senha</Button>
        </CardContent>
      </Card>
    </div>
  );
}