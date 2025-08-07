import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type { SelectChangeEvent } from "@mui/material";
import { act, renderHook } from "@testing-library/react";

import usePagination from "./usePagination"; // Adjust the import according to the file location

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("usePagination", () => {
  let pushMock: jest.Mock;
  let pathnameMock: string;
  let searchParamsMock: URLSearchParams;

  beforeEach(() => {
    pushMock = jest.fn();
    pathnameMock = "/test-page";
    searchParamsMock = new URLSearchParams();

    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
    (usePathname as jest.Mock).mockReturnValue(pathnameMock);
    (useSearchParams as jest.Mock).mockReturnValue(searchParamsMock);
  });

  it("should initialize with correct values", () => {
    const { result } = renderHook(() => usePagination({}));

    expect(result.current.currentPage).toBe(1);
    expect(result.current.currentPerPage).toBe(5);
    expect(result.current.count).toBe(1);
  });

  it("should handle page change", () => {
    const { result } = renderHook(() =>
      usePagination({ perPage: 5, total: 100 }),
    );

    act(() => {
      result.current.handleChangePage(null, 3);
    });

    expect(pushMock).toHaveBeenCalledWith(`${pathnameMock}?page=3`);
  });

  it("should handle per page selection", () => {
    const { result } = renderHook(() =>
      usePagination({ perPage: 5, total: 100 }),
    );

    act(() => {
      result.current.handleSelectPerPage({
        target: { value: 20 },
      } as SelectChangeEvent<number>);
    });

    expect(pushMock).toHaveBeenCalledWith(`${pathnameMock}?page=1&perPage=20`);
  });

  it("should fallback to default values if no search params exist", () => {
    const { result } = renderHook(() =>
      usePagination({ perPage: 5, total: 100 }),
    );

    expect(result.current.currentPage).toBe(1);
    expect(result.current.currentPerPage).toBe(5);
    expect(result.current.count).toBe(20);
  });

  it("should calculate count properly when total is 0", () => {
    const { result } = renderHook(() =>
      usePagination({ perPage: 5, total: 0 }),
    );

    expect(result.current.count).toBe(1);
  });
});
