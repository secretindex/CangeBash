import { MessageCircle, Plus } from "lucide-react";
import { Button } from "./ui/button";

import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full fixed h-14 px-8 z-50 bg-white py-2 flex flex-row items-center justify-between border-b-[#0002] border-b-[1px]">
      <div className="">
        <Link href={"/"}>
          <h1 className="text-lg text-violet-500 font-bold">CangeBash</h1>
        </Link>
      </div>
      <div className="flex gap-2">
        <Link href={"/cadastro"}>
          <Button
            variant="outline"
            className="bg-background p-1 text-sm font-bold hover:bg-violet-100 hover:text-violet-500 text-violet-500 ease-in-out transition-all"
          >
            <Plus /> Fluxo
          </Button>
        </Link>
        <Link href={"/mensagens"}>
          <Button
            variant="outline"
            className="bg-background p-1 text-sm font-bold hover:bg-fuchsia-100 hover:text-fuchsia-500 text-fuchsia-500 ease-in-out transition-all"
          >
            <MessageCircle />
            Mensagens
          </Button>
        </Link>
        <Link href={"/tiflux"}>
          <Button
            variant="outline"
            className="bg-background p-1 text-sm font-bold hover:bg-fuchsia-100 hover:text-fuchsia-500 text-fuchsia-500 ease-in-out transition-all"
          >
            Histórico de Tickets
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
