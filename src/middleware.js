import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(request) {

  const path = request.nextUrl.pathname

  const token = await getToken({ req: request });
  console.log(token,"sdas")

  if (token && path == "/login") {
      return NextResponse.redirect(new URL('/', request.url))
  }

  if (!token && path != "/login") {
    return NextResponse.redirect(new URL('/login', request.url));
  }

}