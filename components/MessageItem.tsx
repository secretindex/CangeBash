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

import { Button } from "./ui/button";
import { useContext, useEffect } from "react";
import axios from "axios";
import { CardAndFluxContext } from "./context/CardAndFlux";
import Link from "next/link";
import { toast } from "sonner";

interface MessageProps {
  title: string;
  date: Date;
  conversaId: string;
}

const MessageItem = ({ title, date, conversaId }: MessageProps) => {
  const [dia, hora] = date.toLocaleString().split(", ");

  useEffect(() => {
    console.log("oi");
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
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_CANGE}`,
          },
        },
      );

      console.log(res.data);

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
              <DropdownMenuItem>
                <Link
                  href={"/embed?flux_id=" + cnfContext?.cardAndFlux?.fluxId}
                >
                  Criar novo a partir da mensagem
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleAssociateMessageToExistingCard}>
                Adicionar ao cartão
              </DropdownMenuItem>
              <DropdownMenuItem>Visualizar Mensagem</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ItemActions>
    </Item>
  );
};

export default MessageItem;
