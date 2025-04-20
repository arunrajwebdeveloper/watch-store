"use client";

import React from "react";
import { useAppSelector } from "@/store";
import ProductCard from "@/components/products/ProductCard";

function Wishlist() {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <div>
      <h2>Wishlist</h2>
      <div className="product-list-grid">
        {user?.wishList?.length > 0 ? (
          user?.wishList?.map((list: any) => {
            const {
              images,
              _id: productId,
              brand,
              model,
              currentPrice,
              size,
              color,
            } = list?.product;
            return (
              <ProductCard
                key={`product-wishlist-item-${brand}-${model}-${color}`}
                image={images[0]}
                url={`/products/${productId}`}
                brand={brand}
                model={model}
                price={currentPrice}
                size={size}
              />
            );
          })
        ) : (
          <span>No wishlist items</span>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
