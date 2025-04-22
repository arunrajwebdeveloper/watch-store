"use client";

import React from "react";
import { useAppSelector } from "@/store";
import ProductCard from "@/components/products/ProductCard";

function Checkout() {
  const user = useAppSelector((state) => state.auth.user);
  const wishlist = useAppSelector((state) => state.wishlist.wishlistItems);
  const isLoading = useAppSelector((state) => state.wishlist.isLoading);

  return (
    <div className="container">
      <div className="product-listing-page">
        <div className="page-header">
          <h2>Checkout</h2>
        </div>
        <div className="listing-page-layout">{/* CHECKOUT */}</div>
      </div>
    </div>
  );
}

export default Checkout;
