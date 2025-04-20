"use client";
import React from "react";
import { addToWishlist } from "@/store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { useRouter } from "next/navigation";

function AddToWishlistButton({ productId }: { productId: string }) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const handleAddToWishlist = (productId: string) => {
    if (user && isAuthenticated) {
      dispatch(
        addToWishlist({
          productId,
        })
      ).unwrap();
    } else {
      router.push("/login");
    }
  };

  return (
    <button
      onClick={() => handleAddToWishlist(productId)}
      className="btn secondary add-wishlist-btn"
    >
      Add to wishlist
    </button>
  );
}

export default AddToWishlistButton;
