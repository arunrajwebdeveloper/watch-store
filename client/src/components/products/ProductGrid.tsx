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
          color,
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
          />
        );
      })}
    </div>
  );
}

export default ProductGrid;
