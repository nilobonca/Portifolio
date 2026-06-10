import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Juan Rego | Portfólio",
  description: "Portfólio minimalista",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={playfair.variable}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
