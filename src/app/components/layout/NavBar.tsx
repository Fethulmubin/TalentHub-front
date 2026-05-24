"use client";
import Link from "next/link";
import Image from "next/image";
import { Menu, User, X, LayoutDashboard, Upload, FileText, Bell } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { Logout } from "@/app/lib/actions/Auth";
import { Button } from "@/components/system/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

export default function NavBar() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isApplicant = user?.role === "APPLICANT";
  const isEmployer = user?.role === "EMPLOYER";

  return (
    <header className="fixed top-0 left-0 right-0 z-sticky h-14 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-full max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/talent.png" width={28} height={28} alt="TalentHub" className="h-7 w-7" />
          <span className="text-sm font-semibold tracking-tight">TalentHub</span>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground mr-1">
                <User size={13} />
                <span className="max-w-[120px] truncate">{user.email.split("@")[0]}</span>
              </span>

              {isApplicant && (
                <>
                  <Link href="/resume/upload" className="inline-flex h-8 items-center rounded-lg border border-input bg-background px-3 text-xs font-medium text-foreground hover:bg-muted transition-colors">
                    <Upload size={12} className="mr-1" />
                    Upload Resume
                  </Link>
                  <Link href={`/apps/${user.id}`} className="inline-flex h-8 items-center rounded-lg border border-input bg-background px-3 text-xs font-medium text-foreground hover:bg-muted transition-colors">
                    My Apps
                  </Link>
                </>
              )}

              {isEmployer && (
                <Link href={`/admin/${user.id}`} className="inline-flex h-8 items-center rounded-lg border border-input bg-background px-3 text-xs font-medium text-foreground hover:bg-muted transition-colors">
                  <LayoutDashboard size={12} className="mr-1" />
                  Dashboard
                </Link>
              )}

              <button
                className="relative flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted transition-colors"
                aria-label="Notifications"
              >
                <Bell size={15} />
                <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-destructive ring-1 ring-background" />
              </button>

              <Button variant="ghost" size="sm" loading={loading} onClick={handleLogout} className="text-muted-foreground">
                {loading ? "Logging out..." : "Logout"}
              </Button>
            </>
          ) : (
            <Link href="/auth/signIn" className="inline-flex h-8 items-center rounded-lg bg-primary px-3.5 text-xs font-medium text-primary-foreground hover:bg-primary-hover transition-colors shadow-xs">
              Sign In
            </Link>
          )}
        </div>

        <div className="md:hidden" ref={menuRef}>
          <button
            type="button"
            className="relative inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {user && (
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-destructive ring-1 ring-background" />
            )}
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          {mobileMenuOpen && (
            <div className="absolute right-4 top-12 w-56 rounded-xl border border-border/60 bg-popover p-1.5 shadow-lg animate-scale-in">
              {user ? (
                <div className="space-y-0.5">
                  <div className="px-3 py-2 text-xs text-muted-foreground truncate border-b border-border/40 mb-1">{user.email}</div>

                  {isApplicant && (
                    <>
                      <Link href="/resume/upload" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors" onClick={() => setMobileMenuOpen(false)}>
                        <Upload size={14} />
                        Upload Resume
                      </Link>
                      <Link href={`/apps/${user.id}`} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors" onClick={() => setMobileMenuOpen(false)}>
                        <FileText size={14} />
                        My Apps
                      </Link>
                    </>
                  )}

                  {isEmployer && (
                    <Link href={`/admin/${user.id}`} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      <LayoutDashboard size={14} />
                      Dashboard
                    </Link>
                  )}

                  <hr className="border-border/40 my-1" />

                  <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} disabled={loading}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.5 2.5L4.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M9.5 4.5L12.5 7.5L9.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12.5 7.5L4.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    {loading ? "Logging out..." : "Sign Out"}
                  </button>
                </div>
              ) : (
                <Link href="/auth/signIn" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  Get Started
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
