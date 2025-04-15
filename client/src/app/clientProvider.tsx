"use client";

import { useEffect } from "react";
import { refreshUser } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store";

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return <>{children}</>;
};

export default ClientProvider;
