"use client";
import React from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  clearCart,
  removeCartItem,
  updateCartItem,
} from "@/store/slices/cartSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { currencyFormat } from "@/utils/currencyFormat";

function CartPage() {
  const isLoading = useAppSelector((state) => state.cart.isLoading);
  const cartState = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleQuantity = (
    { quantity, productId }: { quantity: number; productId: string },
    type = "INC"
  ) => {
    if (type === "DEC") {
      if (quantity > 1) {
        dispatch(updateCartItem({ quantity: quantity - 1, productId }));
      } else {
        dispatch(removeCartItem(productId));
      }
    } else {
      dispatch(updateCartItem({ quantity: quantity + 1, productId }));
    }
  };

  return (
    <div className="container">
      <div className="product-listing-page">
        <div className="listing-page-layout">
          <div className="cart-layout-wrapper">
            <div className="page-header">
              <h2>Shopping Cart</h2>
            </div>
            <div>
              <table className="product-listing-table">
                <tbody>
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>

                  {cartState?.cartItems?.length > 0 ? (
                    cartState?.cartItems?.map(({ product, quantity }, idx) => {
                      return (
                        <tr key={`product-cart-list-${product._id}`}>
                          <td>{++idx}</td>
                          <td>
                            <div className="item-basic-infos">
                              <Link href={`/products/${product._id}`}>
                                <Image
                                  src={product?.images[0]}
                                  alt={`Product ${product?.brand} ${product?.model}`}
                                  width={100}
                                  height={100}
                                  style={{ objectFit: "contain" }}
                                  priority={false}
                                />
                              </Link>
                              <div>
                                <h4 className="brand-name">{product?.brand}</h4>
                                <div>
                                  <span className="brand-model">
                                    {product?.model}
                                  </span>
                                </div>
                                <div className="product-description">
                                  <div className="sm-txt">{`Size: ${product.size}mm`}</div>
                                  <div className="sm-txt">{`Color: ${product.color}`}</div>
                                  <div className="sm-txt">{`Movement Type: ${product.movementType}`}</div>
                                </div>
                                <button
                                  disabled={isLoading}
                                  onClick={() =>
                                    dispatch(removeCartItem(product._id))
                                  }
                                  className="rmv-btn"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="counts">
                              <button
                                onClick={() =>
                                  handleQuantity(
                                    {
                                      quantity,
                                      productId: product._id,
                                    },
                                    "DEC"
                                  )
                                }
                              >
                                <svg
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <g>
                                    <path
                                      id="Vector"
                                      d="M6 12H18"
                                      stroke="#000000"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                </svg>
                              </button>
                              <input type="text" value={quantity} readOnly />
                              <button
                                onClick={() =>
                                  handleQuantity(
                                    {
                                      quantity,
                                      productId: product._id,
                                    },
                                    "INC"
                                  )
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <g>
                                    <path
                                      id="Vector"
                                      d="M6 12H12M12 12H18M12 12V18M12 12V6"
                                      stroke="#000000"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                </svg>
                              </button>
                            </div>
                          </td>
                          <td>
                            {currencyFormat(
                              parseInt(product.currentPrice.toString())
                            )}
                          </td>
                          <td>
                            {currencyFormat(
                              parseInt(
                                (product.currentPrice * quantity).toString()
                              )
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={10} className="emty-cart">
                        Cart is empty.
                      </td>
                    </tr>
                  )}

                  {cartState?.cartItems?.length > 0 && (
                    <tr className="cart-total-footer">
                      <td colSpan={4}>Subtotal</td>
                      <td>
                        {currencyFormat(
                          parseInt(cartState.cartTotalAmount.toString())
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div
              style={{
                textAlign: "right",
                marginTop: "30px",
                marginBottom: "30px",
              }}
            >
              <button
                onClick={() => router.push("/checkout")}
                className="btn secondary"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
