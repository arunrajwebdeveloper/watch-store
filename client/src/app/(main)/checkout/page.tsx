"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store";
import { removeCartItem, updateCartItem } from "@/store/slices/cartSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { currencyFormat } from "@/utils/currencyFormat";

function CheckoutPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [addressId, setAddressId] = useState("");
  const cartState = useAppSelector((state) => state.cart);
  const user = useAppSelector((state) => state.auth.user);

  const createCartBreakdown = (cart: any) => {
    return {
      productTotal: { label: "Subtotal", value: cart?.cartTotalAmount },
      discount: {
        label: cartState?.appliedCoupon?.code,
        value: cart?.cartDiscountAmount,
      },
      gstAmount: {
        label: `GST (${cart?.gstPercentage * 100}%)`,
        value: cart?.gstAmount,
      },
      shippingFee: { label: "Shipping Fee", value: cart?.shippingFee },
      grandTotal: { label: "Total Payable", value: cart?.cartFinalTotalAmount },
    };
  };

  const priceBreakdownList = createCartBreakdown(cartState);

  return (
    <div className="container">
      <div className="product-listing-page">
        <div className="listing-page-layout">
          <div className="cart-layout-wrapper">
            <div className="page-header">
              <h2>Checkout</h2>
            </div>
            <div>
              <div className="checkout-address-list-block">
                <div className="page-header">
                  <h3>Delivery Address</h3>
                </div>
                <div className="address-list">
                  {user?.addressList?.map((ad: any) => {
                    const {
                      _id,
                      address,
                      city,
                      contact,
                      country,
                      fullname,
                      postalCode,
                      state,
                      street,
                      tag,
                      isDefault,
                    } = ad;

                    return (
                      <div
                        key={_id}
                        className={`address-item-box ${
                          addressId === _id ? "selected" : ""
                        }`}
                        onClick={() => setAddressId(_id)}
                      >
                        <span className="badge">{tag}</span>

                        <div className="address-item">
                          <p>{fullname}</p>
                          <p>{`${address} ${street}`}</p>
                          <p>{`${city}, ${country}, ${state}`}</p>
                          <p>{postalCode}</p>
                          <p>Ph: {contact}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="product-listing-wrap">
                <div className="page-header">
                  <h3>Products</h3>
                </div>
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
                      cartState?.cartItems?.map(
                        ({ product, quantity }, idx) => {
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
                                    <h4 className="brand-name">
                                      {product?.brand}
                                    </h4>
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
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="counts">
                                  <span>{quantity}</span>
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
                        }
                      )
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
          </div>
          <div className="cart-layout-sidebar">
            <div className="cart-sidebar-wrap">
              {cartState?.cartItems?.length > 0 && (
                <div className="sidebar-box">
                  <div className="box-header">
                    <h4>Summary</h4>
                  </div>
                  <div className="sidebar-box-content">
                    <table className="summary-table">
                      <tbody>
                        {Object.entries(priceBreakdownList).map(
                          ([key, { value, label }]) => {
                            if (key === "discount") {
                              if (value !== 0) {
                                return (
                                  <tr key={key} style={{ color: "green" }}>
                                    <td>
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: "5px",
                                        }}
                                      >
                                        <svg
                                          width="18px"
                                          height="18px"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                        >
                                          <path
                                            d="M7.0498 7.0498H7.0598M10.5118 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V10.5118C3 11.2455 3 11.6124 3.08289 11.9577C3.15638 12.2638 3.27759 12.5564 3.44208 12.8249C3.6276 13.1276 3.88703 13.387 4.40589 13.9059L9.10589 18.6059C10.2939 19.7939 10.888 20.388 11.5729 20.6105C12.1755 20.8063 12.8245 20.8063 13.4271 20.6105C14.112 20.388 14.7061 19.7939 15.8941 18.6059L18.6059 15.8941C19.7939 14.7061 20.388 14.112 20.6105 13.4271C20.8063 12.8245 20.8063 12.1755 20.6105 11.5729C20.388 10.888 19.7939 10.2939 18.6059 9.10589L13.9059 4.40589C13.387 3.88703 13.1276 3.6276 12.8249 3.44208C12.5564 3.27759 12.2638 3.15638 11.9577 3.08289C11.6124 3 11.2455 3 10.5118 3ZM7.5498 7.0498C7.5498 7.32595 7.32595 7.5498 7.0498 7.5498C6.77366 7.5498 6.5498 7.32595 6.5498 7.0498C6.5498 6.77366 6.77366 6.5498 7.0498 6.5498C7.32595 6.5498 7.5498 6.77366 7.5498 7.0498Z"
                                            stroke="green"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                        {label}
                                      </div>
                                    </td>
                                    <td>{`- ${currencyFormat(
                                      parseInt(value.toString())
                                    )}`}</td>
                                  </tr>
                                );
                              }
                              return;
                            }
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
                                    <p>{`(Taxes included)`}</p>
                                  </td>
                                </tr>
                              );
                            }
                            return (
                              <tr key={key}>
                                <td>{label}</td>
                                <td>
                                  {currencyFormat(parseInt(value.toString()))}
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                    <div className="checkout-final-btn">
                      <button className="btn primary">
                        Proceed to Payment
                      </button>
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

export default CheckoutPage;
