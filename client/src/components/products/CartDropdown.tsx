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

function CartDropdown({ onProceed }: { onProceed: () => void }) {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const isLoading = useAppSelector((state) => state.cart.isLoading);
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
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div className="cart-drop-header">
        <h3>Cart</h3>
        {cartItems?.length !== 0 && (
          <span onClick={() => dispatch(clearCart())}>Clear cart</span>
        )}
      </div>
      <div className="cart-drop-scroll">
        {cartItems?.length > 0 ? (
          <ul className="ul-cart-list">
            {cartItems?.map(({ product, quantity }) => {
              return (
                <li key={product._id}>
                  <div className="item-details">
                    <div className="basic">
                      <div className="thumbnail">
                        <Link href={`/products/${product._id}`}>
                          <Image
                            src={product?.images[0]}
                            alt={`Product ${product?.brand} ${product?.model}`}
                            width={50}
                            height={50}
                            style={{ objectFit: "contain" }}
                            // loading="lazy"
                            priority={false}
                          />
                        </Link>
                      </div>
                      <div>
                        <h4>{product?.brand}</h4>
                        <span className="text-mask">{product?.model}</span>
                      </div>
                    </div>
                    <div className="actions">
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
                            xmlns="http://www.w3.org/2000/svg"
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
                      <button
                        disabled={isLoading}
                        onClick={() => dispatch(removeCartItem(product._id))}
                        className="rmv"
                      >
                        <svg
                          width="20px"
                          height="20px"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17"
                            stroke="#ff5858"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <span className="emty-cart">Cart is empty.</span>
        )}
      </div>
      <div className="cart-drop-footer">
        <button
          disabled={cartItems?.length === 0 || isLoading}
          className="btn secondary"
          onClick={() => {
            router.push("/cart");
            onProceed();
          }}
        >
          Go to cart
        </button>
      </div>
    </div>
  );
}

export default CartDropdown;
