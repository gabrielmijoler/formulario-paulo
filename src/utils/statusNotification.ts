export enum Status {
  APROVADO = "APROVADO",
  REPROVADO = "REPROVADO",
}

export const statusStyles = {
  [Status.APROVADO]: {
    color: "#023113",
    backgroundColor: "#D9FFE5",
  },
  [Status.REPROVADO]: {
    color: "#48070B",
    backgroundColor: "#FFF1F2",
  },
};
