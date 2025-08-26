import { redirect } from "next/navigation";
import { LoginSchema, SignUpSchema, VerifySchema } from "../validators/auth";
import { headers } from "next/headers";
import Cookies from "js-cookie";

// import { cookies } from "next/headers";
// import  jwt from "jsonwebtoken";

// @ts-ignore
export async function SignUp(prevState: any, formData: FormData) {
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    role: formData.get("role") || "APPLICANT",
  };

  const parsed = SignUpSchema.safeParse(data);
  if (!parsed.success) {
    return { status: false, errors: parsed.error.flatten().fieldErrors };
  }

  // call backend API
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
      {
        method: "POST",
        body: JSON.stringify(parsed.data),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!res.ok) {
      const err = await res.json();
      return { status: false, message: err.message || "Signup failed" };
    }
    console.log(res);


    return { status: true, message: "Account created successfully" };
  } catch (error) {
    console.log(error);
    return { status: false, message: "Something went wrong, try again later" };
  }
}
// @ts-ignore
export async function Login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const parsed = LoginSchema.safeParse(data);
  if (!parsed.success) {
    return { status: false, errors: parsed.error.flatten().fieldErrors };
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
      method: "POST",
      body: JSON.stringify(parsed.data),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if(!res.ok) {
      const err = await res.json();
      return { status: false, message: err.message || "Login failed" };
    }

    const result = await res.json();
    Cookies.set("token", result.token, { path: "/" });
    return { status: true, message: "Logged in successfully", user: result.user };
  } catch (error) {
    console.log(error);
    return { status: false, message: "Something went wrong, try again later" };
  }
}

// @ts-ignore
export async function Verify(prevState: any, formData: FormData) {
  const data = {
    otpInput: formData.get("otpInput"),
  };
  const parsed = VerifySchema.safeParse(data);
  if (!parsed.success) {
    return { status: false, errors: parsed.error.flatten().fieldErrors };
  }
  

  // call backend API
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/verify`, {
      method: "POST",
      body: JSON.stringify(parsed.data),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) {
      const err = await res.json();
      return { status: false, message: err.message || "Verification failed" };
    }

    const result = await res.json();
    Cookies.set("token", result.token, { path: "/" });
    return { status: true, message: "Email verified successfully", user: result.user };
  } catch {
    return { status: false, message: "Something went wrong, try again later" };
  }
}

export async function Logout() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      const err = await res.json();
      return { status: false, message: err.message || "Logout failed" };
    }

    return { status: true, message: "Logged out successfully" };
  } catch (error) {
    console.log(error);
    return { status: false, message: "Something went wrong, try again later" };
  }
}

