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
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

interface MessageProps {
  title: string;
  date: Date;
  messageId: number;
  card_id: string;
  flow_id: string;
  atendente: string;
}

const MessageItemMessages = ({
  title,
  date,
  messageId,
  card_id,
  flow_id,
  atendente
}: MessageProps) => {
  const [dia, hora] = date.toLocaleString().split(", ");
  const [cardName, setCardName] = useState<string>("");
  const [fluxName, setFluxName] = useState<string>("");

  const router = useRouter();

  const cnfContext = useContext(CardAndFluxContext);

  useEffect(() => {
    axios
      .get(
        `/api/cange/card?id_card=${card_id}&flow_id=${flow_id}`,
        {
          headers: {
            "Content-Type": "application/json",
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
      <ItemContent className="flex justify-between items-center gap-2">
        <div className="flex justify-between items-center w-full">
          <div>
            <ItemTitle className="text-md font-semibold">{title}</ItemTitle>
            <ItemDescription className="text-xs">
              Atendente: <span className="font-semibold">{atendente}</span>
            </ItemDescription>
            <ItemDescription className="text-xs">
              Conversa realizada no dia {dia}, às {hora}
            </ItemDescription>
            <ItemDescription className="text-xs">
              {
                cardName && fluxName ? (
                  <>
                    Mensagem associada ao cartão {cardName} do fluxo {fluxName}
                  </>
                ) : (
                  "Não foi associado a nenhum cartão"
                )
              }
            </ItemDescription>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>Ações</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64">
                <DropdownMenuLabel>Mensagem</DropdownMenuLabel>
                <DropdownMenuGroup>
                  {
                    cnfContext?.cardAndFlux?.fluxId ? (
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
                    ) : (
                      <></>
                    )
                  }
                  <Link
                    className="cursor-default"
                    href={"/mensagem?conversa_id=" + messageId}
                  >
                    <DropdownMenuItem>Visualizar Mensagem</DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </ItemContent>
    </Item>
  );
};

export default MessageItemMessages;
