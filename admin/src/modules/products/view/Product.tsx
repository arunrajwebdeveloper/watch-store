import { Link, useParams } from "react-router-dom";
import { useProducts } from "../hook";
import moment from "moment";
import { PageLayout } from "../../../layouts";
import { currencyFormatter } from "../../../utils";

function Product() {
  const { id: productId } = useParams();

  const { fetchProductsById } = useProducts({ productId });

  const { isError, data } = fetchProductsById;

  if (isError) return <span>Error Occured</span>;

  return (
    <PageLayout title="Product List">
      <div>
        <table>
          <tbody>
            <tr>
              <td colSpan={2}>
                <div className="image-group">
                  {data?.product?.images?.map((img: any, i: number) => {
                    return (
                      <img
                        key={`${data?.product?.model}-${i}`}
                        src={img}
                        alt={data?.product?.model?.toString()}
                        loading="lazy"
                        style={{ width: "100px", height: "100px" }}
                      />
                    );
                  })}
                </div>
              </td>
            </tr>
            <tr>
              <td>Brand:</td>
              <td>{data?.product?.brand}</td>
            </tr>
            <tr>
              <td>Model:</td>
              <td>{data?.product?.model}</td>
            </tr>
            <tr>
              <td>Original Price:</td>
              <td>{currencyFormatter(+data?.product?.originalPrice)}</td>
            </tr>
            <tr>
              <td>Current Price:</td>
              <td>{currencyFormatter(+data?.product?.currentPrice)}</td>
            </tr>
            <tr>
              <td>Movement Type:</td>
              <td>{data?.product?.movementType}</td>
            </tr>
            <tr>
              <td>Inventory:</td>
              <td>{data?.product?.inventory}</td>
            </tr>
            <tr>
              <td>Created At:</td>
              <td>
                {moment(data?.product?.createdAt).format(
                  "DD MMM YYYY [at] hh:mm A"
                )}
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <Link to={`../edit/${productId}`}>Edit</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </PageLayout>
  );
}

export default Product;
