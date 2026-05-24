"use client";

import { Button } from "@/components/system/button";
import { Input } from "@/components/system/input";
import Link from "next/link";
import { Mail, Lock, Users, ArrowRight } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { SignUp } from "@/app/lib/actions/Auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AuthShell } from "@/components/layout/auth-shell";
import { cn } from "@/lib/utils";

export default function SignUpForm() {
  const [role, setRole] = useState("APPLICANT");
  const router = useRouter();

  const [state, action, isPending] = useActionState(SignUp, {
    status: false,
    errors: {},
    message: undefined,
  });

  useEffect(() => {
    if (state?.status === true) {
      toast.success(`Account created! OTP: ${state.otp}`, { duration: 10000 });
      router.push("/auth/verify");
    } else if (state?.status === false && state?.message) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <AuthShell title="Create account" description="Join TalentHub and find your next opportunity">
      <form action={action} className="space-y-4">
        <Input
          type="text"
          name="name"
          placeholder="Full name"
          error={state?.errors?.name?.[0]}
        />

        <Input
          type="email"
          name="email"
          placeholder="Email address"
          leftIcon={<Mail size={14} />}
          error={state?.errors?.email?.[0]}
        />

        <Input
          type="password"
          name="password"
          placeholder="Password"
          leftIcon={<Lock size={14} />}
          error={state?.errors?.password?.[0]}
        />

        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          leftIcon={<Lock size={14} />}
          error={state?.errors?.confirmPassword?.[0]}
        />

        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">I am a...</p>
          <label className="flex items-center gap-3 rounded-xl border border-border/60 p-3 cursor-pointer transition-all duration-150 has-[:checked]:border-accent has-[:checked]:bg-accent/5 hover:border-border">
            <div className={cn(
              "flex h-4 w-4 items-center justify-center rounded-full border-2 transition-all duration-150",
              role === "APPLICANT" ? "border-accent" : "border-muted-foreground/30"
            )}>
              {role === "APPLICANT" && <div className="h-2 w-2 rounded-full bg-accent" />}
            </div>
            <input
              type="radio"
              name="role"
              value="APPLICANT"
              checked={role === "APPLICANT"}
              onChange={() => setRole("APPLICANT")}
              className="sr-only"
            />
            <Users size={15} className="text-muted-foreground shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">Job Seeker</p>
              <p className="text-xs text-muted-foreground">Looking for opportunities</p>
            </div>
          </label>
          <label className="flex items-center gap-3 rounded-xl border border-border/60 p-3 cursor-pointer transition-all duration-150 has-[:checked]:border-accent has-[:checked]:bg-accent/5 hover:border-border">
            <div className={cn(
              "flex h-4 w-4 items-center justify-center rounded-full border-2 transition-all duration-150",
              role === "EMPLOYER" ? "border-accent" : "border-muted-foreground/30"
            )}>
              {role === "EMPLOYER" && <div className="h-2 w-2 rounded-full bg-accent" />}
            </div>
            <input
              type="radio"
              name="role"
              value="EMPLOYER"
              checked={role === "EMPLOYER"}
              onChange={() => setRole("EMPLOYER")}
              className="sr-only"
            />
            <Users size={15} className="text-muted-foreground shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">Employer</p>
              <p className="text-xs text-muted-foreground">Hiring talent</p>
            </div>
          </label>
        </div>

        {state?.status === false && !state.errors && (
          <p className="text-xs text-destructive">{state.message}</p>
        )}

        <Button type="submit" className="w-full" loading={isPending}>
          {isPending ? "Creating account..." : "Create Account"}
          {!isPending && <ArrowRight size={14} />}
        </Button>
      </form>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Already have an account?{" "}
        <Link href="/auth/signIn" className="font-medium text-accent hover:text-accent/80 transition-colors">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}
