import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("jwt_token")?.value;
  const pathaname = req.nextUrl.pathname;
  const isPrivateRoute =
    pathaname.startsWith("/user") || pathaname.startsWith("/admin");

  if (isPrivateRoute && !token) {
    return NextResponse.redirect(new URL("/?formType=login", req.url));
  }

  const role = req.cookies.get("role")?.value;
  if (!isPrivateRoute && token && role) {
    if (role === "admin") {
      return NextResponse.redirect(new URL(`/${role}/dashboard`, req.url));
    }

    return NextResponse.next();
  }

  // If the user is not authenticated, redirect to the login page

  //if the token exists and the user is on the login or register page, redirect to the home page

  return NextResponse.redirect(new URL(pathaname, req.url));
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
