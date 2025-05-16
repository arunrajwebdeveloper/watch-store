// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get("accessToken")?.value;
//   const path = request.nextUrl.pathname;

//   // path.startsWith('/product/')
//   const protectedRoutes = ["/orders", "/wishlist", "/profile"];

//   if (protectedRoutes.includes(path) && !token) {
//     const loginUrl = new URL("/login", request.url);
//     loginUrl.searchParams.set("redirect", path);
//     return NextResponse.redirect(loginUrl);
//   }

//   // Prevent logged-in users from visiting /login and /register
//   if ((path === "/login" || path === "/register") && token) {
//     return NextResponse.redirect(new URL("/home", request.url));
//   }

//   return NextResponse.next();
// }

// // '/product/:path*', // 👈 this matches /product/[123], /product/[abc] etc.
// export const config = {
//   matcher: ["/orders", "/wishlist", "/profile", "/login", "/register"],
// };

// *************************************************************************************

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function isAccessTokenExpired(token: string): boolean {
  try {
    const [, payloadBase64] = token.split(".");
    const payload = JSON.parse(atob(payloadBase64));
    const exp = payload.exp * 1000;
    return Date.now() > exp;
  } catch {
    return true;
  }
}

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const path = request.nextUrl.pathname;

  const protectedRoutes = ["/orders", "/wishlist", "/profile"];

  const isProtected = protectedRoutes.includes(path);

  // Check if access token is missing or expired
  if (isProtected) {
    if (!accessToken && !refreshToken) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", path);
      return NextResponse.redirect(loginUrl);
    }

    // Try refresh if expired
    if (accessToken && isAccessTokenExpired(accessToken) && refreshToken) {
      const refreshRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
        {
          method: "POST",
          headers: {
            Cookie: `refreshToken=${refreshToken}`,
          },
        }
      );

      if (refreshRes.ok) {
        const { accessToken: newAccessToken } = await refreshRes.json();
        const response = NextResponse.next();
        response.cookies.set("accessToken", newAccessToken, {
          httpOnly: true,
          secure: true,
          path: "/",
          sameSite: "lax",
        });
        return response;
      } else {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", path);
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  // Redirect logged-in users away from /login or /register
  if ((path === "/login" || path === "/register") && accessToken) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}
