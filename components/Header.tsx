import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-foreground text-background">
      <h1 className="text-xl font-bold">My Next.js App</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:underline">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
