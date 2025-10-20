"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Toaster } from "@/components/ui/sonner";
import { SidebarOpenIcon } from "lucide-react";

export default function Home() {
  const [cards, setCards] = useState<Array<any>>([]);

  useEffect(() => {
    if (cards.length > 0) toast.success("Preenchido todos os cards!");
  }, [cards]);

  const handleGetCards = async () => {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_CANGE_API_URL + "/card/by-flow?flow_id=14266",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CANGE}`,
        },
      },
    );

    console.log(res.data);

    setCards(res.data);
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] w-full justify-center row-start-2 items-center">
        <div className="flex flex-col gap-3 w-1/3">
          <div className="flex flex-col gap-2">
            <h1 className="text-center font-bold text-xl text-neutral-700">
              Integração Cange Bash
            </h1>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-neutral-600">Select a card</label>
            <Select>
              <SelectTrigger className="w-full bg-background">
                <SelectValue placeholder="Selecione um cartão" />
              </SelectTrigger>
              <SelectContent className="bg-background">
                <SelectGroup>
                  <SelectLabel>Cartões</SelectLabel>
                  {cards &&
                    cards.map((card, index) => {
                      return (
                        <SelectItem
                          className="hover:bg-[#0001] transition-all ease-in-out"
                          key={index}
                          value={card.id_card}
                        >
                          {card.title}
                        </SelectItem>
                      );
                    })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-row gap-1">
            <Button
              variant="outline"
              className="cursor-pointer hover:bg-[#3331] transition-all ease-in-out"
              onClick={handleGetCards}
            >
              Buscar Cartões
            </Button>
            <Button
              variant="outline"
              className="cursor-pointer bg-green-400 flex items-center hover:bg-[#3331] transition-all ease-in-out"
            >
              <SidebarOpenIcon />
              Abrir Cartão
            </Button>
          </div>
        </div>
      </main>
      <Toaster />
    </div>
  );
}
