"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store";
import { getUser } from "@/store/slices/authSlice";
import { usePathname } from "next/navigation";
import { getCart } from "@/store/slices/cartSlice";
import { getWishlist } from "@/store/slices/wishlistSlice";

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    dispatch(getUser());
    dispatch(getWishlist());
    dispatch(getCart());
  }, [dispatch]);

  return <>{children}</>;
};

export default ClientProvider;
