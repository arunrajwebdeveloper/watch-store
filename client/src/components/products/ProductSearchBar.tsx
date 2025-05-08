"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

let debounceTimeout: NodeJS.Timeout;

function ProductSearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Debounce input for 500ms
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      if (search.trim() !== "") {
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.set("search", search);
        router.push(`/products?${currentParams.toString()}`);
      } else {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("search");
        setSearch("");
        router.push(`/products?${params.toString()}`);
      }
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [search]);

  return (
    <div>
      <input
        type="text"
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products"
        className="search-input-field"
      />
    </div>
  );
}

export default ProductSearchBar;
