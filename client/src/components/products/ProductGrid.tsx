import React from "react";
import ProductCard from "./ProductCard";

function ProductGrid({ products }: { products: any }) {
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
        } = product;
        return (
          <ProductCard
            key={`product-list-item-${brand}-${model}`}
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
  );
}

export default ProductGrid;
