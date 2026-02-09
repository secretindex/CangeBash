import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Ubuntu, Ubuntu_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";

import "./globals.css";
import Header from "@/components/Header";
import CardAndFluxContextProvider from "@/components/context/CardAndFlux";
import { TokenProvider } from "@/components/context/CangeToken";
import { Toaster } from "sonner";
import UserSessionContext from "@/components/context/UserSession";

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
    <html lang="pt-br">
      <TokenProvider>
        <CardAndFluxContextProvider>
          <UserSessionContext>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <body
                className={`${ubuntu.variable} ${ubuntuMono.variable} bg-background text-foreground antialiased min-h-screen`}
              >
                <Header />
                <main className="min-h-screen pt-14 bg-background text-foreground flex items-center justify-center">
                  {children}
                  <Toaster />
                </main>
              </body>
            </ThemeProvider>
          </UserSessionContext>
        </CardAndFluxContextProvider>
      </TokenProvider>
    </html>
  );
}
