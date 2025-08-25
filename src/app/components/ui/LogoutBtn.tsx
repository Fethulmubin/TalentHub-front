"use client";

import { Logout } from "@/app/lib/actions/Auth";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export default function LogoutBtn() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await Logout(); // your API call
      if (res?.status) {
        toast.success(res.message || "Logged out successfully!");
      } else {
        toast.error(res?.message || "Failed to logout");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      disabled={loading}
      onClick={handleLogout}
      className="bg-red-400 hover:bg-red-500 text-white"
    >
      {loading ? "Logging out..." : "Logout"}
    </Button>
  );
}
