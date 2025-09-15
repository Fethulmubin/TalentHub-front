"use client";
import Link from "next/link";
import Image from "next/image";
import { Menu, User } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { Logout } from "@/app/lib/actions/Auth";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NavBar() {
  const { user, setUser, fetchUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await Logout();
      if (res?.status) {
        toast.success(res.message || "Logged out successfully!");
        setUser(null); // instantly clear user
        router.push("/auth/signIn");
      } else {
        toast.error(res?.message || "Failed to logout");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image src="/talent.png" width={32} height={32} alt="TalentHub Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            TalentHub
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center space-x-4 md:order-2">
          {user ? (
            <div className="flex items-center space-x-2">
              <User />
              <span className="text-gray-800 dark:text-gray-200 font-medium">
                {user.email.split("@")[0]}
              </span>
              <Button
                disabled={loading}
                onClick={handleLogout}
                className="bg-red-400 hover:bg-red-500 text-white"
              >
                {loading ? "Logging out..." : "Logout"}
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Link href={`/apps/${user.id}`}>Track your Apps</Link>
              </Button>
            </div>
          ) : (
            <Link
              href="/auth/signIn"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
                         focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 
                         dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Get Started
            </Link>
          )}

          {/* Mobile menu */}
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 
                       rounded-lg md:hidden hover:bg-gray-100 focus:outline-none 
                       focus:ring-2 focus:ring-gray-200 dark:text-gray-400 
                       dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}
