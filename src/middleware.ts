import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isProtectedRoute = req.nextUrl.pathname.startsWith("/dashboard") ||
                           req.nextUrl.pathname.startsWith("/tasks") ||
                           req.nextUrl.pathname.startsWith("/projects") ||
                           req.nextUrl.pathname.startsWith("/finance") ||
                           req.nextUrl.pathname.startsWith("/reports") ||
                           req.nextUrl.pathname.startsWith("/performance") ||
                           req.nextUrl.pathname.startsWith("/notifications") ||
                           req.nextUrl.pathname.startsWith("/settings") ||
                           req.nextUrl.pathname.startsWith("/users");

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
