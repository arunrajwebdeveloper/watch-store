"use client";

import { Lexend_Deca } from "next/font/google";
import "./globals.css";
import { store } from "../store";
import { Provider } from "react-redux";

export const lexendDeca = Lexend_Deca({
  variable: "--font-lexend-deca",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lexendDeca.variable}`}>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
