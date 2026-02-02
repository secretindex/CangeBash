"use client";

import { createClient } from "@/utils/supabase/client";
import useSWR from "swr";

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
      message: object;
    }>;
    count: number;
  };
};

import MessageItemMessages from "@/components/MessageItemMessages";

const MensagensFlux = () => {
  const { data, error, isLoading, mutate } = useSWR("conversations", fetcher);

  const messages = data?.messages;
  const innerMessages = messages?.map((message) => message.message);

  return (
    <div className="flex flex-col gap-2 w-full items-center mt-14">
      <div className="flex border rounded-md p-4 shadow-md bg-background w-2/3 flex-col">
        <h2 className="text-xl font-bold bg-linear-to-br from-indigo-500 to-violet-500 bg-clip-text text-transparent">Mensagens flux</h2>
        <p className="text-sm text-neutral-600">Total de mensagens: {data?.count}</p>
      </div>
      <div className="flex flex-col gap-2 w-2/3 border rounded-md p-4 shadow-md bg-background">
        {messages?.map((message) => (
          <MessageItemMessages
            key={message.id}
            title={message.message!.ticket.contact.name}
            date={new Date(message.message!.ticket.createdAt)}
            card_id={message.message!.card_id}
            flow_id={message.message!.flow_id}
          />
        ))}
        {/* {data &&
          data!.map((con) => {
            const conversa = mockConversas.find(
              (c) => c.conversaId === con.conversa_id,
            );
            // let cardName, fluxName;

            return (
              <MessageItemMessages
                key={conversa!.conversaId + con.created_at}
                title={conversa!.cliente.nome}
                date={new Date(conversa!.criadoEm)}
                card_id={con.card_id}
                flow_id={`${con.flux_id}`}
              />
            );
          })} */}
      </div>
    </div>
  );
};

export default MensagensFlux;
