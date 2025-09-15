"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Briefcase, FileText, PlusCircle } from "lucide-react";

export default function Sidebar({ userId }: { userId: string }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { name: "Post Job", href: `/admin/${userId}/jobs/post`, icon: PlusCircle },
    { name: "My Applications", href: `/admin/${userId}/jobs`, icon: FileText },
    { name: "My Jobs", href: `/admin/${userId}/jobs`, icon: Briefcase },
  ];

  return (
    <>
      {/* Sidebar for large screens */}
      <aside className="hidden md:flex md:flex-col w-64 bg-white shadow-lg flex-shrink-0">
        <div className="p-6 text-2xl font-bold text-indigo-600">TalentHub Admin</div>
        <nav className="flex-1 space-y-2 px-4">
          {menuItems.map(({ name, href, icon: Icon }) => (
            <Link
              key={name}
              href={href}
              className="flex items-center gap-3 p-3 rounded-xl text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 transition"
            >
              <Icon className="h-5 w-5" />
              {name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile sidebar */}
      <div className="md:hidden">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-4 text-gray-600"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div className="w-64 bg-white shadow-lg p-6 space-y-4 overflow-y-auto">
              <div className="text-xl font-bold text-indigo-600 mb-6">
                TalentHub Admin
              </div>
              {menuItems.map(({ name, href, icon: Icon }) => (
                <Link
                  key={name}
                  href={href}
                  className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 transition"
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  {name}
                </Link>
              ))}
            </div>
            <div
              className="flex-1 bg-black bg-opacity-25"
              onClick={() => setSidebarOpen(false)}
            />
          </div>
        )}
      </div>
    </>
  );
}
