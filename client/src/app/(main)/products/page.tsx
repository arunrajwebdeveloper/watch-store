import React from "react";
import api from "@/lib/axios";
import Link from "next/link";

type Props = {
  searchParams: {
    brand?: string;
    color?: string;
    size?: string;
    gender?: string;
    movementType?: string;
    minPrice?: string;
    maxPrice?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    page?: string;
    limit?: string;
  };
};

const ProductListPage = async ({ searchParams }: Props) => {
  const res = await api.get("/products", {
    params: {
      ...searchParams,
    },
  });
  const { data: products, page, lastPage, total } = res.data;

  return (
    <div>
      <h3>Product list</h3>
      <ul>
        {products.map((product: any) => {
          return (
            <li key={product._id}>
              <Link href={`/products/${product._id}`}>
                <h4>{product.brand}</h4>
                <div>{product.model}</div>
                <div>{product.currentPrice}</div>
                <img
                  src={product.images[0]}
                  height={100}
                  alt={"product-image " + product._id}
                  style={{ objectFit: "contain" }}
                />
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Simple pagination navigation */}
      <div style={{ marginTop: "20px" }}>
        {page > 1 && (
          <Link href={`/products?page=${Number(page) - 1}`}>Previous</Link>
        )}
        <span style={{ margin: "0 10px" }}>
          Page {page} of {lastPage}
        </span>
        {page < lastPage && (
          <Link href={`/products?page=${Number(page) + 1}`}>Next</Link>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
