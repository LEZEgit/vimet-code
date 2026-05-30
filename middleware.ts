import { NextRequest, NextResponse } from "next/server";

export const middleware = (req: NextRequest) => {
  // Get the session from better-auth
  const session = req.cookies.get("better-auth.session_token");
  console.log("Inside the auth middleware");
  // If user is on the root path and not authenticated, redirect to login
  if (req.nextUrl.pathname === "/" && !session) {
    console.log("User is not signed in, redirecting to login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/"],
};
