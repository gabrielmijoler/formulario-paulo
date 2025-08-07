import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { screen, waitFor } from "@testing-library/dom";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SearchCompany from "./searchCompany";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("searchCompany component", () => {
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

  it("should render correctly", () => {
    render(<SearchCompany />);

    expect(
      screen.getByPlaceholderText("Busque por nome ou CNPJ"),
    ).toBeInTheDocument();
  });

  it("pushes query params correctly", async () => {
    const user = userEvent.setup();
    const expectedSearchParams = new URLSearchParams({ search: "test" });

    render(<SearchCompany />);

    const input = screen.getByPlaceholderText("Busque por nome ou CNPJ");

    await user.type(input, "test{enter}");

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith(
        `${mockPathname}?${expectedSearchParams.toString()}`,
      );
    });
  });
});
