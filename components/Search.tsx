"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Search({ placeholder }: { placeholder: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const searchQuery = searchParams.get("query");
    if (searchQuery) {
      setQuery(searchQuery);
    }
  }, [searchParams]);

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleInputChange}
      placeholder={placeholder}
      className="border p-2 rounded text-black"
    />
  );
}
import { useCallback } from "react";
import debounce from "lodash.debounce";

function useDebouncedCallback(callback: (term: string) => void, delay: number) {
  return useCallback(
    (term: string) => debounce(callback, delay)(term),
    [callback, delay]
  );
}
