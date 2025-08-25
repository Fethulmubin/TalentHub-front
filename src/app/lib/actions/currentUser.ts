import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken'

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if(!token) return null;

  try {
    // 🔑 verify token with your JWT secret
    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET as string) as {
      id: string;
      email: string;
      role: string;
    };

    return {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
}