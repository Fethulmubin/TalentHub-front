"use client";
import { useAuth } from "@/app/context/AuthContext";
import { Login } from "@/app/lib/actions/Auth";
import { Button } from "@/components/system/button";
import { Input } from "@/components/system/input";
import { Lock, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { AuthShell } from "@/components/layout/auth-shell";

export default function SignIn() {
  const router = useRouter();
  const { setUser } = useAuth();

  const [state, action, isPending] = useActionState(Login, {
    status: false,
    errors: {},
    message: undefined,
  });

  useEffect(() => {
    if (state?.status === true) {
      toast.success("Logged in successfully!");
      setUser(state.user);
      router.refresh();
      if (state.user.role === "EMPLOYER") {
        router.push(`/admin/${state.user.id}`);
      } else {
        router.push("/");
      }
    } else if (state?.status === false && state?.message) {
      toast.error(state.message);
    }
  }, [state, router, setUser]);

  return (
    <AuthShell title="Welcome back" description="Sign in to your account">
      <form action={action} className="space-y-4">
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

        {state?.status === false && !state.errors && (
          <p className="text-xs text-destructive">{state.message}</p>
        )}

        <Button type="submit" className="w-full" loading={isPending}>
          {isPending ? "Signing in..." : "Sign In"}
          {!isPending && <ArrowRight size={14} />}
        </Button>
      </form>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        No account yet?{" "}
        <Link href="/auth/signup" className="font-medium text-accent hover:text-accent/80 transition-colors">
          Create one
        </Link>
      </p>
    </AuthShell>
  );
}
