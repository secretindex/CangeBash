import { Plus } from "lucide-react";
import { Button } from "./ui/button";

import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full px-8 py-2 flex flex-row items-center justify-between border-b-[#0002] border-b-[1px]">
      <div className="">
        <Link href={"/"}>
          <h1 className="text-lg text-violet-500 font-bold">CangeBash</h1>
        </Link>
      </div>
      <div>
        <Link href={"/cadastro"}>
          <Button
            variant="outline"
            className="bg-background text-sm font-bold hover:bg-violet-100 hover:text-violet-500 text-violet-500 ease-in-out transition-all"
          >
            <Plus /> Adicionar fluxo
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
