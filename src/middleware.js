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

  let hostname = request.headers.get("host")?.replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  console.log(hostname,'ppp')

  const path = request.nextUrl.pathname

  const secret = process.env.NEXTAUTH_SECRET;

  
  
  if(hostname == `sublekh.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    {
    const token = await getToken({ req: request,secret });
    console.log(token,'asdsad')
    if (token && path == "/login") {
        return NextResponse.redirect(new URL('/', request.url))
    }
    else if (!token && path != "/login") {
      return NextResponse.redirect(new URL('/login', request.url));
    }
console.log('yahahaha ')
    // return NextResponse.rewrite(
    //   new URL(`${path === "/" ? "" : path}`, request.url),
    // );
    return NextResponse.rewrite(new URL(path, request.url));
    
  }

   // Handle dynamic subdomains
   const subdomain = hostname.split('.')[0]; 
   if (subdomain !== 'www' && subdomain !== 'localhost' && subdomain !== 'sublekh') { 
     return NextResponse.rewrite(new URL(`/${subdomain}`, request.url));
   }
    
   return NextResponse.rewrite(new URL('/404', request.url));

}