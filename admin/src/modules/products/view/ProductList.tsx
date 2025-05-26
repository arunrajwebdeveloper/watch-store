import { Link } from "react-router-dom";
import { useProducts } from "../hook";
import moment from "moment";
import PaginationControls from "../../../shared/components/PaginationControls";
import { useEffect } from "react";
import { PageLayout } from "../../../layouts";
import { currencyFormatter } from "../../../utils";

const CreateProduct = () => (
  <div>
    <Link to="create" className="btn btn-primary px-4 py-2">
      Create new product
    </Link>
  </div>
);

export const ProductList = () => {
  const { fetchProducts, page, setPage } = useProducts({ load: true });
  const { data, isError, isLoading } = fetchProducts;

  if (isError) return <span>Error occured</span>;

  useEffect(() => {
    if (data && !isError && !isLoading) {
      setPage((draft) => {
        draft.lastPage = data?.lastPage;
        draft.limit = data?.limit;
        draft.pageNumber = data?.page;
        draft.total = data?.total;
        return draft;
      });
    }
  }, [data]);

  return (
    <PageLayout title="Product List" Component={CreateProduct}>
      <div>
        <PaginationControls
          currentPage={page.pageNumber}
          lastPage={page.lastPage}
          limit={page.limit}
          total={page.total}
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
          <table className="table">
            <tbody>
              <tr>
                <th>#</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Original Price</th>
                <th>Selling Price</th>
                <th>Movement Type</th>
                <th>Created At</th>
                <th>Inventory</th>
                <th>Images</th>
                <th>Action</th>
              </tr>
              {!isLoading && data?.data?.length > 0 ? (
                data?.data?.map((product: any, idx: number) => {
                  return (
                    <tr key={product._id}>
                      <td valign="middle">{++idx}</td>
                      <td valign="middle">{product?.brand}</td>
                      <td valign="middle">{product?.model}</td>
                      <td valign="middle">
                        {currencyFormatter(+product?.originalPrice)}
                      </td>
                      <td valign="middle">
                        {currencyFormatter(+product?.currentPrice)}
                      </td>
                      <td valign="middle">{product?.movementType}</td>
                      <td valign="middle">
                        {moment(product?.createdAt).format(
                          "DD MMM YYYY [at] hh:mm A"
                        )}
                      </td>
                      <td valign="middle">{product?.inventory}</td>
                      <td valign="middle">
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
                      <td valign="middle">
                        <Link to={product._id}>View</Link> &nbsp;
                        <Link to={`edit/${product._id}`}>Edit</Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={20}
                    style={{ textAlign: "center" }}
                    valign="middle"
                  >
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
          total={page.total}
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
    </PageLayout>
  );
};
