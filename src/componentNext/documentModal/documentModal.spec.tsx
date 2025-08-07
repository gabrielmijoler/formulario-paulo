import { useSession } from "next-auth/react";

import useSnackbar from "@/app/hooks/useSnackbar";
import userRepository from "@/app/repository/user";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import DocumentModal from "./documentModal";

jest.mock("@/app/hooks/useSnackbar", () => ({
  __esModule: true,
  default: jest.fn(() => ({ setSnack: jest.fn() })),
}));

jest.mock("@/app/repository/user", () => ({
  __esModule: true,
  default: { postUser: jest.fn() },
}));

jest.mock("next-auth/react", () => ({
  __esModule: true,
  useSession: jest.fn(),
}));

const mockPostUser = userRepository.postUser as jest.Mock;

const queryClient = new QueryClient();

export const TestProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("DocumentModal Component", () => {
  const setOpen = jest.fn();
  const mockValue = {
    snack: { message: "Test", open: true },
    setSnack: jest.fn(),
  };

  (useSnackbar as jest.Mock).mockReturnValue(mockValue);
  (useSession as jest.Mock).mockReturnValue({
    data: { user: { name: "John Doe", email: "john@example.com" } },
    status: "authenticated",
    update: jest.fn(),
  });

  it("renders correctly", () => {
    render(
      <TestProviders>
        <DocumentModal open={true} setOpen={setOpen} />
      </TestProviders>,
    );
    expect(screen.getByText("Informe seu CPF")).toBeInTheDocument();
    expect(screen.getByLabelText("CPF")).toBeInTheDocument();
  });

  it("shows an error if submitting without CPF", async () => {
    render(
      <TestProviders>
        <DocumentModal open={true} setOpen={setOpen} />
      </TestProviders>,
    );
    fireEvent.click(screen.getByText("Vincular CPF"));
    expect(await screen.findByText("CPF é obrigatório.")).toBeInTheDocument();
  });

  it("submits CPF successfully", async () => {
    mockPostUser.mockResolvedValueOnce({});
    render(
      <TestProviders>
        <DocumentModal open={true} setOpen={setOpen} />
      </TestProviders>,
    );

    fireEvent.change(screen.getByLabelText("CPF"), {
      target: { value: "578.115.200-87" },
    });

    fireEvent.click(screen.getByText("Vincular CPF"));

    await waitFor(() => expect(userRepository.postUser).toHaveBeenCalled());
    expect(mockValue.setSnack).toHaveBeenCalledWith({
      color: "success",
      message: "CPF vinculado com sucesso!",
      open: true,
    });
    expect(setOpen).toHaveBeenCalled();
  });

  it("shows an error message if submission fails", async () => {
    mockPostUser.mockRejectedValueOnce(new Error("Erro na API"));
    render(
      <TestProviders>
        <DocumentModal open={true} setOpen={setOpen} />
      </TestProviders>,
    );
    fireEvent.change(screen.getByLabelText("CPF"), {
      target: { value: "578.115.200-87" },
    });
    fireEvent.click(screen.getByText("Vincular CPF"));
    await waitFor(() =>
      expect(mockValue.setSnack).toHaveBeenCalledWith(
        expect.objectContaining({
          color: "error",
          message: expect.stringContaining("Ocorreu um erro ao vincular o CPF"),
        }),
      ),
    );
  });
});
