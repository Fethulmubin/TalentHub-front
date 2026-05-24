"use client";
import { useAuth } from "@/app/context/AuthContext";
import { Verify } from "@/app/lib/actions/Auth";
import { Button } from "@/components/system/button";
import { Input } from "@/components/system/input";
import { MailCheck, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { AuthShell } from "@/components/layout/auth-shell";

export default function VerifyPage() {
  const router = useRouter();
  const { setUser } = useAuth();

  const [state, action, isPending] = useActionState(Verify, {
    status: false,
    errors: {},
    message: undefined,
  });

  useEffect(() => {
    if (state?.status === true) {
      toast.success("Email verified successfully!");
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
    <AuthShell title="Verify your email" description="Enter the 6-digit code sent to your email">
      <form action={action} className="space-y-4">
        <Input
          type="text"
          name="otpInput"
          placeholder="6-digit OTP"
          maxLength={6}
          leftIcon={<MailCheck size={14} />}
          error={state?.errors?.otpInput?.[0]}
        />

        {state?.status === false && !state.errors && (
          <p className="text-xs text-destructive">{state.message}</p>
        )}

        <Button type="submit" className="w-full" loading={isPending}>
          {isPending ? "Verifying..." : "Verify Email"}
          {!isPending && <ArrowRight size={14} />}
        </Button>
      </form>
    </AuthShell>
  );
}
