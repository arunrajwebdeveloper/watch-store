"use client";

import React from "react";
import { useAppSelector, useAppDispatch } from "@/store";
import ProductCard from "@/components/products/ProductCard";
import { removeWishlistItem } from "@/store/slices/wishlistSlice";

function Wishlist() {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);
  const wishlist = useAppSelector((state) => state.wishlist.wishlistItems);
  const isLoading = useAppSelector((state) => state.wishlist.isLoading);

  return (
    <div className="container">
      <div className="product-listing-page">
        <div className="page-header">
          <h2>Wishlist</h2>
        </div>
        <div className="listing-page-layout">
          <div className="product-list-grid">
            {isLoading ? (
              <span>Fetching...</span>
            ) : user && wishlist?.length > 0 ? (
              wishlist?.map((list: any) => {
                const {
                  images,
                  _id: productId,
                  brand,
                  model,
                  currentPrice,
                  size,
                  color,
                  movementType,
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
                    movementType={movementType}
                    productId={productId}
                    onRemoveAction={(productId) =>
                      dispatch(removeWishlistItem(productId))
                    }
                  />
                );
              })
            ) : (
              <span>No wishlist items</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
