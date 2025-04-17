import ProductCard from "@/components/products/ProductCard";
import ProductGrid from "@/components/products/ProductGrid";
import api from "@/lib/axios";
import React from "react";

type Props = {
  params: {
    brand: string;
  };
};

async function ProductByBrandPage({ params }: Props) {
  const { brand } = await params;

  const res = await api.get(`/products?brand=${brand}`);
  const { data: products } = res.data;

  return (
    <div>
      <div className="brand-banner">
        <img
          src={`/${brand?.toLowerCase()}-banner.jpg`}
          alt={"brand-banner-image"}
          style={{ objectFit: "cover", width: "100%", height: "440px" }}
        />
      </div>
      <div className="brand-product-list">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}

export default ProductByBrandPage;
