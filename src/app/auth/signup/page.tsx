"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mail, Lock, Loader, X, Users2, Users } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { SignUp } from "@/app/lib/actions/Auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";




export default function SignUpForm() {
  const [role, setRole] = useState("Applicant");
  const router = useRouter();



  // Server action state
   const [state, action, isPending] = useActionState(SignUp, {
    status: false,
    errors: {},
    message: undefined,
  })

   // Redirect when signup is successful
  useEffect(() => {
    if (state?.status === true) {
      toast.success("Account created successfully!, Please verify your email");
      router.push('/auth/verify')
    }
    else if (state?.status === false && state?.message) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Create Account
        </h1>
        <p className="text-gray-600 text-center mb-6 text-sm">
          Join TalentHub and find your dream opportunities
        </p>

        <form action={action} className="space-y-4 flex flex-col">
          {/* Full Name */}
          <div className="relative">
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {state?.errors?.name && (
              <p className="text-red-500 text-sm">{state.errors.name[0]}</p>
            )}
          </div>

          {/* Email */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Mail size={18} />
            </span>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              className="w-full pl-10 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {state?.errors?.email && (
              <p className="text-red-500 text-sm">{state.errors.email[0]}</p>
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
            {state?.errors?.password && (
              <p className="text-red-500 text-sm">{state.errors.password[0]}</p>
            )}
          </div>

          {/* confirm pass */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Lock size={18} />
            </span>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              className="w-full pl-10 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {state?.errors?.confirmPassword && (
              <p className="text-red-500 text-sm">
                {state.errors.confirmPassword[0]}
              </p>
            )}
          </div>

          {/* Role selection */}
          <div className="flex flex-col gap-2">
            <label
              className={`flex items-center p-4 rounded-2xl  gap-2 cursor-pointer ${
                role === "Applicant"
                  ? "border-blue-500 border-[1.8px] bg-blue-500/10"
                  : "border-gray-400/50 border-1"
              }`}
            >
              <input
                type="radio"
                name="role"
                value="Job Seeker"
                checked={role === "Applicant"}
                onChange={() => setRole("Applicant")}
                className="accent-blue-500"
              />
              <span className="space-y-1">
                <span className="flex gap-2 items-center">
                  <Users size={20} className="text-gray-600" />
                  <h3 className="font-semibold text-base">Job Seeker</h3>
                </span>
                <p className="text-sm text-gray-600 font-light">
                  Looking for opportunities
                </p>
              </span>
            </label>
            <label
              className={`flex items-center p-4 rounded-2xl gap-2  cursor-pointer  ${
                role === "Employer"
                  ? "border-blue-500 border-[1.8px] bg-blue-500/10"
                  : "border-gray-400/50 border-1"
              }`}
            >
              <input
                type="radio"
                name="role"
                value="Employer"
                checked={role === "Employer"}
                onChange={() => setRole("Employer")}
                className="accent-blue-500"
              />
              <span className="space-y-1">
                <span className="flex gap-2 items-center">
                  <Users size={20} className="text-gray-600" />
                  <h3 className="font-semibold text-base">Employer</h3>
                </span>
                <p className="text-sm text-gray-600 font-light">
                  Hiring talent
                </p>
              </span>
            </label>
          </div>
           {state?.status === false && !state.errors && (
              <p className="text-red-500 text-sm">{state.message}</p>
            )}

          {/* Create Account Button */}
          <Button
            disabled={isPending}
            type="submit"
            className="w-full py-3 mt-4 text-white bg-blue-600 hover:bg-blue-700"
          >
            {isPending ? 'Creating...' : 'Create Account'}
          </Button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/signin" className="text-blue-600 font-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
