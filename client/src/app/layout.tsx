import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import "./globals.css";
import StoreProvider from "./storeProvider";

export const lexendDeca = Lexend_Deca({
  variable: "--font-lexend-deca",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Watch store",
  description: "Watch store App with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lexendDeca.variable}`}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
