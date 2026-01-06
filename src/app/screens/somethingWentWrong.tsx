import { BaseErrorScreen } from '@/componentsNext/errors'
import BlockErrorImage from '@images/block-error.svg'

type TProps = {
  reset: VoidFunction
  containerClassName?: string
}

export function SomethingWentWrongScreen({
  reset,
  containerClassName,
}: Readonly<TProps>) {
  return (
    <BaseErrorScreen
      containerClassName={containerClassName}
      handleTryAgain={reset}
      image={BlockErrorImage as string}
      initialPageLink="/"
      title="Algo deu errado, tente novamente mais tarde."
    >
      Estamos enfrentando problemas técnicos. Já estamos resolvendo!
    </BaseErrorScreen>
  )
}
