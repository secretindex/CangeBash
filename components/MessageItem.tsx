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
import { useContext, useEffect } from "react";

import { CardAndFluxContext } from "./context/CardAndFlux";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import { TokenContext } from "./context/CangeToken";

interface MessageProps {
  title: string;
  date: Date;
  conversaId: string;
}

const MessageItem = ({ title, date, conversaId }: MessageProps) => {
  const token = useContext(TokenContext);
  const [dia, hora] = date.toLocaleString().split(", ");
  const supabase = createClient();

  useEffect(() => {
    console.log(token);
  }, []);

  const cnfContext = useContext(CardAndFluxContext);

  const handleAssociateMessageToExistingCard = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_CANGE_API_URL}/card-comment`,
        {
          card_id: cnfContext?.cardAndFlux?.cardId,
          flow_id: cnfContext?.cardAndFlux?.fluxId,
          description: `A mensagem do link ${conversaId}, conversa com ${title} no dia ${dia}, às ${hora}, foi associada ao cartão!`,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token?.token}`,
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

      toast.success("mensagem adicionada ao cartão");
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <Item variant={"outline"} size={"sm"}>
      <ItemContent>
        <ItemTitle>{title}</ItemTitle>
        <ItemDescription className="text-xs">
          Conversa realizada no dia {dia}, às {hora}
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
