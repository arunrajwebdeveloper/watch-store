"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/axios";
import ProductGrid from "@/components/products/ProductGrid";
import ProductPagination from "@/components/products/ProductPagination";
import Dropdown from "@/components/common/Dropdown";

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
  // Define based on your backend response
};

type FilterOption = {
  title: string;
  items: string[];
};

const sortOptions = [
  { label: "New Arrivals", value: "new" },
  { label: "Price - Low to High", value: "price-lh" },
  { label: "Price - High to Low", value: "price-hl" },
  { label: "Best sellers", value: "bs" },
];

const ProductListPage: React.FC<Props> = ({ searchParams }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtersItems, setFiltersItems] = useState<FilterOption[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const productRes = await api.get("/products", { params: searchParams });
      const { data, page, lastPage, total } = productRes.data;
      setProducts(data);
      setPage(page);
      setLastPage(lastPage);
      setTotal(total);

      const filterRes = await api.get("/products/filter-options");
      setFiltersItems(filterRes.data.filters || []);
    };

    fetchData();
  }, [searchParams]);

  return (
    <div className="container">
      <div className="product-listing-page">
        <div className="listing-page-layout">
          <div className="layout-sidebar">
            <h2>Filters</h2>
            <div>
              {filtersItems.map((filter) => (
                <div key={`filter-item-${filter.title}`}>
                  <h4>{filter.title}</h4>
                  <ul>
                    {filter.items.map((item) => (
                      <li key={`${filter.title}-${item}`}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="layout-content">
            <div className="listing-page__header">
              <ProductPagination page={page} lastPage={lastPage} />
              <div className="sort-dropdown">
                <span>Sort By:</span>
                <Dropdown
                  selected={{ label: "watch", value: 3 }}
                  data={sortOptions}
                  placeholder="Sort"
                  onChange={(e) => console.log(e)}
                />
              </div>
            </div>
            <ProductGrid products={products} />
            <div className="products-footer">
              <ProductPagination page={page} lastPage={lastPage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
