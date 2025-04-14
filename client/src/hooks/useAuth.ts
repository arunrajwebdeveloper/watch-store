"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { refreshUser } from "@/store/slices/authSlice";
import { AppDispatch } from "@/store";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
};
