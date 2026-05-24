import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    const protectedPaths = ["/admin", "/apps", "/jobs", "/resume", "/candidates"];
    const isProtected = protectedPaths.some((p) => req.nextUrl.pathname.startsWith(p));
    if (isProtected) {
      return NextResponse.redirect(new URL("/auth/signIn", req.url));
    }
    return NextResponse.next();
  }

  try {
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const pathname = req.nextUrl.pathname;

    if (pathname.startsWith("/admin") && payload.role !== "EMPLOYER") {
      return NextResponse.redirect(new URL("/auth/signIn", req.url));
    }

    if ((pathname.startsWith("/apps") || pathname.startsWith("/jobs")) && payload.role !== "APPLICANT") {
      return NextResponse.redirect(new URL("/auth/signIn", req.url));
    }

    if (pathname.startsWith("/candidates") && payload.role !== "EMPLOYER") {
      return NextResponse.redirect(new URL("/auth/signIn", req.url));
    }
  } catch {
    return NextResponse.redirect(new URL("/auth/signIn", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/apps/:path*", "/jobs/:path*", "/resume/:path*", "/candidates/:path*"],
};
