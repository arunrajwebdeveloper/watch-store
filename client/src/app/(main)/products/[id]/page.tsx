import api from "@/lib/axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const ProductDetailsPage = async ({ params }: Props) => {
  const { id } = params;

  const res = await api.get(`/products/${id}`);
  const { product, variants } = res.data;

  return (
    <div>
      <h4>{product.brand}</h4>
      <div>{product.model}</div>
      <div>{product.currentPrice}</div>
      {product.images.map((img: string, i: number) => {
        return (
          <Image
            key={`product-image-${i}`}
            src={img}
            height={100}
            width={100}
            style={{ objectFit: "contain" }}
            alt={`product-image-${product.model}`}
          />
        );
      })}

      {/* Color variants */}

      {variants.length > 0 && (
        <div>
          <strong style={{ marginBottom: "20px", display: "block" }}>
            Available Colors:
          </strong>
          <ul
            style={{
              display: "flex",
              gap: "10px",
              listStyle: "none",
              padding: 0,
            }}
          >
            {variants.map((variant: any) => {
              const isSelected = variant._id === product._id;

              return (
                <li
                  key={variant._id}
                  style={{
                    border: isSelected ? "2px solid black" : "1px solid #ddd",
                    borderRadius: 8,
                    padding: 4,
                    cursor: "pointer",
                  }}
                >
                  <Link href={`/products/${variant._id}`}>
                    <div style={{ width: 50 }}>
                      <Image
                        src={variant.images[0]}
                        alt={`variant-model-${variant.model}`}
                        width={50}
                        height={50}
                        style={{ objectFit: "contain" }}
                      />
                      <div
                        style={{
                          marginTop: "4px",
                          textAlign: "center",
                          fontSize: 12,
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
    </div>
  );
};

export default ProductDetailsPage;
