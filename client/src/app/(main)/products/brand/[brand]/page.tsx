import api from "@/lib/axios";
import React from "react";
import ProductGrid from "@/components/products/ProductGrid";

type Props = {
  params: {
    brand: string;
  };
};

async function ProductByBrandPage({ params }: Props) {
  const { brand } = await params;

  const res = await api.get(`/products?brand=${brand}`);
  const { data: products } = res.data;

  const colors = [
    "#4c7d2c",
    "#132b7d",
    "#7b3030",
    "#6b6030",
    "#373737",
    "#552071",
  ];

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  if (!products || products.length === 0)
    return (
      <div
        style={{ textAlign: "center", padding: "20px 0", marginTop: "40px" }}
      >
        <h2>No products found.</h2>
      </div>
    );

  return (
    <div>
      <div
        className="brand-banner"
        style={{
          height: "320px",
          display: "flex",
          backgroundColor: getRandomColor(),
          userSelect: "none",
        }}
      >
        <h2>{brand?.toString()?.toUpperCase()}</h2>
      </div>
      <div className="brand-product-list">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}

export default ProductByBrandPage;
