"use client";
import React from "react";
import { addToCart } from "@/store/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { useRouter } from "next/navigation";

function AddToCartButton({ productId }: { productId: string }) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const handleAddToCart = (productId: string) => {
    if (user && isAuthenticated) {
      dispatch(
        addToCart({
          productId,
          quantity: 1,
        })
      ).unwrap();
    } else {
      router.push("/login");
    }
  };

  return (
    <button
      onClick={() => handleAddToCart(productId)}
      className="btn cart-add-btn"
    >
      Add to cart
    </button>
  );
}

export default AddToCartButton;
