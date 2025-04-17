"use client";

import React from "react";
import { logoutUser } from "@/store/slices/authSlice";
import { useAppSelector, useAppDispatch } from "@/store";
import Link from "next/link";

function Header() {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    // window.location.href = "/login";
  };

  return (
    <header className="main-header">
      <div className="container-fluid header-container">
        <div className="header__block">
          <Link href="/">
            <h2 className="main-logo">WatchStore</h2>
          </Link>
          <div className="header-menu">
            <nav className="header-nav">
              <Link href="/products">Products</Link>
            </nav>
          </div>
          <div className="header-actions-block">
            {user && (
              <div>
                <div>{user?.name}</div>
                {/* <div>{user?.email}</div> */}
              </div>
            )}
            {isAuthenticated && <a onClick={handleLogout}>Logout</a>}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
