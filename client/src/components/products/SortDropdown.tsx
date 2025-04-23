"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createProductQueryUrl } from "@/lib/createProductQueryUrl";

const data = {
  "createdAt:desc": "Newest",
  "currentPrice:asc": "Price: Low to High",
  "currentPrice:desc": "Price: High to Low",
} as const;

type SortOptionKey = keyof typeof data;

export default function SortDropdown() {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selected, setSelected] = useState<SortOptionKey>(
    `${searchParams.get("sortBy") || "createdAt"}:${
      searchParams.get("sortOrder") || "desc"
    }` as SortOptionKey
  );

  const handleSortChange = (value: string) => {
    const [sortBy, sortOrder] = value?.split(":");
    setSelected(value as SortOptionKey);
    router.push(
      createProductQueryUrl("/products", {
        ...Object.fromEntries(searchParams.entries()),
        sortBy,
        sortOrder,
      })
    );

    setIsVisible(false);
  };

  const toggleDropdown = () => {
    setIsVisible((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);

  return (
    <div className="dropdown-element" ref={dropdownRef}>
      <div className="dropdown-element-ui">
        <div className="dropdown-element__selected" onClick={toggleDropdown}>
          <span>{data[selected]}</span>
          <img className="arrow" src="./down-arrow.svg" alt="down arrow" />
        </div>
        {isVisible && (
          <div className="dropdown-element__list">
            {Object.entries(data)?.map((list) => {
              const [value, label] = list;
              return (
                <div
                  key={`${label}-${value}`}
                  onClick={() => handleSortChange(value)}
                  className={`dropdown-element__item ${
                    selected === value ? "selected" : ""
                  }`}
                >
                  {label}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
