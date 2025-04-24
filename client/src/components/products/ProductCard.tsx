import React from "react";
import Image from "next/image";
import Link from "next/link";
import { currencyFormat } from "@/utils/currencyFormat";

type Props = {
  image: string;
  url: string;
  brand: string;
  model: string;
  price: string;
  size: number;
  movementType: string;
};

function ProductCard(props: Props) {
  const { image, url, brand, model, price, size, movementType } = props;

  return (
    <div className="product-card">
      <Link href={url}>
        <Image
          src={image}
          alt={`${brand}-${model}`}
          height={260}
          width={260}
          style={{ objectFit: "contain" }}
        />
        <h2 className="brand">{brand}</h2>
        <h3 className="model">{model}</h3>
        <h3 className="price">{currencyFormat(parseInt(price))}</h3>
        <div className="product-highlights">
          <span className="highlight-chip">{`${size}mm`}</span>
          <span className="highlight-chip">{movementType}</span>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
