import React from "react";
import api from "@/lib/axios";
import ProductCard from "./ProductCard";

type Props = {
  filter?: {
    brand?: string;
    movementType?: string;
    limit?: number;
  };
  title: string;
};

async function ProductScroller({ filter = {}, title }: Props) {
  const response = await api.get(`/products`, {
    params: filter,
  });
  const { data: products } = response.data;

  return (
    <div className="product-scroller-section">
      {title && (
        <div className="product-scroller__header">
          <h2>{title}</h2>
        </div>
      )}
      <div className="product-scroller">
        {products?.map((product: any) => {
          const {
            images,
            _id: productId,
            brand,
            model,
            currentPrice,
            size,
          } = product;
          return (
            <ProductCard
              key={`product-scroller-item-${brand}-${model}`}
              image={images[0]}
              url={`/products/${productId}`}
              brand={brand}
              model={model}
              price={`INR ${currentPrice}`}
              size={size}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ProductScroller;
