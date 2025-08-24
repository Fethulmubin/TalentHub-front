"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mail, Lock, Loader, X, Users2, Users } from "lucide-react";
import { useState } from "react";

export default function SignUp() {
  const [role, setRole] = useState("Applicant");

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">Create Account</h1>
        <p className="text-gray-600 text-center mb-6 text-sm">
          Join TalentHub and find your dream opportunities
        </p>

        <form className="space-y-4 flex flex-col">
          {/* Full Name */}
          <div className="relative">
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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
          </div>

            {/* confrirm pass */}
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
          </div>

          {/* Role selection */}
          <div className="flex flex-col gap-2">
            <label className={`flex items-center p-4 rounded-2xl  gap-2 cursor-pointer ${role === "Applicant" ? "border-blue-500 border-[1.8px] bg-blue-500/10" : "border-gray-400/50 border-1"}`}>
              <input
                type="radio"
                name="role"
                value="Job Seeker"
                checked={role === "Applicant"}
                onChange={() => setRole("Applicant")}
                className="accent-blue-500"
              />
             <span className="space-y-1">
                <span className='flex gap-2 items-center'>
                    <Users size={20} className="text-gray-600" />
                    <h3 className="font-semibold text-base">Job Seeker</h3>
                </span>
                <p className="text-sm text-gray-600 font-light">Looking for opportunities</p>
             </span>
            </label>
            <label className={`flex items-center p-4 rounded-2xl gap-2  cursor-pointer  ${role === "Employer" ? "border-blue-500 border-[1.8px] bg-blue-500/10" : "border-gray-400/50 border-1"}`}>
              <input
                type="radio"
                name="role"
                value="Employer"
                checked={role === "Employer"}
                onChange={() => setRole("Employer")}
                className="accent-blue-500"
              />
               <span className="space-y-1">
                <span className='flex gap-2 items-center'>
                    <Users size={20} className="text-gray-600" />
                    <h3 className="font-semibold text-base">Employer</h3>
                </span>
                <p className="text-sm text-gray-600 font-light">Hiring talent</p>
             </span>
            </label>
          </div>

          {/* Create Account Button */}
          <Button type="submit" className="w-full py-3 mt-4 text-white bg-blue-600 hover:bg-blue-700">
            Create Account
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
