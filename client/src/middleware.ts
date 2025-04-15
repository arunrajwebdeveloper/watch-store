// import type { NextRequest } from "next/server";
// import { NextResponse } from "next/server";

// // This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname;

//   const isPublicPath =
//     path === "/login" ||
//     path === "/register" ||
//     path === "/reset-password" ||
//     path === "/products" ||
//     path.startsWith("/product/");

//   const token = request.cookies.get("accessToken")?.value || "";

//   if (isPublicPath && token) {
//     return NextResponse.redirect(new URL("/home", request.url));
//   } else if (!isPublicPath && !token) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }
// }

// // See "Matching Paths" below to learn more
// // '/product/:path*', // 👈 this matches /product/[123], /product/[abc] etc.
// export const config = {
//   matcher: ["/login", "/register", "/reset-password", "/home"],
// };

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // ✅ Define public routes
  const isPublicPath =
    path === "/" ||
    path === "/home" ||
    path === "/login" ||
    path === "/register" ||
    path === "/reset-password" ||
    path === "/products" ||
    path.startsWith("/products/"); // supports /products/:id

  const token = request.cookies.get("accessToken")?.value;

  // 🔁 If logged in and accessing auth pages, redirect to /home
  if (isPublicPath && token && (path === "/login" || path === "/register")) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // 🔐 If trying to access protected route without token
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // run on everything except static/image files
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
