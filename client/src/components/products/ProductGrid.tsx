import React from "react";
import ProductCard from "./ProductCard";
import { useAppDispatch, useAppSelector } from "@/store";
import { addToWishlist } from "@/store/slices/wishlistSlice";

function ProductGrid({ products }: { products: any }) {
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector((state) => state.wishlist.wishlistItems);

  const isInWishlist = (productId: string) =>
    wishlist?.length > 0 &&
    wishlist?.find((w) => {
      return w.product?._id === productId;
    });

  return (
    <div className="product-list-grid">
      {products?.map((product: any) => {
        const {
          images,
          _id: productId,
          brand,
          model,
          currentPrice,
          size,
          color,
          movementType,
        } = product;
        return (
          <ProductCard
            key={`product-item-${brand}-${model}-${color}`}
            image={images[0]}
            url={`/products/${productId}`}
            brand={brand}
            model={model}
            price={currentPrice}
            size={size}
            movementType={movementType}
            productId={productId}
            isWishlisted={isInWishlist(productId)}
            onFavouriteAction={(productId) =>
              dispatch(
                addToWishlist({
                  productId,
                })
              ).unwrap()
            }
          />
        );
      })}
    </div>
  );
}

export default ProductGrid;
