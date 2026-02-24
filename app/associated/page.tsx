"use client";

import { createClient } from "@/utils/supabase/client";
import useSWR from "swr";
import { Spinner } from "@/components/ui/spinner";
import { useState, useContext, useEffect } from "react";
import { CardAndFlux, CardAndFluxContext } from "@/components/context/CardAndFlux";

interface MessageContent {
  ticket: any;
  card_id: string;
  flow_id: string;
}

const fetcher = async (table: string) => {
  const client = createClient();
  const { data: messages, error } = await client.from(table).select("*").order("created_at", { ascending: false });
  const { count } = await client.from(table).select("*", { count: "exact" });

  console.log(messages);

  if (error) throw error;

  return { messages, count } as {
    messages: Array<{
      id: number;
      created_at: string;
      message: MessageContent;
    }>;
    count: number;
  };
};

import MessageItemMessages from "@/components/MessageItemMessages";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useRouter } from "next/navigation";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const fetcherFlux = async (table: string) => {
  const client = createClient();
  const { data } = await client.from(table).select("*");

  return data as Array<{
    id: number;
    fluxo_id: number;
    nome: string;
    created_at: string;
  }>;
};

const AssociatedMessages = () => {
  const { data, isLoading } = useSWR("conversations", fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });
  const { data: fluxos } = useSWR("fluxos", fetcherFlux, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });
  const [flux, setFlux] = useState<number>(0);

  const cnfContext = useContext(CardAndFluxContext);

  useEffect(() => {
    if (flux) {
      cnfContext?.setCardAndFlux(
        (prev) => ({ ...prev, fluxId: flux }) as CardAndFlux,
      );
    }
  }, [flux]);

  const messages = data?.messages;

  const router = useRouter();

  const handleSelectFlux = (e: string | number) => {
    if (e) {
      setFlux(e as number);

      cnfContext?.setCardAndFlux(
        (prev) => ({ ...prev, fluxId: e as number }) as CardAndFlux,
      );
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full items-center mt-14">
      <div className="flex border rounded-md p-4 shadow-md justify-between items-center bg-background w-2/3">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-primary">Mensagens do Atendimento</h2>
          <p className="text-sm text-muted-foreground">Total de mensagens: {data?.count}</p>
        </div>
        <div className="flex gap-2">
          <Select onValueChange={handleSelectFlux} defaultValue={cnfContext?.cardAndFlux?.fluxId.toString() || ""}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione um fluxo" />
            </SelectTrigger>
            <SelectContent className="w-full">
              {fluxos &&
                fluxos.map((flux, index) => {
                  return (
                    <SelectItem key={index} value={`${flux.fluxo_id}`}>
                      {flux.nome}
                    </SelectItem>
                  );
                })}
            </SelectContent>
          </Select>
          <Button variant={"outline"} size={"icon"} onClick={() => router.push("/")} className="cursor-pointer">
            <Home />
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-2/3 border rounded-md p-4 shadow-md bg-background">
        <ScrollArea className="h-[400px] w-full overflow-hidden">
          <ScrollBar orientation="vertical" className="h-full" />
          <div className="flex flex-col gap-2">
            {
              isLoading ? (
                <div className="flex gap-1 items-center text-sm">
                  <Spinner />
                  Carregando mensagens...
                </div>
              ) : (
                // sort by date from the most recent to the oldest
                messages?.sort((a, b) => new Date(b.message!.ticket.createdAt).getTime() - new Date(a.message!.ticket.createdAt).getTime()).map((message) => (
                  <MessageItemMessages
                    key={message.id}
                    title={message.message!.ticket.contact.name}
                    date={new Date(message.message!.ticket.createdAt)}
                    messageId={message.id}
                    card_id={message.message!.card_id}
                    flow_id={message.message!.flow_id}
                    atendente={message.message.ticket.user.name}
                  />
                )
                ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default AssociatedMessages;

