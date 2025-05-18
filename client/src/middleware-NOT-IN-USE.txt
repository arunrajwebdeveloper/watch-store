import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const path = request.nextUrl.pathname;

  // path.startsWith('/product/')
  const protectedRoutes = ["/orders", "/wishlist", "/profile"];

  if (protectedRoutes.includes(path) && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", path);
    return NextResponse.redirect(loginUrl);
  }

  // Prevent logged-in users from visiting /login and /register
  if ((path === "/login" || path === "/register") && token) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

// '/product/:path*', // 👈 this matches /product/[123], /product/[abc] etc.
export const config = {
  matcher: ["/orders", "/wishlist", "/profile", "/login", "/register"],
};
