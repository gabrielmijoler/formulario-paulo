"use client";

import MobileTableCard from "@/app/components/mobileTableCard";
import { type TCompany } from "@/app/repository/company/types";
import { formatDate, formatDocument } from "@/app/utils/formatters";
import { Checkbox } from "@mui/material";

import Status from "../companyTable/companyTable.status";

type TProps = {
  company: TCompany;
  onSelectCompany: VoidFunction;
  isCompanySelected: boolean;
  disabled: boolean;
};

export default function CompanyItem({
  company,
  isCompanySelected,
  onSelectCompany,
  disabled,
}: TProps) {
  return (
    <MobileTableCard>
      <MobileTableCard.Header>
        <Checkbox
          checked={isCompanySelected}
          disabled={disabled}
          onChange={onSelectCompany}
        />
      </MobileTableCard.Header>
      <MobileTableCard.Body>
        <MobileTableCard.Body.Item label="Nome fantasia">
          <p className={`${disabled && "text-multi-text-disabled"}`}>
            {company.fantasyName}
          </p>
        </MobileTableCard.Body.Item>
        <MobileTableCard.Body.Item label="CNPJ">
          <p className={`${disabled && "text-multi-text-disabled"}`}>
            {formatDocument(company.document.toString())}
          </p>
        </MobileTableCard.Body.Item>
        <MobileTableCard.Body.Item label="Entrada">
          <p className={`${disabled && "text-multi-text-disabled"}`}>
            {formatDate(company.createdAt)}
          </p>
        </MobileTableCard.Body.Item>
        <MobileTableCard.Body.Item label="Status">
          <Status status={company.status} />
        </MobileTableCard.Body.Item>
      </MobileTableCard.Body>
    </MobileTableCard>
  );
}
