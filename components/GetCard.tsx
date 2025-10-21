"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SidebarOpen } from "lucide-react";

import axios from "axios";
import { useState } from "react";

const GetCard = ({
  id_card,
  flow_id,
}: {
  id_card: number;
  flow_id: number;
}) => {
  const [card, setCard] = useState<Object | undefined>(undefined);

  const handleFetch = async () => {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_CANGE_API_URL +
        `/card?id_card=${id_card}&flow_id=${flow_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CANGE}`,
        },
      },
    );
  };

  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer justify-center w-1/2 bg-violet-400 text-white flex items-center hover:bg-[#8e51ff] hover:text-white transition-all rounded-md px-2 text-sm ease-in-out">
        Abrir Cartão
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cartão</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default GetCard;
