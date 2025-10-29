import { Children, createContext, ReactNode } from "react";
import { useState, Dispatch, SetStateAction } from "react";

export interface CardAndFlux {
  cardId: number;
  fluxId: number;
}

const defaultCardAndFlux: CardAndFlux = {
  cardId: 0,
  fluxId: 0,
};

export interface CardAndFluxContextInterface {
  cardAndFlux: CardAndFlux | undefined;
  setCardAndFlux: Dispatch<SetStateAction<CardAndFlux | undefined>>;
}

export const CardAndFluxContext = createContext<
  CardAndFluxContextInterface | undefined
>(undefined);

interface ContextProps {
  children: ReactNode;
}

export default function CardAndFluxContextProvider({ children }: ContextProps) {
  const [cardAndFlux, setCardAndFlux] = useState<CardAndFlux>();
  return (
    <CardAndFluxContext value={{ cardAndFlux, setCardAndFlux }}>
      {children}
    </CardAndFluxContext>
  );
}
