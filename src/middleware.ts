// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/auth/signIn", req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const pathname = req.nextUrl.pathname;

    // Route-specific role checks
    if (pathname.startsWith("/admin") && payload.role !== "EMPLOYER") {
      return NextResponse.redirect(new URL("/auth/signIn", req.url));
    }

    if ((pathname.startsWith("/apps") || pathname.startsWith("/jobs")) && payload.role !== "APPLICANT") {
      return NextResponse.redirect(new URL("/auth/signIn", req.url));
    }

  } catch (err) {
    return NextResponse.redirect(new URL("/auth/signIn", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/apps/:path*", "/jobs/:path*"],
};
