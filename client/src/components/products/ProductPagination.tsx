import "@/styles/products/pagination.styles.css";
import { useRouter, useSearchParams } from "next/navigation";
import { createProductQueryUrl } from "@/lib/createProductQueryUrl";

type Props = {
  page: number;
  lastPage: number;
};

const ProductPagination = ({ page, lastPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

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
          <a
            onClick={() => {
              router.push(
                createProductQueryUrl("/products", {
                  ...Object.fromEntries(searchParams.entries()),
                  page: 1,
                })
              );
            }}
          >
            First
          </a>
          <a
            onClick={() => {
              router.push(
                createProductQueryUrl("/products", {
                  ...Object.fromEntries(searchParams.entries()),
                  page: currentPage - 1,
                })
              );
            }}
          >
            Previous
          </a>
        </>
      )}

      {pageNumbers.map((num, index) =>
        num === "..." ? (
          <span key={`ellipsis-${index}`} className="ellipsis">
            ...
          </span>
        ) : (
          <a
            key={num}
            className={`link-boxed ${num === currentPage ? "active" : ""}`}
            onClick={() => {
              router.push(
                createProductQueryUrl("/products", {
                  ...Object.fromEntries(searchParams.entries()),
                  page: num,
                })
              );
            }}
          >
            {num}
          </a>
        )
      )}

      {currentPage < lastPage && (
        <>
          <a
            onClick={() => {
              router.push(
                createProductQueryUrl("/products", {
                  ...Object.fromEntries(searchParams.entries()),
                  page: currentPage + 1,
                })
              );
            }}
          >
            Next
          </a>
          <a
            onClick={() => {
              router.push(
                createProductQueryUrl("/products", {
                  ...Object.fromEntries(searchParams.entries()),
                  page: lastPage,
                })
              );
            }}
          >
            Last
          </a>
        </>
      )}
    </div>
  );
};

export default ProductPagination;
