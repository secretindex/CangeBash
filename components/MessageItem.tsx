"use client";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import axios from "axios";
import Link from "next/link";

import { Button } from "./ui/button";
import { useContext } from "react";

import { CardAndFluxContext } from "./context/CardAndFlux";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";

interface MessageProps {
  title: string;
  date: Date;
  conversaId: string;
  atendente: string;
}

const MessageItem = ({ title, date, conversaId, atendente }: MessageProps) => {
  const [dia, hora] = date.toLocaleString().split(", ");
  const supabase = createClient();

  const cnfContext = useContext(CardAndFluxContext);

  const handleAssociateMessageToExistingCard = async () => {
    try {
      const res = await axios.post(
        "/api/cange/card-comment",
        {
          card_id: cnfContext?.cardAndFlux?.cardId,
          flow_id: cnfContext?.cardAndFlux?.fluxId,
          description: `A mensagem do link "https://cange-bash-integra.vercel.app/mensagem?conversa_id=${conversaId}", conversa com ${title} no dia ${dia}, às ${hora}, foi associada ao cartão!`,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const { data, error } = await supabase
        .from("conversas")
        .insert({
          flux_id: cnfContext!.cardAndFlux!.fluxId,
          card_id: cnfContext!.cardAndFlux!.cardId,
          conversa_id: conversaId,
        })
        .select();

      if (error) {
        toast.error(error.message);
        return;
      }

      console.log(res.data);
      console.log(data);

      toast.success("mensagem adicionada ao cartão");
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <Item variant={"outline"} size={"sm"}>
      <ItemContent>
        <ItemTitle className="text-md text-neutral-600 font-semibold">{title}</ItemTitle>
        <ItemDescription className="text-xs">
          Conversa realizada no dia {dia}, às {hora}
        </ItemDescription>
        <ItemDescription className="text-xs">
          Atendente: <span className="text-neutral-800 font-semibold">{atendente}</span>
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Ações</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64">
            <DropdownMenuLabel>Mensagem</DropdownMenuLabel>
            <DropdownMenuGroup>
              <Link
                className="cursor-default"
                href={
                  "/embed?flux_id=" +
                  cnfContext?.cardAndFlux?.fluxId +
                  "&conversa_id=" +
                  conversaId
                }
              >
                <DropdownMenuItem>
                  Criar novo a partir da mensagem
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={handleAssociateMessageToExistingCard}>
                Adicionar ao cartão
              </DropdownMenuItem>
              <Link
                className="cursor-default"
                href={"/mensagem?conversa_id=" + conversaId}
              >
                <DropdownMenuItem>Visualizar Mensagem</DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ItemActions>
    </Item>
  );
};

export default MessageItem;
