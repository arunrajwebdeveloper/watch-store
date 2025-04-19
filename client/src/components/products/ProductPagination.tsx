import Link from "next/link";
import "@/styles/products/pagination.styles.css";

type Props = {
  page: number;
  lastPage: number;
};

const ProductPagination = ({ page, lastPage }: Props) => {
  const currentPage = Number(page);
  const pageNumbers: (number | string)[] = [];

  // Always show the first 3 pages or until currentPage if it's less than 3
  for (let i = 1; i <= Math.min(3, lastPage); i++) {
    pageNumbers.push(i);
  }

  // Add ellipsis if needed before the last page
  if (lastPage > 4) {
    if (currentPage > 4 && currentPage < lastPage - 1) {
      pageNumbers.push("...");
      pageNumbers.push(currentPage);
      pageNumbers.push("...");
    } else {
      pageNumbers.push("...");
    }

    // Always show the last page
    pageNumbers.push(lastPage);
  }

  return (
    <div className="pagination-element">
      {currentPage > 1 && (
        <>
          <Link href={`/products?page=1`}>First</Link>
          <Link href={`/products?page=${currentPage - 1}`}>Previous</Link>
        </>
      )}

      {pageNumbers.map((num, index) =>
        num === "..." ? (
          <span key={`ellipsis-${index}`} className="ellipsis">
            ...
          </span>
        ) : (
          <Link
            key={num}
            className={`link-boxed ${num === currentPage ? "active" : ""}`}
            href={`/products?page=${num}`}
          >
            {num}
          </Link>
        )
      )}

      {currentPage < lastPage && (
        <>
          <Link href={`/products?page=${currentPage + 1}`}>Next</Link>
          <Link href={`/products?page=${lastPage}`}>Last</Link>
        </>
      )}
    </div>
  );
};

export default ProductPagination;
