"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

function AuthBanner() {
  const path = usePathname();

  const url =
    {
      "/login": {
        quote: "Welcome back. Let’s make every second count.",
        image: "/login-banner.avif",
      },
      "/register": {
        quote: "Time starts ticking the moment you begin.",
        image: "/register-banner.avif",
      },
      "/reset-password": {
        quote: "Mistakes fade, but moments return — reset now.",
        image: "/forgot-password-banner.avif",
      },
    }[path] || {};

  return (
    <>
      <div className="auth__banner-text">
        <div className="auth__banner-text-content">
          <h2>{url?.quote}</h2>
          <span className="banner-sub-text">
            Explore our exclusive collection of premium watches.
          </span>
        </div>
      </div>
      <Image
        className="auth__banner-image"
        src={url?.image || ""}
        alt="Auth banner image"
        fill
      />
    </>
  );
}

export default AuthBanner;
