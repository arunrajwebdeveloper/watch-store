import React from "react";

type Props = {
  params: {
    brand: string;
  };
};

function ProductByBrandPage({ params }: Props) {
  const { brand } = params;
  return <div>ProductByBrand {brand}</div>;
}

export default ProductByBrandPage;
