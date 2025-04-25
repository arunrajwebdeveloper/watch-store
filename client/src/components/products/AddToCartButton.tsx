"use client";
import React from "react";
import { addToCart } from "@/store/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { useRouter } from "next/navigation";

function AddToCartButton({
  productId,
  noStock,
}: {
  productId: string;
  noStock: boolean;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isLoading = useAppSelector((state) => state.cart.isLoading);

  const handleAddToCart = (productId: string) => {
    if (user && isAuthenticated) {
      dispatch(
        addToCart({
          productId,
          quantity: 1,
        })
      ).unwrap();
    } else {
      router.push("/login"); // negotiable
    }
  };

  return (
    <button
      disabled={isLoading || noStock}
      onClick={() => handleAddToCart(productId)}
      className="btn cart-add-btn"
    >
      {noStock ? "Out of stock" : "Add to cart"}
    </button>
  );
}

export default AddToCartButton;
