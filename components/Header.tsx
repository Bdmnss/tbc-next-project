import Link from "next/link";

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
      </nav>
    </header>
  );
}
