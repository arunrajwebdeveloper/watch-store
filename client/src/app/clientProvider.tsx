"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { refreshUser } from "@/store/slices/authSlice";
import { usePathname } from "next/navigation";
import { getCart } from "@/store/slices/cartSlice";
import { getWishlist } from "@/store/slices/wishlistSlice";

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getWishlist());
      dispatch(getCart());
      dispatch(refreshUser());
    }
  }, [dispatch]);

  return <>{children}</>;
};

export default ClientProvider;
