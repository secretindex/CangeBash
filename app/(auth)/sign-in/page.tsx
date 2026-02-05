"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/client";
import { BaseSyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const handleLogin = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    router.push("/");
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
          <Button className="bg-indigo-500 hover:bg-indigo-600 text-white" onClick={handleLogin}>Entrar</Button>
          <Button variant="link" className="text-center">Esqueci minha senha</Button>
        </CardContent>
      </Card>
    </div>
  );
}