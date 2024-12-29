"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Header() {
  return (
    <header className="w-full p-4 bg-gray-800 text-white">
      <nav className="flex justify-center space-x-4">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/about" className="hover:underline">
          About
        </Link>
        <button onClick={() => signOut()} className="hover:underline">
          Sign Out
        </button>
      </nav>
    </header>
  );
}
