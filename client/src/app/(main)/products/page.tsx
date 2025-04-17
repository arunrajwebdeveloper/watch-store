import React from "react";
import api from "@/lib/axios";
import Link from "next/link";
import ProductGrid from "@/components/products/ProductGrid";

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

  const filterResponse = await api.get("/products/filter-options");
  const { filters } = filterResponse.data;

  return (
    <div className="product-listing-page">
      <div className="listing-page__header">
        <h2 className="page-header-title">Watches</h2>
      </div>
      <div className="listing-page-layout">
        <div className="layout-sidebar">
          <h2>Filters</h2>
          <div>
            {filters?.map((filter: any) => {
              return (
                <div key={`filter-item-${filter.title}`}>
                  <h4>{filter.title}</h4>
                  <ul>
                    {filter.items.map((item: any) => (
                      <li key={`${filter.title}-items`}>{item}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
        <div className="layout-content">
          <ProductGrid products={products} />
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
      </div>
    </div>
  );
};

export default ProductListPage;
