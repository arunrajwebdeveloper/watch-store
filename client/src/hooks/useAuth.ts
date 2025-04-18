"use client";

import { useEffect } from "react";
import { refreshUser } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store";

export const useAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
};
