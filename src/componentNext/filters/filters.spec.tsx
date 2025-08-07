import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { render, screen } from "@testing-library/react";

import Filters from "./filters";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("Filters component", () => {
  const mockRouter = {
    push: jest.fn(),
  };
  const mockPathname = "pathname";

  beforeEach(() => {
    const mockSearchParams = new URLSearchParams();
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);

    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    (usePathname as jest.Mock).mockReturnValue(mockPathname);
  });

  it("renders filters correctly", () => {
    render(<Filters />);
    expect(screen.getByPlaceholderText("Busque por nome ou CNPJ"));
  });
});
