import React from "react";

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

const PaginationControls: React.FC<PaginationProps> = ({
  currentPage,
  lastPage,
  limit,
  onPageChange,
  onLimitChange,
}) => {
  const limits = [5, 10, 20, 50];

  return (
    <div className="pagination-wrapper">
      <div className="pagination">
        <button
          onClick={() => onPageChange(+currentPage - 1)}
          disabled={+currentPage === 1}
        >
          Prev
        </button>
        {Array.from({ length: lastPage }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => onPageChange(i + 1)}
            className={+currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => onPageChange(+currentPage + 1)}
          disabled={+currentPage === +lastPage}
        >
          Next
        </button>
      </div>

      <div className="limit">
        <label htmlFor="limit" className="mr-2 font-medium">
          Items per page:
        </label>
        <select
          id="limit"
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
        >
          {limits.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PaginationControls;
