import React from "react";
import PaginationInfo from "./PaginationInfo";

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

const PaginationControls: React.FC<PaginationProps> = ({
  currentPage,
  lastPage,
  limit,
  total,
  onPageChange,
  onLimitChange,
}) => {
  const limits = [5, 10, 20, 50];

  const generatePageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (lastPage <= 5) {
      for (let i = 1; i <= lastPage; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", lastPage);
      } else if (currentPage >= lastPage - 2) {
        pages.push(1, "...", lastPage - 2, lastPage - 1, lastPage);
      } else {
        pages.push(1, "...", currentPage, "...", lastPage);
      }
    }

    return pages;
  };

  const pages = generatePageNumbers();

  return (
    <div className="pagination-wrapper">
      <div className="pagination">
        {currentPage > 1 && (
          <>
            <button onClick={() => onPageChange(1)}>First</button>
            <button onClick={() => onPageChange(currentPage - 1)}>Prev</button>
          </>
        )}

        {pages.map((p, index) =>
          p === "..." ? (
            <span key={`ellipsis-${index}`} className="ellipsis-item">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(Number(p))}
              className={+currentPage === p ? "active" : ""}
            >
              {p}
            </button>
          )
        )}

        {currentPage < lastPage && (
          <>
            <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
            <button onClick={() => onPageChange(lastPage)}>Last</button>
          </>
        )}
      </div>

      <div className="d-flex align-items-center gap-4">
        <div className="limit d-flex gap-3 align-items-center">
          <label className="mr-2 font-medium">Items per page</label>
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
        <PaginationInfo
          currentPage={currentPage}
          limit={limit}
          totalItems={total}
        />
      </div>
    </div>
  );
};

export default PaginationControls;
