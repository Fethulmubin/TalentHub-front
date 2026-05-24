"use client";

import { Logout } from "@/app/lib/actions/Auth";
import { Button } from "@/components/system/button";
import { useState } from "react";
import { toast } from "sonner";

export default function LogoutBtn() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await Logout();
      if (res?.status) {
        toast.success(res.message || "Logged out successfully!");
      } else {
        toast.error(res?.message || "Failed to logout");
      }
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button disabled={loading} loading={loading} onClick={handleLogout} variant="destructive" size="sm">
      {loading ? "Logging out..." : "Logout"}
    </Button>
  );
}
