import { ArrowRightLeft, Clock, MessageCircle, Plus } from "lucide-react";
import { Button } from "./ui/button";

import Link from "next/link";
import SignOut from "./SignOutComponent";
import ToggleTheme from "./theme/ToggleTheme";

const Header = () => {
  return (
    <header className="w-full fixed h-14 px-8 z-50 bg-card py-2 flex flex-row items-center justify-between border-b-border border-b-[1px]">
      <div className="">
        <Link href={"/"}>
          <h1 className="text-lg text-primary dark:text-foreground font-bold">
            CangeBash
          </h1>
        </Link>
      </div>
      <div className="flex gap-2">
        <Link href={"/cadastro"}>
          <Button
            variant="ghost"
            className="shadow-none px-4 text-sm font-bold transition-all"
          >
            <Plus /> Fluxo
          </Button>
        </Link>
        <Link href={"/mensagens"}>
          <Button
            variant="ghost"
            className="shadow-none px-4 text-sm font-bold transition-all"
          >
            <MessageCircle />
            Mensagens
          </Button>
        </Link>
        <Link href={"/tiflux"}>
          <Button
            variant="ghost"
            className="shadow-none px-4 text-sm font-bold transition-all"
          >
            <Clock />
            Histórico de Tickets
          </Button>
        </Link>
        <Link href={"/associated"}>
          <Button
            variant="ghost"
            className="shadow-none px-4 text-sm font-bold transition-all"
          >
            <ArrowRightLeft />
            Mensagens Atribuídas
          </Button>
        </Link>
        <ToggleTheme />
        <SignOut />
      </div>
    </header>
  );
};

export default Header;
