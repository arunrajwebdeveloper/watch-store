import React from "react";
import Image from "next/image";
import Link from "next/link";
import { currencyFormat } from "@/utils/currencyFormat";

type Props = {
  productId?: string | undefined;
  image: string;
  url: string;
  brand: string;
  model: string;
  price: string;
  size: number;
  movementType: string;
  isWishlisted?: boolean;
  onFavouriteAction?: (id: string) => void;
  onRemoveAction?: (id: string) => void;
};

function ProductCard(props: Props) {
  const { image, url, brand, model, price, size, movementType, productId } =
    props;

  const isInWishlist = props?.isWishlisted ?? false;

  return (
    <div className="product-card">
      {(props?.onFavouriteAction || props?.onRemoveAction) && (
        <div className="product-sm-actions">
          {props?.onRemoveAction && (
            <button
              className="remove"
              onClick={() => {
                if (productId) {
                  props.onRemoveAction?.(productId);
                } else {
                  console.warn("Product ID is missing!");
                }
              }}
            >
              <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                <g>
                  <path
                    d="M14 10V17M10 10V17M6 6V17.8C6 18.9201 6 19.4798 6.21799 19.9076C6.40973 20.2839 6.71547 20.5905 7.0918 20.7822C7.5192 21 8.07899 21 9.19691 21H14.8031C15.921 21 16.48 21 16.9074 20.7822C17.2837 20.5905 17.5905 20.2839 17.7822 19.9076C18 19.4802 18 18.921 18 17.8031V6M6 6H8M6 6H4M8 6H16M8 6C8 5.06812 8 4.60241 8.15224 4.23486C8.35523 3.74481 8.74432 3.35523 9.23438 3.15224C9.60192 3 10.0681 3 11 3H13C13.9319 3 14.3978 3 14.7654 3.15224C15.2554 3.35523 15.6447 3.74481 15.8477 4.23486C15.9999 4.6024 16 5.06812 16 6M16 6H18M18 6H20"
                    stroke="#ff5858"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </button>
          )}
          {props.onFavouriteAction && (
            <button
              className="favourite"
              onClick={() => {
                if (productId) {
                  props.onFavouriteAction?.(productId);
                } else {
                  console.warn("Product ID is missing!");
                }
              }}
            >
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill={isInWishlist ? "#ff0000" : "none"}
              >
                <g>
                  <path
                    d="M12 7.69431C10 2.99988 3 3.49988 3 9.49991C3 15.4999 12 20.5001 12 20.5001C12 20.5001 21 15.4999 21 9.49991C21 3.49988 14 2.99988 12 7.69431Z"
                    stroke={isInWishlist ? "#ff0000" : "#000000"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </button>
          )}
        </div>
      )}
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
