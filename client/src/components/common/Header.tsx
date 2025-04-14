"use client";

import React from "react";
import { logoutUser } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import Link from "next/link";

function Header() {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    window.location.href = "/login";
  };

  return (
    <header className="main-header">
      <div className="container-fluid header-container">
        <div className="header__block">
          <Link href="/">
            <h2 className="main-logo">WatchStore</h2>
          </Link>
          <div className="header-actions-block">
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
