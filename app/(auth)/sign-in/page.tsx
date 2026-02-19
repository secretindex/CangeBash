"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BaseSyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { createClient } from "@/utils/supabase/client";
import { signIn } from "./actions";

export default function SignInPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);

    const data = await signIn(email, password);

    console.log(data)

    if (data.error) {
      toast.error(data.error);
      setLoading(false);
    } else {
      toast.success("Login realizado com sucesso");

      setLoading(false);
      router.push("/");
    }
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <Card className="w-full bg-primary-foreground dark:bg-card max-w-md">
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
          <Button variant={"default"} onClick={handleLogin} disabled={loading}>{loading ? <Spinner /> : "Entrar"}</Button>
          <Button variant="link" className="text-center">Esqueci minha senha</Button>
        </CardContent>
        <CardFooter>
          <Button variant="link" onClick={() => {
            window.open("https://wa.me/5581985053082?text=Oi,%20Caio!%20Por%20favor,%20cria%20minha%20conta%20no%20CangeBash!", "_blank");
          }} className="text-xs text-destructive w-full">Não tenho conta</Button>
        </CardFooter>
      </Card>
    </div>
  );
}