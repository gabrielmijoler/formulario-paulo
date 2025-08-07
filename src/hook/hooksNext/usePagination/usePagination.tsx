"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ChangeEvent } from "react";

import type { SelectChangeEvent } from "@mui/material";

const pageQuery = "page";
const perPageQuery = "perPage";

type TProps = {
  perPage?: number;
  total?: number;
};

export default function usePagination({ perPage = 5, total = 0 }: TProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPerPage = Number(searchParams.get(perPageQuery) ?? perPage);
  const currentPage = Number(searchParams.get(pageQuery) ?? "1");
  const count = Math.ceil(total / currentPerPage || 1);

  const handleChangePage = (_: ChangeEvent<unknown> | null, value: number) => {
    const params = new URLSearchParams(searchParams);

    params.set(pageQuery, value.toString());

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSelectPerPage = (e: SelectChangeEvent<number>) => {
    const params = new URLSearchParams(searchParams);

    params.set(pageQuery, "1");
    params.set(perPageQuery, e.target.value.toString());

    router.push(`${pathname}?${params.toString()}`);
  };

  return {
    currentPage,
    currentPerPage,
    count,
    handleChangePage,
    handleSelectPerPage,
  };
}
