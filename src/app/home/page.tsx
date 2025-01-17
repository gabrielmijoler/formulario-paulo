'use client'

import { Box, TextField } from '@mui/material'

import Layout from '@/components/template/Layout'
import { FPTable } from '@/components/TableCollapse'

export default function Home() {
  return (
    <Layout
      titulo="Página Inicial"
      subtitulo="Estamos construindo um template Admin!"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      ></Box>
    </Layout>
  )
}
