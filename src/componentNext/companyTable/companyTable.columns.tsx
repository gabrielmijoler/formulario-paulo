import type { TTableColumn } from "@/app/components/table";

const columns: TTableColumn[] = [
  {
    label: "Selecionar",
    property: "select",
  },
  {
    label: "CNPJ",
    property: "document",
  },
  {
    label: "Nome",
    property: "fantasyName",
  },
  {
    label: "Entrada",
    property: "createdAt",
  },
  {
    label: "Status",
    property: "status",
  },
];

export default columns;
