import { Link } from "react-router-dom";
import { useProducts } from "../hook";
import moment from "moment";
import PaginationControls from "../../../shared/components/PaginationControls";
import { useEffect } from "react";

export const ProductList = ({ title }: { title: string }) => {
  const { fetchProducts, page, setPage } = useProducts({ load: true });
  const { data, isError, isLoading } = fetchProducts;

  if (isError) return <span>Error occured</span>;

  useEffect(() => {
    if (data && !isError && !isLoading) {
      setPage((draft) => {
        draft.lastPage = data?.lastPage;
        draft.limit = data?.limit;
        draft.pageNumber = data?.page;
        return draft;
      });
    }
  }, [data]);

  return (
    <div>
      <div>
        <h4>{title}</h4>
      </div>
      <div>
        <PaginationControls
          currentPage={page.pageNumber}
          lastPage={page.lastPage}
          limit={page.limit}
          onPageChange={(newPage) =>
            setPage((draft) => {
              draft.pageNumber = newPage;
              return draft;
            })
          }
          onLimitChange={(newLimit) => {
            setPage((draft) => {
              draft.pageNumber = 1;
              draft.limit = newLimit;
              return draft;
            });
          }}
        />
        {isLoading ? (
          <span>Fetching...</span>
        ) : (
          <table>
            <tbody>
              <tr>
                <th>#</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Original Price</th>
                <th>Selling Price</th>
                <th>Movement Type</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Inventory</th>
                <th>Images</th>
                <th>Action</th>
              </tr>
              {!isLoading && data?.data?.length > 0 ? (
                data?.data?.map((product: any, idx: number) => {
                  return (
                    <tr key={product._id}>
                      <td>{++idx}</td>
                      <td>{product?.brand}</td>
                      <td>{product?.model}</td>
                      <td>INR {product?.originalPrice}</td>
                      <td>INR {product?.currentPrice}</td>
                      <td>{product?.movementType}</td>
                      <td>
                        {moment(product?.createdAt).format(
                          "DD MMM YYYY [at] hh:mm A"
                        )}
                      </td>
                      <td>
                        {moment(product?.updatedAt).format(
                          "DD MMM YYYY [at] hh:mm A"
                        )}
                      </td>
                      <td>{product?.inventory}</td>
                      <td>
                        <div className="image-group">
                          {product?.images?.map((img: string, i: number) => {
                            return (
                              <img
                                key={`${product?.model}-${i}`}
                                src={img}
                                alt={product?.model?.toString()}
                                loading="lazy"
                              />
                            );
                          })}
                        </div>
                      </td>
                      <td>
                        <Link to={product._id}>View</Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={20} style={{ textAlign: "center" }}>
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        <PaginationControls
          currentPage={page.pageNumber}
          lastPage={page.lastPage}
          limit={page.limit}
          onPageChange={(newPage) =>
            setPage((draft) => {
              draft.pageNumber = newPage;
              return draft;
            })
          }
          onLimitChange={(newLimit) => {
            setPage((draft) => {
              draft.pageNumber = 1;
              draft.limit = newLimit;
              return draft;
            });
          }}
        />
      </div>
    </div>
  );
};
