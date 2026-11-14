import { NextResponse, type NextRequest } from "next/server";

const SESSION_COOKIE = "md_session";

/**
 * Optimistic route guard: only checks that a session cookie exists.
 * The real check happens in the Data Access Layer (src/lib/auth/dal.ts),
 * which asks the backend to validate the token.
 */
export function proxy(request: NextRequest) {
  if (!request.cookies.has(SESSION_COOKIE)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
