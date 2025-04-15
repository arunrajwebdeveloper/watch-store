"use client";

import { store } from "@/store";
import { Provider } from "react-redux";
import ClientProvider from "./ClientProvider";

export default function StoreProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <ClientProvider>{children}</ClientProvider>
    </Provider>
  );
}
