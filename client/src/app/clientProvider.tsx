"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store";
import { refreshUser } from "@/store/slices/authSlice";
import { getCart } from "@/store/slices/cartSlice";
import GlobalSpinner from "@/components/common/GlobalSpinner";

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshUser());
    dispatch(getCart());
  }, [dispatch]);

  return (
    <>
      <GlobalSpinner />
      {children}
    </>
  );
};

export default ClientProvider;
