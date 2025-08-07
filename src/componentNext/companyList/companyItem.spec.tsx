import { TCompany } from "@/app/repository/company/types";
import { fireEvent, render, screen } from "@testing-library/react";

import CompanyItem from "./companyItem";

// Mock utils if needed
jest.mock("@/app/utils/formatters", () => ({
  formatDate: jest.fn((date) => `formatted-date(${date})`),
  formatDocument: jest.fn((doc) => `formatted-doc(${doc})`),
}));

describe("CompanyItem", () => {
  const mockCompany: TCompany = {
    id: "1",
    fantasyName: "Empresa Teste",
    document: "12345678000199",
    createdAt: new Date("2024-01-01T00:00:00Z"),
    status: "Ativo",
  };

  const onSelectCompany = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render company data correctly", () => {
    render(
      <CompanyItem
        company={mockCompany}
        isCompanySelected={false}
        onSelectCompany={onSelectCompany}
      />,
    );

    expect(screen.getByText("Empresa Teste")).toBeInTheDocument();
    expect(
      screen.getByText("formatted-doc(12345678000199)"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`formatted-date(${new Date(mockCompany.createdAt)})`),
    ).toBeInTheDocument();
    expect(screen.getByText("Ativo")).toBeInTheDocument();
  });

  it("should check the checkbox if the company is selected", () => {
    render(
      <CompanyItem
        company={mockCompany}
        isCompanySelected={true}
        onSelectCompany={onSelectCompany}
      />,
    );

    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it("should call onSelectCompany when checkbox is clicked", () => {
    render(
      <CompanyItem
        company={mockCompany}
        isCompanySelected={false}
        onSelectCompany={onSelectCompany}
      />,
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(onSelectCompany).toHaveBeenCalled();
  });
});
