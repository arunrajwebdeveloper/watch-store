"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "@/styles/products/product-filters.styles.css";
import PriceRangeSlider from "./RangeSlider";

export default function ProductFilters({
  filtersItems,
}: {
  filtersItems: any;
}) {
  const { brands, colors, price, size, movementType, gender } =
    filtersItems || {};

  const router = useRouter();
  const searchParams = useSearchParams();

  const paramMin = Number(searchParams.get("minPrice"));
  const paramMax = Number(searchParams.get("maxPrice"));
  const defaultPriceMin = price?.items[0];
  const defaultPriceMax = price?.items[1];

  const [minPrice, setMinPrice] = useState<number>(paramMin);
  const [maxPrice, setMaxPrice] = useState<number>(paramMax);

  const handleFilterChange = (key: string, value: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    const existing = currentParams.getAll(key);

    if (existing.includes(value)) {
      const updated = existing.filter((v) => v !== value);
      currentParams.delete(key);
      updated.forEach((v) => currentParams.append(key, v));
    } else {
      currentParams.append(key, value);
    }

    router.push(`/products?${currentParams.toString()}`);
  };

  const handleSingleSelect = (key: string, value: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set(key, value);
    router.push(`/products?${currentParams.toString()}`);
  };

  const clearAllFilters = () => {
    router.push("/products");
  };

  const removeSingleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const existing = params.getAll(key).filter((v) => v !== value);
    params.delete(key);
    existing.forEach((v) => params.append(key, v));
    router.push(`/products?${params.toString()}`);
  };

  const isChecked = (key: string, value: string) =>
    searchParams.getAll(key).includes(value);

  const groupedParams = Array.from(searchParams.entries()).reduce<
    Record<string, string[]>
  >((acc, [key, value]) => {
    if (key === "sortBy" || key === "sortOrder") return acc;
    if (!acc[key]) acc[key] = [];
    if (!acc[key].includes(value)) acc[key].push(value);
    return acc;
  }, {});

  const handlePriceApply = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (minPrice) params.set("minPrice", String(minPrice));
    if (maxPrice) params.set("maxPrice", String(maxPrice));
    router.push(`/products?${params.toString()}`);
  };

  const handlePriceChange = (min: number, max: number) => {
    console.log("Selected price range:", min, max);
    setMinPrice(min);
    setMaxPrice(max);
  };

  return (
    <div className="product-filters">
      <div className="product-filters__header">
        <h2 className="title">Filters</h2>
        {searchParams.size > 0 && (
          <button onClick={clearAllFilters} className="clear-all">
            Clear All
          </button>
        )}
      </div>

      {/* Applied Filters */}
      {Object.entries(groupedParams).length !== 0 && (
        <div className="applied-filters-list">
          {Object.entries(groupedParams).map(([key, values]) => (
            <div key={`applied-filter-${key}`} className="applied-filter-item">
              <h3 className="applied-filter-item__title">{key}:</h3>
              <div className="chips">
                {values.map((val) => (
                  <span
                    key={`applied-filter-value-${key}-${val}`}
                    className="chip"
                  >
                    {val}
                    <button onClick={() => removeSingleFilter(key, val)}>
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="filter-items-scroller">
        {/* Price Range */}
        <FilterSection title="Price Range">
          {/* <div className="price-filter-inputs">
            <input
              type="number"
              value={minPrice || defaultPriceMin}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              placeholder="Min"
            />
            <input
              type="number"
              value={maxPrice || defaultPriceMax}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              placeholder="Max"
            />
          </div>
          <button onClick={handlePriceApply} className="price-apply">
            Apply
          </button> */}
          <PriceRangeSlider
            defaultMin={minPrice || defaultPriceMin}
            defaultMax={maxPrice || defaultPriceMax}
            min={defaultPriceMin}
            max={defaultPriceMax}
            step={100}
            gap={1000}
            onChange={handlePriceChange}
          />
          <button onClick={handlePriceApply} className="price-apply">
            Apply
          </button>
        </FilterSection>

        {/* Brand */}
        <FilterSection title="Brands">
          {brands?.items?.map((brand: any) => (
            <div
              key={`filter-item-${brands?.title}-${brand}`}
              className="filter-item-element"
            >
              <Checkbox
                label={brand}
                checked={isChecked("brand", brand)}
                onChange={() => handleFilterChange("brand", brand)}
              />
            </div>
          ))}
        </FilterSection>

        {/* Gender */}
        <FilterSection title="Gender">
          {gender?.items?.map((gender: any) => (
            <div
              key={`filter-item-${brands?.title}-${gender}`}
              className="filter-item-element"
            >
              <Radio
                name="gender"
                label={gender}
                checked={searchParams.get("gender") === gender}
                onChange={() => handleSingleSelect("gender", gender)}
              />
            </div>
          ))}
        </FilterSection>

        {/* Color */}
        <FilterSection title="Color">
          {colors?.items?.map((color: any) => (
            <div
              key={`filter-item-${brands?.title}-${color}`}
              className="filter-item-element"
            >
              <Checkbox
                label={color}
                checked={isChecked("color", color)}
                onChange={() => handleFilterChange("color", color)}
              />
            </div>
          ))}
        </FilterSection>

        {/* Movement Type */}
        <FilterSection title="Movement Type">
          {movementType?.items?.map((type: any) => (
            <div
              key={`filter-item-${brands?.title}-${type}`}
              className="filter-item-element"
            >
              <Checkbox
                label={type}
                checked={isChecked("movementType", type)}
                onChange={() => handleFilterChange("movementType", type)}
              />
            </div>
          ))}
        </FilterSection>

        {/* Size */}
        <FilterSection title="Size">
          {size?.items?.map((size: any) => (
            <div
              key={`filter-item-${brands?.title}-${size}`}
              className="filter-item-element"
            >
              <Checkbox
                label={size}
                checked={isChecked("size", size)}
                onChange={() => handleFilterChange("size", size)}
              />
            </div>
          ))}
        </FilterSection>
      </div>
    </div>
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="filter-item-block">
      <p className="filter-item__title">{title}</p>
      {children}
    </div>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="block">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span>{label}</span>
    </label>
  );
}

function Radio({
  name,
  label,
  checked,
  onChange,
}: {
  name: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="block">
      <input type="radio" name={name} checked={checked} onChange={onChange} />
      <span>{label}</span>
    </label>
  );
}
