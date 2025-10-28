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
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-select";

const fetcher = async (ids: string) => {
  // first comes Card ID, then Flow ID
  const cardAndFlow = ids.split(",");

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_CANGE_API_URL}/card?id_card=${cardAndFlow[0]}&flow_id=${cardAndFlow[1]}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_CANGE}`,
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

  console.log(data);

  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer justify-center w-1/2 bg-violet-400 text-white flex items-center hover:bg-[#8e51ff] hover:text-white transition-all rounded-md px-2 text-sm ease-in-out">
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
            <DialogDescription>
              <div>
                <Label>Add new message to card</Label>
                <Input type="text"></Input>
              </div>
              <Button className="rounded-md">Adicionar mensagem</Button>
            </DialogDescription>
          </DialogHeader>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GetCard;
