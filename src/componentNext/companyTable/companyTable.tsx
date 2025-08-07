"use client";

import Table, { type TFormattedRow } from "@/app/components/table";
import { type TCompany } from "@/app/repository/company/types";
import { formatDate, formatDocument } from "@/app/utils/formatters";
import { Checkbox } from "@mui/material";

import EmptyComponent from "../empty";

import columns from "./companyTable.columns";
import Status from "./companyTable.status";

type TProps = {
  companies?: TCompany[];
  total?: number;
  onSelectCompany: (company: TCompany) => void;
  isCompanySelected: (company: TCompany) => boolean;
  isDisabled: (company: TCompany) => boolean;
};

export default function CompanyTable({
  companies,
  total,
  onSelectCompany,
  isCompanySelected,
  isDisabled,
}: TProps) {
  const mapTo = (data: TCompany): TFormattedRow => {
    const disabled = isDisabled(data);
    return {
      select: {
        content: (
          <Checkbox
            checked={isCompanySelected(data)}
            disabled={disabled}
            onChange={() => onSelectCompany(data)}
          />
        ),
      },
      document: {
        content: (
          <p className={`${disabled && "text-multi-text-disabled"}`}>
            {formatDocument(data.document.toString())}
          </p>
        ),
      },
      fantasyName: {
        content: (
          <p className={`${disabled && "text-multi-text-disabled"}`}>
            {data.fantasyName}
          </p>
        ),
      },
      createdAt: {
        content: (
          <p className={`${disabled && "text-multi-text-disabled"}`}>
            {formatDate(data.createdAt)}
          </p>
        ),
      },
      status: {
        content: <Status status={data.status} />,
      },
    };
  };

  return (
    <Table className="max-md:hidden overflow-visible">
      <Table.Columns columns={columns} />
      <Table.Rows
        columns={columns}
        data={companies}
        emptyComponent={<EmptyComponent />}
        emptyMessage="Você não possui nenhuma empresa vinculada"
        mapTo={mapTo}
      />
      <Table.Pagination total={total} />
    </Table>
  );
}
