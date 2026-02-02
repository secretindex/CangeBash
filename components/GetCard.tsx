"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import axios from "axios";
import useSWR from "swr";
import mockConversas from "./message_api_mock";
import MessageItem from "./MessageItem";
import { useContext, useEffect } from "react";
import { toast } from "sonner";
import { TokenContext } from "./context/CangeToken";

const fetcher = async (ids: string) => {
  const cardAndFlow = ids.split(",");
  const token = useContext(TokenContext)

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_CANGE_API_URL}/card?id_card=${cardAndFlow[0]}&flow_id=${cardAndFlow[1]}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.token}`,
      },
    },
  );

  return res.data;
};

const GetCard = ({
  id_card,
  flow_id,
}: {
  id_card: number;
  flow_id: number;
}) => {
  const { data, error, isLoading, mutate } = useSWR(
    `${id_card},${flow_id}`,
    fetcher,
  );

  console.log(data, error);

  useEffect(() => {
    if (data === undefined) {
      toast.error("Nenhum cartão foi encontrado!");
    }
  }, [data]);

  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer justify-center w-1/2 bg-indigo-500 text-white flex items-center hover:bg-indigo-600 hover:text-white transition-all rounded-md px-2 text-sm ease-in-out">
        Abrir Cartão
      </DialogTrigger>
      <DialogContent>
        {error || !data ? (
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
            <DialogTitle>{data && data.title}</DialogTitle>
            <DialogDescription className="flex flex-col gap-6">
              <span className="flex flex-col gap-1">
                <span>Adicione uma nova mensagem ao card</span>
                <span className="flex flex-col gap-2">
                  {mockConversas.map((conversa) => {
                    return (
                      <MessageItem
                        key={conversa.conversaId}
                        title={conversa.cliente.nome}
                        date={new Date(conversa.criadoEm)}
                        conversaId={conversa.conversaId}
                      />
                    );
                  })}
                </span>
              </span>
            </DialogDescription>
          </DialogHeader>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GetCard;
