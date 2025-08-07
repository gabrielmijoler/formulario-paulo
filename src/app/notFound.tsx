import { BaseErrorScreen } from "@/componentsNext/errors";
import NotFoundErrorImage from "@images/not-found-error.svg";

export function NotFoundScreen() {
  return (
    <BaseErrorScreen
      image={NotFoundErrorImage as string}
      initialPageLink="/"
      title="404"
    >
      Ops! Esta página não foi encontrada ou não existe.
    </BaseErrorScreen>
  );
}
