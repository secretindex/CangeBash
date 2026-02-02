"use client";

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { TokenContext } from "./context/CangeToken";

interface MessageProps {
  title: string;
  date: Date;
  card_id: string;
  flow_id: string;
}

const MessageItemMessages = ({
  title,
  date,
  card_id,
  flow_id,
}: MessageProps) => {
  const [dia, hora] = date.toLocaleString().split(", ");
  const [cardName, setCardName] = useState<string>("");
  const [fluxName, setFluxName] = useState<string>("");

  const token = useContext(TokenContext)

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_CANGE_API_URL}/card?id_card=${card_id}&flow_id=${flow_id}`,
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
      </ItemContent>
    </Item>
  );
};

export default MessageItemMessages;
