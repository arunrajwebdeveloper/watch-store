"use client";
import React from "react";
import {
  addToWishlist,
  removeWishlistItem,
} from "@/store/slices/wishlistSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { useRouter } from "next/navigation";

function AddToWishlistButton({ productId }: { productId: string }) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const wishlist = useAppSelector((state) => state.wishlist.wishlistItems);

  const isExistingItem =
    wishlist?.length > 0 &&
    wishlist?.find((w) => {
      return w.product?._id === productId;
    });

  const handleAddToWishlist = (productId: string) => {
    if (user && isAuthenticated) {
      if (isExistingItem) {
        dispatch(removeWishlistItem(productId)).unwrap();
      } else {
        dispatch(
          addToWishlist({
            productId,
          })
        ).unwrap();
      }
    } else {
      router.push("/login");
    }
  };

  return (
    <button
      onClick={() => handleAddToWishlist(productId)}
      className="btn secondary add-wishlist-btn"
    >
      {isExistingItem ? "Remove from wishlist" : "Add to wishlist"}
    </button>
  );
}

export default AddToWishlistButton;
