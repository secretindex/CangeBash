"use client";

import { createClient } from "@/utils/supabase/client";
import useSWR from "swr";
import { Spinner } from "@/components/ui/spinner";

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

const MensagensFlux = () => {
  const { data, error, isLoading, mutate } = useSWR("conversations", fetcher);

  const messages = data?.messages;

  return (
    <div className="flex flex-col gap-2 w-full items-center mt-14">
      <div className="flex border rounded-md p-4 shadow-md bg-background w-2/3 flex-col">
        <h2 className="text-xl font-bold text-primary">Mensagens do Atendimento</h2>
        <p className="text-sm text-muted-foreground">Total de mensagens: {data?.count}</p>
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
                  />
                )
                ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default MensagensFlux;
