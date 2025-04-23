"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/axios";
import ProductGrid from "@/components/products/ProductGrid";
import ProductPagination from "@/components/products/ProductPagination";
import Dropdown from "@/components/common/Dropdown";
import SortDropdown from "@/components/products/SortDropdown";
import ProductFilters from "@/components/products/ProductFilters";

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

type Product = {
  // Define based on backend response
};

export type FilterOptionItem = {
  title: string;
  items: string[] | number[];
  field: string;
};

export type FilterOptions = Record<string, FilterOptionItem>;

type Option = {
  label: string;
  value: string | number;
} | null;

// fun type, props type || React.ReactNode return type
// const ProductListPage: React.FC<Props> = ({ searchParams }) => {...}
// OR
const ProductListPage = ({ searchParams }: Props): React.ReactNode => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtersItems, setFiltersItems] = useState<FilterOptions | null>(null);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageLimit, setPageLimit] = useState<Option>({
    value: 10,
    label: "10",
  });

  useEffect(() => {
    const fetchData = async () => {
      const productRes = await api.get("/products", {
        params: await searchParams,
      });
      const { data, page, lastPage, total, limit } = productRes.data;
      setProducts(data);
      setPage(page);
      setLastPage(lastPage);
      setTotal(total);
      setPageLimit({
        value: parseInt(limit),
        label: limit?.toString(),
      });

      const filterRes = await api.get("/products/filter-options");
      setFiltersItems(filterRes.data || {});
    };

    fetchData();
  }, [searchParams]);

  return (
    <div className="container">
      <div className="product-listing-page">
        <div className="listing-page-layout">
          <div className="layout-sidebar">
            {filtersItems ? (
              <ProductFilters filtersItems={filtersItems} />
            ) : (
              <span>Fetching...</span>
            )}
          </div>
          <div className="layout-content">
            <div className="listing-page__header">
              <ProductPagination page={page} lastPage={lastPage} />

              <div className="sort-dropdown">
                <span>Sort By:</span>
                <SortDropdown />
              </div>
              <div className="sort-dropdown page-count">
                <span>Page</span>
                <Dropdown
                  selected={pageLimit}
                  data={[
                    { value: 10, label: "10" },
                    { value: 20, label: "20" },
                    { value: 40, label: "40" },
                  ]}
                  placeholder="Count"
                  onChange={(e) => setPageLimit(e)}
                />
                <span>of {total}</span>
              </div>
            </div>

            {!products || products.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "20px 0",
                  marginTop: "40px",
                }}
              >
                <h2>No products found.</h2>
              </div>
            ) : (
              <ProductGrid products={products} />
            )}
            <div className="products-footer">
              <ProductPagination page={page} lastPage={lastPage} />
              <div className="sort-dropdown page-count">
                <span>Page</span>
                <Dropdown
                  selected={pageLimit}
                  data={[
                    { value: 10, label: "10" },
                    { value: 20, label: "20" },
                    { value: 40, label: "40" },
                  ]}
                  placeholder="Count"
                  onChange={(e) => setPageLimit(e)}
                />
                <span>of {total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
