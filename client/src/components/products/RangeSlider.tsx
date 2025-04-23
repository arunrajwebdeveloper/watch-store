"use client";

import React, { useEffect, useState } from "react";
import "@/styles/products/range-slider.styles.css";

interface PriceRangeSliderProps {
  min?: number;
  max?: number;
  step?: number;
  defaultMin?: number;
  defaultMax?: number;
  gap?: number;
  onChange?: (min: number, max: number) => void;
}

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  min = 0,
  max = 100000,
  step = 100,
  defaultMin = 0,
  defaultMax = 100000,
  gap = 1000,
  onChange,
}) => {
  const [minVal, setMinVal] = useState<number>(defaultMin);
  const [maxVal, setMaxVal] = useState<number>(defaultMax);

  useEffect(() => {
    const left = (minVal / max) * 100;
    const right = 100 - (maxVal / max) * 100;
    const progress = document.querySelector<HTMLElement>(".slider .progress");
    if (progress) {
      progress.style.left = `${left}%`;
      progress.style.right = `${right}%`;
    }

    if (onChange) onChange(minVal, maxVal);
  }, [minVal, maxVal]);

  const handleMinChange = (value: number) => {
    if (maxVal - value >= gap) {
      setMinVal(value);
    }
  };

  const handleMaxChange = (value: number) => {
    if (value - minVal >= gap) {
      setMaxVal(value);
    }
  };

  return (
    <div className="range-slider">
      <div className="slider">
        <div className="progress"></div>
      </div>
      <div className="range-input">
        <input
          type="range"
          className="range-min"
          min={min}
          max={max}
          step={step}
          value={minVal}
          onChange={(e) => handleMinChange(parseInt(e.target.value))}
        />
        <input
          type="range"
          className="range-max"
          min={min}
          max={max}
          step={step}
          value={maxVal}
          onChange={(e) => handleMaxChange(parseInt(e.target.value))}
        />
      </div>
      <div className="price-input">
        <div className="field">
          <span>Min</span>
          <input
            type="number"
            className="input-min"
            value={minVal}
            onChange={(e) => handleMinChange(parseInt(e.target.value))}
          />
        </div>
        <div className="separator">-</div>
        <div className="field">
          <span>Max</span>
          <input
            type="number"
            className="input-max"
            value={maxVal}
            onChange={(e) => handleMaxChange(parseInt(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
