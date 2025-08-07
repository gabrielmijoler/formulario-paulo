import QueryPagination from "@/app/components/queryPagination";
import type { TCompany } from "@/app/repository/company/types";

import EmptyComponent from "../empty";

import CompanyItem from "./companyItem";

type TProps = {
  companies: TCompany[];
  total: number;
  onSelectCompany: (company: TCompany) => void;
  isCompanySelected: (company: TCompany) => boolean;
  isDisabled: (company: TCompany) => boolean;
};

export default function CompanyList({
  companies,
  total,
  isCompanySelected,
  onSelectCompany,
  isDisabled,
}: TProps) {
  if (!companies.length) {
    return (
      <div className="md:hidden">
        <EmptyComponent />
      </div>
    );
  }

  const mappedQuotations = companies.map((company) => (
    <CompanyItem
      company={company}
      disabled={isDisabled(company)}
      isCompanySelected={isCompanySelected(company)}
      key={company.id}
      onSelectCompany={() => onSelectCompany(company)}
    />
  ));

  return (
    <div className="flex flex-col gap-y-4 md:hidden">
      {mappedQuotations}

      <QueryPagination
        perPage={5}
        perPageOptions={[5, 10, 15, 20]}
        total={total}
      />
    </div>
  );
}
