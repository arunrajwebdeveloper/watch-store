// app/not-found.tsx

import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "4rem" }}>
      <h1 style={{ fontSize: "4rem", marginBottom: "1rem" }}>404</h1>
      <p style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link href="/" style={{ color: "#0070f3", fontSize: "1.2rem" }}>
        Go back home
      </Link>
    </div>
  );
}
