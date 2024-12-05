'use client'

import Layout from '@/components/template/Layout'
import { useAppData } from '@/context'
import { getUserById } from '@/services/user'

export default function Home() {
  const { getToken } = useAppData()

  const getUser = async () => {
    const token = await getToken()
    const user = await getUserById(1, token)
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
