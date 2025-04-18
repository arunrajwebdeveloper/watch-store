import Link from "next/link";
import "@/styles/products/pagination.styles.css";

type Props = {
  page: number;
  lastPage: number;
};

const ProductPagination = ({ page, lastPage }: Props) => {
  const currentPage = Number(page);
  const pageNumbers = [];

  // Center around current page: show 5 pages max (e.g., 3 4 5 6 7)
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(lastPage, currentPage + 2);

  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-element">
      {currentPage > 1 && (
        <>
          <Link href={`/products?page=1`}>First</Link>
          <Link href={`/products?page=${currentPage - 1}`}>Previous</Link>
        </>
      )}

      {pageNumbers.map((num) => (
        <Link
          className={`link-boxed ${num === currentPage ? "active" : ""}`}
          key={num}
          href={`/products?page=${num}`}
        >
          {num}
        </Link>
      ))}

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
