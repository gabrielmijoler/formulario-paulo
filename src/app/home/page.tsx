'use client'

import Layout from '@/components/template/Layout'
import { useAppData } from '@/context'
import { getUserById } from '@/services/user'

export default function Home() {
  const getUser = async () => {
    const user = await getUserById(1)
    console.log('User:', user)
  }

  return (
    <Layout
      titulo="Página Inicial"
      subtitulo="Estamos construindo um template Admin!"
    >
      <h3>Conteúdo!!!!</h3>
      <button onClick={getUser}>Fetch Data</button>
    </Layout>
  )
}
