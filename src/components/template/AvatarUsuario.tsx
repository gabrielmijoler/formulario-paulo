import Image from 'next/image'
import Link from 'next/link'

interface AvatarUsuarioProps {
  className?: string
}

export default function AvatarUsuario(props: AvatarUsuarioProps) {
  return (
    <Link href="/perfil">
      <Image
        src={'/images/avatar.svg'}
        width={50}
        height={50}
        alt="Avatar do Usuário"
        className={`
                h-10 w-10 rounded-full cursor-pointer
                ${props.className}
              `}
      />
    </Link>
  )
}
