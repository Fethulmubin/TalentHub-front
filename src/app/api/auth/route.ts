// src/app/api/auth/me/route.ts
// import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";
import { getCurrentUser } from "@/app/lib/actions/currentUser";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json(null);
  return NextResponse.json(user, { status: 200 });
}

