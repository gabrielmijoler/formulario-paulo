"use client";

import If from "@/app/components/if";
import { Grid2 } from "@mui/material";

import SearchCompany from "../searchCompany";

type TProps = {
  selectedItems?: number;
};

export default function Filters({ selectedItems }: TProps) {
  return (
    <div className="mb-4">
      <Grid2 alignItems="center" container justifyContent="space-between">
        <Grid2 size={{ xs: 6, md: 4 }}>
          <p className="text-multi-text-primary text-sm">
            <If condition={!!selectedItems}>
              {`${selectedItems} itens selecionados`}
            </If>
          </p>
        </Grid2>
        <Grid2 size={{ xs: 6, md: 4 }}>
          <SearchCompany />
        </Grid2>
      </Grid2>
    </div>
  );
}
