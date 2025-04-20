"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store";
import { refreshUser } from "@/store/slices/authSlice";
import { getCart } from "@/store/slices/cartSlice";

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshUser());
    dispatch(getCart());
  }, [dispatch]);

  return <>{children}</>;
};

export default ClientProvider;
