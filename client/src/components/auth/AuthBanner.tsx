"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

function AuthBanner() {
  const path = usePathname();

  const url =
    {
      "/login": "/login-banner.avif",
      "/register": "/register-banner.avif",
      "/reset-password": "/forgot-password-banner.avif",
    }[path] || "";

  return (
    <Image
      className="auth__banner-image"
      src={url}
      alt="Auth banner image"
      fill
    />
  );
}

export default AuthBanner;
