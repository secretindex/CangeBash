import { Clock, MessageCircle, Plus } from "lucide-react";
import { Button } from "./ui/button";

import Link from "next/link";
import SignOut from "./SignOutComponent";

const Header = () => {
  return (
    <header className="w-full fixed h-14 px-8 z-50 bg-white py-2 flex flex-row items-center justify-between border-b-[#0002] border-b-[1px]">
      <div className="">
        <Link href={"/"}>
          <h1 className="text-lg text-violet-500 font-bold">CangeChat</h1>
        </Link>
      </div>
      <div className="flex gap-2">
        <Link href={"/cadastro"}>
          <Button
            className="bg-background px-4 text-sm font-bold hover:bg-zinc-100 hover:text-indigo-600 text-gray-500 ease-in-out transition-all"
          >
            <Plus /> Fluxo
          </Button>
        </Link>
        <Link href={"/mensagens"}>
          <Button
            className="bg-background px-4 text-sm font-bold hover:bg-violet-100 hover:text-violet-600 text-gray-500 ease-in-out transition-all"
          >
            <MessageCircle />
            Mensagens
          </Button>
        </Link>
        <Link href={"/tiflux"}>
          <Button
            className="bg-background shadow-none px-4 text-sm font-bold hover:bg-purple-100 hover:text-purple-600 text-gray-500 ease-in-out transition-all"
          >
            <Clock />
            Histórico de Tickets
          </Button>
        </Link>
        <SignOut />
      </div>
    </header>
  );
};

export default Header;
