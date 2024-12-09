'use client'

import Layout from '@/components/template/Layout'
import { getUserById } from '@/services/user'
import { useQuery } from '@tanstack/react-query'

export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['user', 1],
    queryFn: () => getUserById(1),
  })

  const handleClick = () => {
    console.log('User data:', data)
  }

  return (
    <Layout
      titulo="Página Inicial"
      subtitulo="Estamos construindo um template Admin!"
    >
      <h3>Conteúdo!!!!</h3>
      <button onClick={handleClick}>Fetch Data</button>
    </Layout>
  )
}
