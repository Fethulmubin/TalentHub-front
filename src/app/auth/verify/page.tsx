"use client"
import { Verify } from "@/app/lib/actions/Auth";
import { Button } from "@/components/ui/button";
import { Lock, Mail, MailCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";


export default function VerifyPage() {
    const router = useRouter();
  // Server action state
  const [state, action, isPending] = useActionState(Verify, {
    status: false,
    errors: {},
    message: undefined,

  });

  useEffect(()=> {
    if (state?.status === true) {
     toast.success("Email verified successfully!");
      router.push('/')
    }
     else if (state?.status === false && state?.message) {
      toast.error(state.message);
    }
  },[state, router])
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-3">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Enter 6-digit OTP to Verify Your Email,
        </h1>

        <form action={action} className="space-y-4 flex flex-col">
          {/*Otp */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <MailCheck size={18} />
            </span>
            <input
              type="text"
              name="otpInput"
              placeholder="6-digit OTP"
              className="w-full pl-10 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {state.errors?.otpInput && (
              <p className="text-red-500 text-sm">{state.errors.otpInput[0]}</p>
            )}
          </div>

          {/* Login Button */}
          <Button
            disabled={isPending}
            type="submit"
            className="w-full py-3 mt-4 text-white bg-blue-600 hover:bg-blue-700"
          >
            {isPending ? "Verifying..." : "Verify"}
          </Button>
        </form>
      </div>
    </div>
  );
}
