import { Link, useParams } from "react-router-dom";
import { useProducts } from "../hook";
import moment from "moment";

function Product({ title }: { title: string }) {
  const { id: productId } = useParams();

  const { fetchProductsById, product } = useProducts({ productId });

  const { isError } = fetchProductsById;

  console.log("product :>> ", product);

  if (isError) return <span>Error Occured</span>;

  return (
    <div>
      <div>
        <h4>{title}</h4>
      </div>
      <div>
        <table>
          <tbody>
            <tr>
              <td colSpan={2}>
                <div className="image-group">
                  {product?.images?.map((img: any, i: number) => {
                    return (
                      <img
                        key={`${product?.model}-${i}`}
                        src={img.url}
                        alt={product?.model?.toString()}
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
              <td>{product?.brand}</td>
            </tr>
            <tr>
              <td>Model:</td>
              <td>{product?.model}</td>
            </tr>
            <tr>
              <td>Original Price:</td>
              <td>INR {product?.originalPrice}</td>
            </tr>
            <tr>
              <td>Current Price:</td>
              <td>INR {product?.currentPrice}</td>
            </tr>
            <tr>
              <td>Movement Type:</td>
              <td>{product?.movementType}</td>
            </tr>
            <tr>
              <td>Inventory:</td>
              <td>{product?.inventory}</td>
            </tr>
            <tr>
              <td>Created At:</td>
              <td>
                {moment(product?.createdAt).format("DD MMM YYYY [at] hh:mm A")}
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <Link to=".">Edit Product</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Product;
