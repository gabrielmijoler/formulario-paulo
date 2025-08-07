import { twMerge } from "tailwind-merge";

type TProps = {
  status?: string;
};

const colors = {
  APROVADO: "bg-multi-success-lighter text-multi-success-darkest",
  "AGUARDANDO APROVAÇÃO": "bg-multi-warning-lighter text-multi-warning-darkest",
  REPROVADO: "bg-multi-error-lighter text-multi-error-darkest",
};

export default function Status({ status }: TProps) {
  return (
    <div
      className={twMerge(
        "w-fit rounded-[40px] px-4 py-1",
        colors[status as keyof typeof colors],
      )}
    >
      <p className="text-xs font-semibold">{status}</p>
    </div>
  );
}
