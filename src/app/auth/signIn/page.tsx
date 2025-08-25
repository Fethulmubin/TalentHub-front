"use client"
import { Login } from "@/app/lib/actions/Auth";
import { Button } from "@/components/ui/button";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function SignIn() {
  const router = useRouter();

  // Server action state
  const [state, action, isPending] = useActionState(Login, {
    status: false,
    errors: {},
    message: undefined,
  });
  // redirecting after successful login
  useEffect(() => {
    if (state?.status === true) {
      toast.success("Account created successfully!, Please verify your email");
      router.push("/auth/verify");
    } else if (state?.status === false && state?.message) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Welcome Again,
        </h1>
        <p className="text-gray-600 text-center mb-6 text-sm">
          Join TalentHub and find your dream opportunities
        </p>

        <form action={action} className="space-y-4 flex flex-col">
          {/* Email */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Mail size={18} />y
            </span>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              className="w-full pl-10 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {state?.errors?.email && (
              <p className="text-red-500 text-sm mt-1">{state.errors.email[0]}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Lock size={18} />
            </span>
            <input
              type="password"
              name="password"
              placeholder="Create a strong password"
              className="w-full pl-10 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {state.errors?.password && (
              <p className="text-red-500 text-sm mt-1">{state.errors.password[0]}</p>
            )}
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            className="w-full py-3 mt-4 text-white bg-blue-600 hover:bg-blue-700"
          >
            Login
          </Button>

          <p className="text-center text-sm text-gray-600">
            No Account yet?{" "}
            <Link href="/signup" className="text-blue-600 font-semibold">
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
