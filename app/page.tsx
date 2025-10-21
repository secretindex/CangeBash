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
import { BaseSyntheticEvent, useEffect, useState } from "react";
import { toast } from "sonner";

import { Toaster } from "@/components/ui/sonner";
import { Search, SidebarOpenIcon } from "lucide-react";
import GetCard from "@/components/GetCard";

export default function Home() {
  const [cards, setCards] = useState<Array<any>>([]);
  const [flux, setFlux] = useState<{ nome: string; id: number }>({
    nome: "Default",
    id: 1,
  });
  const [idCard, setIdCard] = useState<number>(0);

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

  const handleSelectCards = (e: number) => {
    console.log(e);
    if (e) setIdCard(e);
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col w-1/3 justify-center row-start-2 items-center">
        <div className="flex flex-col w-full gap-3 border-[1px] p-8 border-[#0002] rounded-md shadow-lg">
          <div className="flex flex-col mb-4 gap-2">
            <h1 className="text-center font-bold text-xl text-violet-500">
              Integração Cange Bash - CangeBash
            </h1>
          </div>
          <div className="flex flex-col gap-1">
            <div>
              <label className="text-sm text-neutral-600">
                Selecione um Fluxo
              </label>
              <Select>
                <SelectTrigger className="w-full bg-background">
                  <SelectValue placeholder="Fluxo" />
                </SelectTrigger>
                <SelectContent className="bg-background">
                  <SelectGroup>
                    <SelectLabel>Fluxos</SelectLabel>
                    {cards &&
                      cards.map((card, index) => {
                        return (
                          <SelectItem
                            className="hover:bg-[#0001] w-full transition-all ease-in-out"
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
            <div>
              <label className="text-sm text-neutral-600">
                Selecione um cartão
              </label>
              <Select onValueChange={handleSelectCards}>
                <SelectTrigger className="w-full bg-background">
                  <SelectValue placeholder="Cartão" />
                </SelectTrigger>
                <SelectContent className="bg-background">
                  <SelectGroup>
                    <SelectLabel>Cartões</SelectLabel>
                    {cards &&
                      cards.map((card, index) => {
                        return (
                          <SelectItem
                            className="hover:bg-[#0001] w-full transition-all ease-in-out"
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
          </div>
          <div className="flex w-full flex-row gap-1">
            <Button
              variant="outline"
              className="cursor-pointer w-1/2 hover:bg-[#3331] transition-all ease-in-out"
              onClick={handleGetCards}
            >
              <Search />
              Buscar Cartões
            </Button>
            <GetCard id_card={idCard} flow_id={14266} />
          </div>
        </div>
      </main>
      <Toaster />
    </div>
  );
}
