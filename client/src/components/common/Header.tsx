"use client";

import React, { useEffect, useRef, useState } from "react";
import { logoutUser } from "@/store/slices/authSlice";
import { useAppSelector, useAppDispatch } from "@/store";
import Link from "next/link";
import CartDropdown from "../products/CartDropdown";
import { useRouter } from "next/navigation";

function Header() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const cartItemsCount = useAppSelector((state) => state.cart.cartItemCount);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    // window.location.href = "/login";
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);

  return (
    <>
      <header className="top-header">
        <div className="container top-header__container">
          <div className="top-header-block">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span>
                <small>+91-9876543210</small>
              </span>
              |
              <span>
                <small>watchstore@gmail.com</small>
              </span>
            </div>
            <div className="top-header-actions">
              <Link className="top-header-link" href={"/wishlist"}>
                <svg
                  width="800px"
                  height="800px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path
                      d="M12 7.69431C10 2.99988 3 3.49988 3 9.49991C3 15.4999 12 20.5001 12 20.5001C12 20.5001 21 15.4999 21 9.49991C21 3.49988 14 2.99988 12 7.69431Z"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
                <span>Wishlist</span>
              </Link>

              <div className="top-header-link has-dropdown" ref={dropdownRef}>
                <div
                  className="link-content"
                  onClick={() => setIsVisible((prev) => !prev)}
                >
                  <svg
                    width="800px"
                    height="800px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <path
                        d="M8 8H7.71094C6.74786 8 6.26653 8 5.87598 8.17521C5.5317 8.32965 5.23841 8.57838 5.02947 8.89258C4.79244 9.24902 4.71276 9.72386 4.55443 10.6738L3.62109 16.2738L3.62072 16.2759C3.40728 17.5565 3.3005 18.1972 3.48595 18.6965C3.64877 19.1348 3.96058 19.5022 4.36621 19.7349C4.82844 20 5.47776 20 6.77734 20H17.2224C18.522 20 19.1724 20 19.6346 19.7349C20.0402 19.5022 20.3513 19.1348 20.5141 18.6965C20.6995 18.1974 20.5928 17.557 20.3795 16.2774L20.3786 16.2738L19.4453 10.6738C19.287 9.72386 19.2077 9.24902 18.9707 8.89258C18.7618 8.57838 18.4682 8.32965 18.124 8.17521C17.7334 8 17.2524 8 16.2893 8H16M8 8H16M8 8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </svg>
                  {/* <span>Cart</span> */}
                  {isAuthenticated && user && (
                    <span className="count-badge">{cartItemsCount}</span>
                  )}
                </div>
                {isVisible && (
                  <div className="menu-dropdown-element">
                    <div className="menu-drop-content">
                      <CartDropdown
                        onProceed={() => setIsVisible((prev) => !prev)}
                      />
                    </div>
                  </div>
                )}
              </div>
              {!isAuthenticated && !user && (
                <>
                  <Link className="top-header-link" href={"/login"}>
                    <svg
                      width="800px"
                      height="800px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g>
                        <path
                          d="M9.23047 9H7.2002C6.08009 9 5.51962 9 5.0918 9.21799C4.71547 9.40973 4.40973 9.71547 4.21799 10.0918C4 10.5196 4 11.0801 4 12.2002V17.8002C4 18.9203 4 19.4801 4.21799 19.9079C4.40973 20.2842 4.71547 20.5905 5.0918 20.7822C5.5192 21 6.07902 21 7.19694 21H16.8031C17.921 21 18.48 21 18.9074 20.7822C19.2837 20.5905 19.5905 20.2842 19.7822 19.9079C20 19.4805 20 18.9215 20 17.8036V12.1969C20 11.079 20 10.5192 19.7822 10.0918C19.5905 9.71547 19.2837 9.40973 18.9074 9.21799C18.4796 9 17.9203 9 16.8002 9H14.7689M9.23047 9H14.7689M9.23047 9C9.10302 9 9 8.89668 9 8.76923V6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6V8.76923C15 8.89668 14.8964 9 14.7689 9"
                          stroke="#000000"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    </svg>
                    <span>Login</span>
                  </Link>
                  <Link className="top-header-link" href={"/register"}>
                    <svg
                      width="800px"
                      height="800px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g>
                        <path
                          d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"
                          stroke="#000000"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    </svg>
                    <span>Register</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      <header className="main-header">
        <div className="container header-container">
          <div className="header__block">
            <Link href="/">
              <h2 className="main-logo">
                Watch<span className="colored">Store</span>
              </h2>
            </Link>
            <div className="header-menu">
              <nav className="header-nav">
                <Link href="/products">Shop</Link>
              </nav>
            </div>
            <div className="header-actions-block">
              {isAuthenticated && user && (
                <>
                  <div
                    onClick={() => router.push("/profile")}
                    style={{ cursor: "pointer" }}
                  >
                    {/*<div>{user?.name}</div>
                   <div>{user?.email}</div> */}
                    <img
                      className="user-avatar"
                      src={user?.avatar}
                      alt={user?.name}
                    />
                  </div>
                  <a className="logout-btn" onClick={handleLogout}>
                    Logout
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
