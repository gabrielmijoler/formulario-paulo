"use client;";

import { useRouter } from "next/navigation";

import Modal from "@/app/components/modal";
import Table, {
  type TFormattedRow,
  type TTableColumn,
} from "@/app/components/table";
import useSnackbar from "@/app/hooks/useSnackbar";
import type { TCompany } from "@/app/repository/company/types";
import { formatDocument } from "@/app/utils/formatters";
import { Delete } from "@mui/icons-material";
import { DialogContent, IconButton } from "@mui/material";

import useBindCompanies from "../../hooks/useBindCompanies";

type TProps = {
  open: boolean;
  setOpen: VoidFunction;
  selectedCompanies: TCompany[];
  onRemove: (company: TCompany) => void;
  onClear: VoidFunction;
};

export const columns: TTableColumn[] = [
  {
    label: "CNPJ",
    property: "document",
  },
  {
    label: "Nome",
    property: "fantasyName",
  },
  {
    label: "Remover",
    property: "remove",
  },
];

export default function ConfirmationModal({
  open,
  setOpen,
  selectedCompanies,
  onRemove,
  onClear,
}: TProps) {
  const { mutateAsync: bindCompaniesMutation, isPending } = useBindCompanies();
  const { setSnack } = useSnackbar();
  const { push } = useRouter();

  const mapTo = (data: TCompany): TFormattedRow => ({
    document: {
      content: formatDocument(data.document.toString()),
    },
    fantasyName: {
      content: data.fantasyName,
    },
    remove: {
      content: (
        <IconButton onClick={() => onRemove(data)} size="small">
          <Delete fontSize="small" />
        </IconButton>
      ),
    },
  });

  const handleSubmit = async () => {
    bindCompaniesMutation(selectedCompanies)
      .then(() => {
        setSnack({
          color: "success",
          message: "Solicitação feita com sucesso",
          open: true,
        });
        onClear();
        setOpen();
        push("/minhas-solicitacoes");
      })
      .catch((error: unknown) => {
        setSnack({
          color: "error",
          message: (error as Error).message,
          open: true,
        });
      });
  };

  return (
    <Modal disabledOnClose open={open} setOpen={setOpen}>
      <Modal.Title>Atenção</Modal.Title>
      <Modal.Text>
        Você deseja realmente vincular os CNPJs listados abaixo ao seu usuário?
        Esta ação será enviada para aprovação.
      </Modal.Text>
      <DialogContent className="sm:min-w-[500px] p-4">
        <Table>
          <Table.Columns columns={columns} />
          <Table.Rows
            columns={columns}
            data={selectedCompanies}
            mapTo={mapTo}
          />
        </Table>
      </DialogContent>
      <Modal.Actions>
        <Modal.CancelButton disabled={isPending} onClick={setOpen}>
          Cancelar
        </Modal.CancelButton>
        <Modal.ConfirmButton
          disabled={isPending}
          loading={isPending}
          onClick={handleSubmit}
        >
          Sim, vincular
        </Modal.ConfirmButton>
      </Modal.Actions>
    </Modal>
  );
}
