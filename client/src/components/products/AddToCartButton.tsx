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
  const cartList = useAppSelector((state) => state.cart.cartItems);
  const isLoading = useAppSelector((state) => state.cart.isLoading);

  const isExistingItem =
    cartList?.length > 0 &&
    cartList?.find((c) => {
      return c.product?._id === productId;
    });

  const handleAddToCart = (productId: string) => {
    if (user && isAuthenticated) {
      if (!isExistingItem) {
        dispatch(
          addToCart({
            productId,
            quantity: 1,
          })
        ).unwrap();
      } else {
        router.push("/cart");
      }
    } else {
      router.push("/login");
    }
  };

  return (
    <button
      disabled={isLoading || noStock}
      onClick={() => handleAddToCart(productId)}
      className="btn cart-add-btn"
    >
      {isExistingItem ? "Go to cart" : noStock ? "Out of stock" : "Add to cart"}
    </button>
  );
}

export default AddToCartButton;
