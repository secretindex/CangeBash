"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

import axios from "axios";
import useSWR from "swr";
import mockConversas from "./message_api_mock";
import MessageItem from "./MessageItem";
import { useEffect } from "react";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

const fetcher = async ([id_card, flow_id, token]: string[]) => {
  const client = createClient();
  const { data } = await client
    .from("conversations")
    .select("*")
    .order("created_at", { ascending: false });

  const res = await axios.get(
    `/api/cange/card?id_card=${id_card}&flow_id=${flow_id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  console.log("data ", data);

  return { card: res.data, messages: data };
};

const GetCard = ({
  id_card,
  flow_id,
}: {
  id_card: string;
  flow_id: string;
}) => {
  const { data, error, isLoading, mutate } = useSWR(
    [id_card, flow_id],
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );

  useEffect(() => {
    if (data === undefined) {
      toast.error("Nenhum cartão foi encontrado!");
    }
  }, [data]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-1/2 cursor-pointer">Abrir Cartão</Button>
      </DialogTrigger>
      <DialogContent>
        {error || !data?.card ? (
          <>
            <DialogHeader>
              <DialogTitle>Nenhum cartão selecionado!</DialogTitle>
              <DialogDescription>
                Selecione um cartão antes de associar uma mensagem
              </DialogDescription>
            </DialogHeader>
          </>
        ) : (
          <DialogHeader>
            <DialogTitle>{data.card && data.card.title}</DialogTitle>
            <DialogDescription className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <span>Adicione uma nova mensagem ao card</span>
                <ScrollArea className="h-[300px] w-full overflow-hidden">
                  <ScrollBar orientation="vertical" />
                  <div className="flex flex-col gap-2">
                    {data.messages?.map((conversa) => {
                      return (
                        <MessageItem
                          key={conversa.id}
                          title={conversa.message.ticket.contact.name}
                          date={new Date(conversa.message.ticket.createdAt)}
                          conversaId={conversa.id}
                          atendente={conversa.message.ticket.user.name}
                        />
                      );
                    })}
                  </div>
                </ScrollArea>
              </div>
            </DialogDescription>
          </DialogHeader>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GetCard;
