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
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for products..."
        className="w-full p-2 border border-gray-300 rounded"
      />
      {loading && <div className="absolute bg-white px-4 py-2">Loading...</div>}
      {!loading && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-200 mt-1 rounded shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((item) => (
            <li
              key={item._id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(item._id)}
            >
              {item.brand}
              {item.model}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductSearchBar;
