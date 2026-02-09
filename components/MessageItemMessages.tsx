"use client";

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CardAndFluxContext } from "./context/CardAndFlux";

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { TokenContext } from "./context/CangeToken";

interface MessageProps {
  title: string;
  date: Date;
  messageId: number;
  card_id: string;
  flow_id: string;
}

const MessageItemMessages = ({
  title,
  date,
  messageId,
  card_id,
  flow_id,
}: MessageProps) => {
  const [dia, hora] = date.toLocaleString().split(", ");
  const [cardName, setCardName] = useState<string>("");
  const [fluxName, setFluxName] = useState<string>("");

  const token = useContext(TokenContext)
  const cnfContext = useContext(CardAndFluxContext);

  useEffect(() => {
    axios
      .get(
        `https://api.cange.me/card?id_card=${card_id}&flow_id=${flow_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token?.token}`,
          },
        },
      )
      .then((res) => {
        setFluxName(res.data.flow.name);
        setCardName(res.data.title);
      });
  }, []);

  return (
    <Item variant={"outline"} size={"sm"}>
      <ItemContent>
        <ItemTitle>{title}</ItemTitle>
        <ItemDescription className="text-xs">
          Conversa realizada no dia {dia}, às {hora}
        </ItemDescription>
        <ItemDescription>
          Mensagem associada ao cartão {cardName} do fluxo {fluxName}
        </ItemDescription>
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
                messageId
              }
            >
              <DropdownMenuItem>
                Criar novo a partir da mensagem
              </DropdownMenuItem>
            </Link>
            <Link
              className="cursor-default"
              href={""}
            >
              <DropdownMenuItem>Visualizar Mensagem</DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      </ItemContent>
    </Item>
  );
};

export default MessageItemMessages;
