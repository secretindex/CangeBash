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
import axios from "axios";

interface MessageProps {
  title: string;
  date: Date;
  conversaId: string;
}

const MessageItem = ({ title, date, conversaId }: MessageProps) => {
  const [dia, hora] = date.toLocaleString().split(", ");

  const handleAssociateMessageToExistingCard = () => {
    axios.post("");
    const desire = "";
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
                Criar novo a partir da mensagem
              </DropdownMenuItem>
              <DropdownMenuItem>Adicionar ao cartão</DropdownMenuItem>
              <DropdownMenuItem>Visualizar Mensagem</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ItemActions>
    </Item>
  );
};

export default MessageItem;
