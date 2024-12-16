import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <h2>Não Encontrado</h2>
      <p>Não foi possível achar a pesquisa</p>
      <Link href="/">Home</Link>
    </div>
  )
}
