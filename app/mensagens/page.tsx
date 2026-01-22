"use client";

import { createClient } from "@/utils/supabase/client";
import useSWR from "swr";

const fetcher = async (table: string) => {
  const client = createClient();
  const { data, error } = await client.from(table).select("*");

  console.log(data);

  return data as Array<{
    id: number;
    flux_id: number;
    card_id: string;
    conversa_id: string;
    created_at: string;
  }>;
};

import mockConversas from "@/components/message_api_mock";
import MessageItemMessages from "@/components/MessageItemMessages";

const MensagensFlux = () => {
  const { data, error, isLoading, mutate } = useSWR("conversas", fetcher);

  // data.ticket.contact.name
  // data.ticket.user.name
  // data.ticket.queue.queue
  // data.ticket.messages (Array)
  // Messages 👉 msg.body
  // msg.created_at
  // msg.userId == null 👉 cliente não tem userId, então eu uso isso pra botar as mensagens do cliente na esquerda e do atendente na direita

  return (
    <div>
      <h2>Mensagens flux</h2>
      <div className="flex flex-col gap-2">
        {data &&
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
          })}
      </div>
    </div>
  );
};

export default MensagensFlux;
