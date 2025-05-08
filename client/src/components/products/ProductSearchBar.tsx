"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

let debounceTimeout: NodeJS.Timeout;

function ProductSearchBar() {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!search.trim()) {
      setSuggestions([]);
      return;
    }

    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await api.get(`/products/search?query=${search}`);
        const data = await res.data;
        setSuggestions(data);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }, 300); // debounce time

    return () => clearTimeout(debounceTimeout);
  }, [search]);

  const handleSelect = (productId: string) => {
    setSearch(""); // clear search
    setSuggestions([]);
    router.push(`/products/${productId}`); // navigate to product detail
  };

  return (
    <div className="search-bar-component">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for products..."
        className="input-element"
      />
      {loading && <div className="search-loading">Loading...</div>}
      {!loading && suggestions.length > 0 && (
        <div className="search-dropdown">
          <ul className="search-result-drop">
            {suggestions.map((item) => (
              <li key={item._id} onClick={() => handleSelect(item._id)}>
                {item.brand} {item.model}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProductSearchBar;
