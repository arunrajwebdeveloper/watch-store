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

const GST_RATE = 0.18; // 18%
const SHIPPING_FEE = 199;
const DISCOUNT = 0.1; // 20%

function CartPage() {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const isLoading = useAppSelector((state) => state.cart.isLoading);
  const cartTotalAmount = useAppSelector((state) => state.cart.cartTotalAmount);

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

  const calculateFinalPrice = (totalProductPrice: number) => {
    const discountedAmount = (totalProductPrice * (DISCOUNT * 100)) / 100;
    const afterDiscountAmount =
      totalProductPrice - (totalProductPrice * (DISCOUNT * 100)) / 100;
    const gstAmount = afterDiscountAmount * GST_RATE;
    const totalWithGST = afterDiscountAmount + gstAmount;
    const finalAmount = totalWithGST + SHIPPING_FEE;

    return {
      productTotal: { label: "Subtotal", value: totalProductPrice },
      discount: {
        label: `Discount (${DISCOUNT * 100}%)`,
        value: discountedAmount,
      },
      gstAmount: { label: `GST (${GST_RATE * 100}%)`, value: gstAmount },
      shippingFee: { label: "Shipping Fee", value: SHIPPING_FEE },
      grandTotal: { label: "Total Payable", value: finalAmount },
    };
  };

  const priceBreakdownList = calculateFinalPrice(cartTotalAmount);

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
                  {cartItems?.length > 0 ? (
                    cartItems?.map(({ product, quantity }, idx) => {
                      return (
                        <tr key={`product-main-list-${product._id}`}>
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
                                  <span className="brnd-model">
                                    {product?.model}
                                  </span>
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
                </tbody>
              </table>
            </div>
          </div>
          <div className="cart-layout-sidebar">
            <div className="cart-sidebar-wrap">
              {cartItems?.length > 0 && (
                <div className="sidebar-box">
                  <div className="box-header">
                    <h4>Summary</h4>
                  </div>
                  <div className="sidebar-box-content">
                    <div className="promo-code">
                      <h4>Do you have a promo code?</h4>
                      <div>
                        <div className="promo-code-field">
                          <input
                            className="input-element"
                            placeholder="Promo code"
                            // value=""
                            onChange={() => {}}
                          />
                          <button className="btn secondary">Apply</button>
                        </div>
                        <div className="invalid-message">
                          Promo code is invalid or expired.
                        </div>
                        <div className="applied-promo-code">
                          <div className="promocode-display">
                            <span>ZONE2345Y</span>
                            <button>
                              <svg
                                width="22px"
                                height="22px"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <g>
                                  <path
                                    d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16"
                                    stroke="#000000"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <table className="summary-table">
                      <tbody>
                        {Object.entries(priceBreakdownList).map(
                          ([key, { value, label }]) => {
                            if (key === "grandTotal") {
                              return (
                                <tr key={key} className="grand-total">
                                  <td>
                                    <h3>{label}</h3>
                                  </td>
                                  <td>
                                    <h3>
                                      {currencyFormat(
                                        parseInt(value.toString())
                                      )}
                                    </h3>
                                  </td>
                                </tr>
                              );
                            }
                            return (
                              <tr
                                key={key}
                                style={{
                                  color: key === "discount" ? "green" : "",
                                }}
                              >
                                <td>{label}</td>
                                <td>
                                  {key === "discount" ? "-" : ""}
                                  {currencyFormat(parseInt(value.toString()))}
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                    <div className="checkout-final-btn">
                      <button className="btn primary">Checkout</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
