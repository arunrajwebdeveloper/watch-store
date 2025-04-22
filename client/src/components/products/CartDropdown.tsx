import { useAppSelector } from "@/store";
import Image from "next/image";
import React from "react";

function CartDropdown() {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  return (
    <div style={{ height: "100%" }}>
      <div className="cart-drop-header">
        <h3>Cart</h3>
      </div>
      <div className="cart-drop-scroll">
        <ul className="ul-cart-list">
          {cartItems?.length > 0 ? (
            cartItems?.map(({ product, quantity }) => {
              // console.log("item :>> ", product);
              return (
                <li>
                  <div className="item-details">
                    <div className="basic">
                      <div className="thumbnail">
                        <Image
                          src={product?.images[0]}
                          alt={`cart-list-${product._id}`}
                          width={50}
                          height={50}
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                      <div>
                        <h4>{product?.brand}</h4>
                        <span className="text-mask">{product?.model}</span>
                      </div>
                    </div>
                    <div className="actions">
                      <div className="counts">
                        <button onClick={() => {}}>
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
                        <input
                          type="text"
                          value={quantity}
                          onChange={() => {}}
                        />
                        <button onClick={() => {}}>
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
                      <button onClick={() => {}} className="rmv">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="800px"
                          height="800px"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17"
                            stroke="#d15c5c"
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
            })
          ) : (
            <span>Cart is empty.</span>
          )}
        </ul>
      </div>
      <div className="cart-drop-footer">
        <button disabled={cartItems?.length === 0} className="btn secondary">
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartDropdown;
