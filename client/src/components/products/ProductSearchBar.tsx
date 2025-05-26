"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

let debounceTimeout: NodeJS.Timeout;

function ProductSearchBar() {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  // Handle click outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
        setSearch(""); // Clear search input
        setSuggestions([]); // Clear suggestions
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (productId: string) => {
    setSearch(""); // Clear search input
    setSuggestions([]); // Clear suggestions
    setShowDropdown(false); // Close the dropdown
    router.push(`/products/${productId}`); // Navigate to product detail page
  };

  return (
    <div className="search-bar-component">
      <div className="search-input-field">
        <input
          ref={inputRef}
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowDropdown(true); // Show dropdown when typing
          }}
          placeholder="Search for products..."
          className="input-element"
        />
        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none">
          <path
            d="M20 20L15.8033 15.8033M18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18C14.6421 18 18 14.6421 18 10.5Z"
            stroke="#787d91"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {loading && <div className="search-loading">Loading...</div>}
      {!loading && showDropdown && suggestions.length > 0 && (
        <div ref={dropdownRef} className="search-dropdown">
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
