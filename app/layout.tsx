import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Ubuntu, Ubuntu_Mono } from "next/font/google";

import "./globals.css";
import Header from "@/components/Header";
import CardAndFluxContextProvider from "@/components/context/CardAndFlux";
import { TokenProvider } from "@/components/context/CangeToken";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ubuntu = Ubuntu({
  subsets: ["latin"],
  variable: "--font-ubuntu",
  weight: "400",
});

const ubuntuMono = Ubuntu_Mono({
  subsets: ["latin"],
  variable: "--font-ubuntu-mono",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Integração CangeChat & TiFlux",
  description: "Integração entre Cange, RMChat e com acervo do Tiflux",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <TokenProvider>
        <CardAndFluxContextProvider>
          <body
            className={`${ubuntu.variable} ${ubuntuMono.variable} antialiased min-h-screen`}
          >
            <Header />
            <main className="min-h-screen pt-14 flex items-center justify-center">
              {children}
            </main>
          </body>
        </CardAndFluxContextProvider>
      </TokenProvider>
    </html>
  );
}
