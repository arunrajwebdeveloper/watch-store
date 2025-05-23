"use client";
import React from "react";
import { addToWishlist } from "@/store/slices/wishlistSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { useRouter } from "next/navigation";

function AddToWishlistButton({ productId }: { productId: string }) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const wishlist = useAppSelector((state) => state.wishlist.wishlistItems);
  const isLoading = useAppSelector((state) => state.wishlist.isLoading);

  const isExistingItem =
    wishlist?.length > 0 &&
    wishlist?.find((w) => {
      return w.product?._id === productId;
    });

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
      disabled={isLoading}
      onClick={() => handleAddToWishlist(productId)}
      className="btn secondary add-wishlist-btn"
    >
      {isExistingItem ? "Remove from wishlist" : "Add to wishlist"}
    </button>
  );
}

export default AddToWishlistButton;
