"use client";
import Link from "next/link";
import Image from "next/image";
import { Menu, User, ChevronDown } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { Logout } from "@/app/lib/actions/Auth";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

export default function NavBar() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await Logout();
      if (res?.status) {
        toast.success(res.message || "Logged out successfully!");
        setUser(null);
        router.push("/auth/signIn");
      } else {
        toast.error(res?.message || "Failed to logout");
      }
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Top Nav */}
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 sm:space-x-3 rtl:space-x-reverse"
          >
            <Image
              src="/talent.png"
              width={36}
              height={36}
              alt="TalentHub Logo"
              className="w-8 h-8 sm:w-10 sm:h-10"
            />
            <span className="self-center text-lg sm:text-xl font-semibold whitespace-nowrap dark:text-white">
              TalentHub
            </span>
          </Link>

          {/* Desktop User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center gap-3">
                <User />
                <span className="text-gray-800 dark:text-gray-200 font-medium truncate max-w-[140px]">
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
                  <Link href={`/apps/${user.id}`}>Track Apps</Link>
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
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex items-center p-2 w-9 h-9 sm:w-10 sm:h-10 justify-center text-sm text-gray-500 
                       rounded-lg md:hidden hover:bg-gray-100 focus:outline-none 
                       focus:ring-2 focus:ring-gray-200 dark:text-gray-400 
                       dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Bottom Bar */}
      {user && (
        <div className="fixed bottom-0 left-0 w-full flex justify-end md:hidden z-30 p-2 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="relative" ref={dropdownRef}>
            <Button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              <User className="w-4 h-4" />
              <span className="truncate max-w-[80px]">{user.email.split("@")[0]}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </Button>

            {dropdownOpen && (
              <div className="absolute bottom-full mb-2 right-0 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-gray-700"
                >
                  {loading ? "Logging out..." : "Logout"}
                </button>
                <Link
                  href={`/apps/${user.id}`}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  Track Apps
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
