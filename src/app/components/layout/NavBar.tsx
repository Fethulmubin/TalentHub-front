

import Link from "next/link";
import Image from "next/image";
import { Menu, User } from "lucide-react";
import { getCurrentUser } from "@/app/lib/actions/currentUser";
// import { getCurrentUser } from "@/app/lib/actions/Auth";

type User = {
  id: string;
  email: string;
  role: string;
};

export default async function NavBar() {
  const user = await getCurrentUser();

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image
            src="https://flowbite.com/docs/images/logo.svg"
            width={32}
            height={32}
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Flowbite
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center space-x-4 md:order-2">
          {user ? (
            <div className="flex items-center space-x-2">
              <User />
              <span className="text-gray-800 dark:text-gray-200 font-medium">
                {user.email.split('@')[0]}
              </span>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
                         focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 
                         dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Get Started
            </Link>
          )}

          {/* Mobile menu toggle using Lucide icon */}
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

        {/* Nav links */}
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 
                         rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse 
                         md:flex-row md:mt-0 md:border-0 md:bg-white 
                         dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
          >
            {["Home", "About", "Services", "Contact"].map((link) => (
              <li key={link}>
                <Link
                  href={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                  className={`block py-2 px-3 rounded-sm md:p-0 ${
                    link === "Home"
                      ? "text-white bg-blue-700 md:text-blue-700 md:bg-transparent md:dark:text-blue-500"
                      : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:dark:hover:bg-transparent dark:border-gray-700"
                  }`}
                  aria-current={link === "Home" ? "page" : undefined}
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
