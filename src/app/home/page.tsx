import Layout from '@/components/template/Layout'
import { getUserById } from '@/services/user'
// import { useQuery } from '@tanstack/react-query'

export async function handleGetUserAction() {
  'use server'

  const response = await getUserById(1)
  console.log('user========', response)
}

export default async function Home() {
  return (
    <Layout
      titulo="Página Inicial"
      subtitulo="Estamos construindo um template Admin!"
    >
      <h3>Conteúdo!!!!</h3>
      <button onClick={handleGetUserAction}>Fetch Data</button>
    </Layout>
  )
}
