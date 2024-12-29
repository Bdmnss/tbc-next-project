import { Suspense } from "react";
import Image from "next/image";
import Loading from "@/components/Loading";
import UsersList from "@/components/UsersList";
import Search from "@/components/Search";
import Pagination from "@/components/Pagination";
import UserForm from "@/components/UserForm";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams;
  const query = params.query || "";
  const currentPage = params.page ? Number(params.page) : 1;

  return (
    <Suspense fallback={<Loading />}>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            <li className="mb-2">
              Get started by editing{" "}
              <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
                app/page.tsx
              </code>
              .
            </li>
            <li>Save and see your changes instantly.</li>
          </ol>

          <Search placeholder="Search users..." />
          <UsersList searchQuery={query} currentPage={currentPage} />
          <Pagination totalPages={10} />
          <UserForm />
        </main>
      </div>
    </Suspense>
  );
}
