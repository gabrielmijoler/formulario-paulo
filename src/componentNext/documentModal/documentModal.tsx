"use client;";

import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useState,
} from "react";
import { useSession } from "next-auth/react";
import { PatternFormat } from "react-number-format";

import useSetDocument from "@/app/(private)/(home)/hooks/useSetDocument";
import Modal from "@/app/components/modal";
import useSnackbar from "@/app/hooks/useSnackbar";
import { TUser } from "@/app/types";
import { cleanCPF, verifyCPF } from "@/app/utils/formatters";
import { DialogContent, TextField } from "@mui/material";

type TProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
export default function DocumentModal({ open, setOpen }: TProps) {
  const { setSnack } = useSnackbar();
  const { data: session, update } = useSession();
  const user: TUser | undefined = session?.user;
  const { mutateAsync: userDocumentMutation, isPending } = useSetDocument();
  const [field, setField] = useState({ value: "", error: "" });

  const handleSubmit = async () => {
    if (!field.value) {
      setField((prev) => ({ ...prev, error: "CPF é obrigatório." }));
      return;
    }

    if (verifyCPF(field.value) === false) {
      setField((prev) => ({ ...prev, error: "CPF inválido." }));
      return;
    }

    userDocumentMutation({
      document: cleanCPF(field.value),
      email: user?.email ?? "",
      name: user?.name ?? "",
      username: user?.username ?? "",
    })
      .then(async () => {
        await update();
        setSnack({
          color: "success",
          message: "CPF vinculado com sucesso!",
          open: true,
        });
        setOpen(false);
      })
      .catch((error: unknown) => {
        setSnack({
          color: "error",
          message: `Ocorreu um erro ao vincular o CPF: ${error}`,
          open: true,
        });
      });
  };

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      if (field.error) {
        setField((prev) => ({ ...prev, error: "" }));
      }
      setField((prev) => ({ ...prev, value }));
    },
    [field.error],
  );

  return (
    <Modal disabledOnClose open={open} setOpen={setOpen}>
      <Modal.Title>Informe seu CPF</Modal.Title>
      <Modal.Text>
        Seu CPF ainda não está vinculado à sua conta. Insira-o abaixo para
        continuar.
      </Modal.Text>
      <DialogContent className="sm:min-w-[500px] my-4 p-4">
        <PatternFormat
          customInput={TextField}
          error={!!field.error}
          format="###.###.###-##"
          fullWidth
          helperText={field.error}
          label="CPF"
          mask="_"
          onChange={handleChange}
          value={field.value}
        />
      </DialogContent>
      <Modal.Actions>
        <Modal.CancelButton
          disabled={isPending}
          onClick={() => {
            setOpen(false);
          }}
        >
          Cancelar
        </Modal.CancelButton>
        <Modal.ConfirmButton loading={isPending} onClick={handleSubmit}>
          Vincular CPF
        </Modal.ConfirmButton>
      </Modal.Actions>
    </Modal>
  );
}
