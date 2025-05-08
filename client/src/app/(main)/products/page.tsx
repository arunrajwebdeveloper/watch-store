"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/axios";
import ProductGrid from "@/components/products/ProductGrid";
import ProductPagination from "@/components/products/ProductPagination";
import Dropdown from "@/components/common/Dropdown";
import SortDropdown from "@/components/products/SortDropdown";
import ProductFilters from "@/components/products/ProductFilters";
import { useRouter, useSearchParams } from "next/navigation";
import { createProductQueryUrl } from "@/utils/createProductQueryUrl";
import { searchParamsToObject } from "@/utils/searchParamsToObject";
import ProductSearchBar from "@/components/products/ProductSearchBar";

const pageCounts = [
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: 30, label: "30" },
  { value: 40, label: "40" },
  { value: 50, label: "50" },
];

type Product = {
  // Define based on backend response
};

export type FilterOptionItem = {
  title: string;
  items: string[] | number[];
  field: string;
};

export type FilterOptions = Record<string, FilterOptionItem>;

// fun type, props type || React.ReactNode return type
// const ProductListPage: React.FC<Props> = ({ searchParams }) => {...}
// OR
const ProductListPage = (): React.ReactNode => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [filtersItems, setFiltersItems] = useState<FilterOptions | null>(null);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const productRes = await api.get("/products", {
        // params: searchParams,
        params: searchParamsToObject(searchParams),
      });
      const { data, page, lastPage, total } = productRes.data;
      setProducts(data);
      setPage(page);
      setLastPage(lastPage);
      setTotal(total);

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
            <ProductSearchBar />

            <div className="listing-page__header">
              <ProductPagination page={page} lastPage={lastPage} />
              <div className="sort-dropdown">
                <span>Sort By:</span>
                <SortDropdown />
              </div>
              <div className="sort-dropdown page-count">
                <span>Page</span>
                <Dropdown
                  selected={Number(searchParams.get("limit")) || 10}
                  data={pageCounts}
                  placeholder="Count"
                  onChange={(e) => {
                    router.push(
                      createProductQueryUrl("/products", {
                        ...searchParamsToObject(searchParams),
                        limit: e.value,
                      })
                    );
                  }}
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
                  selected={Number(searchParams.get("limit")) || 10}
                  data={pageCounts}
                  placeholder="Count"
                  onChange={(e) => {
                    router.push(
                      createProductQueryUrl("/products", {
                        ...searchParamsToObject(searchParams),
                        limit: e.value,
                      })
                    );
                  }}
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
