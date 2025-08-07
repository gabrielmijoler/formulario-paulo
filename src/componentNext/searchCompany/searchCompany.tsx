"use client";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import SearchInput from "@/app/components/searchInput";
import useDebounce from "@/app/hooks/useDebounce";
import { removeSpecialCaracters } from "@/app/utils/formatters";
import updateSearchParam from "@/app/utils/searchParam";

export default function SearchCompany() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>(
    searchParams.get("search") || "",
  );
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  const handleSubmit = useCallback(() => {
    let value = debouncedSearch;
    const cleanSearch = removeSpecialCaracters(debouncedSearch ?? "");

    const regexAllNumbers = /^\d+$/;
    const isCNPJ =
      cleanSearch?.length === 14 && regexAllNumbers.test(cleanSearch);

    if (isCNPJ) {
      value = cleanSearch;
    }

    router.push(
      `${pathname}?${updateSearchParam({ path: searchParams.toString(), obj: { search: value } })}`,
    );
  }, [router, pathname, searchParams, debouncedSearch]);

  const debounceValue = useDebounce(search, 700) as string;

  useEffect(() => {
    if (searchParams.get("search") === debounceValue) return;
    setDebouncedSearch(debounceValue);
    handleSubmit();
  }, [debounceValue, handleSubmit, searchParams]);

  return (
    <SearchInput
      label="Pesquisar"
      onChange={setSearch}
      onSubmit={handleSubmit}
      placeholder="Busque por nome ou CNPJ"
      value={search}
    />
  );
}
