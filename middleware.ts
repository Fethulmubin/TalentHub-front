import { getCurrentUser } from "@/app/lib/actions/currentUser";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Protect /admin routes
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const user = await getCurrentUser();

    if (!user || user.role !== "Employer") {
      // Redirect unauthorized users
      url.pathname = "/auth/signIn"; 
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Apply middleware to all /admin routes
export const config = {
  matcher: ["/admin/:path*"],
};
