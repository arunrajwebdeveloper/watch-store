"use client";

import React, { useEffect, useRef, useState } from "react";

type Option = {
  label: string;
  value: string | number;
};

type Props = {
  selected: string | number | null;
  placeholder: string;
  data: Option[];
  onChange: (value: Option) => void;
};

const Dropdown: React.FC<Props> = ({
  selected,
  data,
  placeholder,
  onChange,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

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

  const onSelectValue = (e: Option) => {
    onChange(e);
    setIsVisible(false);
  };

  return (
    <div className="dropdown-element" ref={dropdownRef}>
      <div className="dropdown-element-ui">
        <div className="dropdown-element__selected" onClick={toggleDropdown}>
          <span>{selected ? selected : placeholder}</span>
          <img className="arrow" src="./down-arrow.svg" alt="down arrow" />
        </div>
        {isVisible && (
          <div className="dropdown-element__list">
            {data.map((list) => {
              return (
                <div
                  key={`${list.label}-${list.value}`}
                  onClick={() => onSelectValue(list)}
                  className={`dropdown-element__item ${
                    selected === list.value ? "selected" : ""
                  }`}
                >
                  {list.label}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
