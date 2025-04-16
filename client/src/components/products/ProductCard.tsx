import React from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  image: string;
  url: string;
  brand: string;
  model: string;
  price: string;
  size: number;
};

function ProductCard(props: Props) {
  const { image, url, brand, model, price, size } = props;
  return (
    <div className="product-card">
      <Link href={url}>
        <span className="watch-size">{`${size}mm`}</span>
        <Image
          src={image}
          alt={`${brand}-${model}`}
          height={300}
          width={300}
          style={{ objectFit: "contain" }}
        />
        <h2 className="brand">{brand}</h2>
        <h3 className="model">{model}</h3>
        <h3 className="price">{price}</h3>
      </Link>
    </div>
  );
}

export default ProductCard;
