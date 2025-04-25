import React from "react";
import Image from "next/image";
import Link from "next/link";
import api from "@/lib/axios";
import "@/styles/products/product-details.styles.css";
import { currencyFormat } from "@/utils/currencyFormat";
import AddToCartButton from "@/components/products/AddToCartButton";
import AddToWishlistButton from "@/components/products/AddToWishlistButton";

type Props = {
  params: {
    id: string;
  };
};

const ProductByIdPage = async ({ params }: Props) => {
  const { id } = await params;

  const res = await api.get(`/products/${id}`);
  const { product, variants } = res.data;

  const isLimitedStock = product.inventory <= 10 && product.inventory > 0;
  const isStockEmpty = product.inventory === 0;

  return (
    <div className="container">
      {/* <Link href="/products">Go to products</Link> */}

      <div className="product-details-page">
        <div className="product-showcase-images">
          {product.images.map((img: string, i: number) => {
            return (
              <img
                key={`product-image-${i}`}
                src={img}
                alt={`product-image-${product.model}`}
              />
            );
          })}
        </div>
        <div className="product-basic-details">
          <Link
            className="product-brand-link"
            href={`/products/brand/${product.brand}`}
          >
            <h4 className="product-brand">{product.brand}</h4>
          </Link>
          <div className="product-model">{product.model}</div>
          <div className="product-price">
            {currencyFormat(parseInt(product.currentPrice))}
          </div>
          <small>*Inclusive of all taxes</small>

          {isLimitedStock && (
            <div
              style={{ color: "red", marginTop: "10px" }}
            >{`Only ${product.inventory} items left`}</div>
          )}

          {isStockEmpty && (
            <div style={{ color: "red", marginTop: "10px" }}>Out of stock</div>
          )}

          {variants.length > 0 && (
            <div className="product-varients-row">
              <h4 className="product-varients-title">Available Colors:</h4>
              <ul className="product-varients-list">
                {variants.map((variant: any) => {
                  const isSelected = variant._id === product._id;

                  return (
                    <li
                      key={variant._id}
                      className={`product-varients-item ${
                        isSelected ? "selected" : ""
                      }`}
                    >
                      <Link href={`/products/${variant._id}`}>
                        <div style={{ width: 80 }}>
                          <Image
                            src={variant.images[0]}
                            alt={`variant-model-${variant.model}`}
                            width={80}
                            height={80}
                            style={{ objectFit: "contain" }}
                            // priority={false}
                          />
                          <div
                            style={{
                              marginTop: "4px",
                              textAlign: "center",
                              fontSize: 12,
                              textTransform: "uppercase",
                            }}
                          >
                            {variant.color}
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <div className="product-actions">
            <AddToCartButton productId={product._id} noStock={isStockEmpty} />
            <AddToWishlistButton productId={product._id} />
          </div>

          <div className="other-details">
            {product.gender && (
              <div className="detail-row">
                <span>Gender:</span>
                <span>{`${product.gender === "male" ? "Men" : "Women"}`}</span>
              </div>
            )}
            {product.weight && (
              <div className="detail-row">
                <span>Weight:</span>
                <span>{`${product.weight}g`}</span>
              </div>
            )}
            {product.size && (
              <div className="detail-row">
                <span>Size:</span>
                <span>{`${product.size}mm`}</span>
              </div>
            )}
            {product.movementType && (
              <div className="detail-row">
                <span>Movement Type:</span>
                <span>{product.movementType}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductByIdPage;
