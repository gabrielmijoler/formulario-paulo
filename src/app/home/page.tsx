'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { Box, TextField } from '@mui/material'

import Layout from '@/components/template/Layout'
import { FPTable } from '@/components/TableCollapse'

import { getClient } from '@/services/clients'
import { IClient, Pagination } from '@/services/clients/types'

import { useDebounceState } from '@/hook/useDebounceState'

import { getColumns, subColumns } from './columns'
import { parseSubscriptions } from './utils'

export interface GenericObject<T> {
  [key: string | number | symbol]: T
}

const ErrorComponent = ({ error }: { error: any }) => (
  <div>Error: {JSON.stringify(error)}</div>
)

export default function Home() {
  const [pagination, setPagination] = useState({
    page: 1,
    itemsPerPage: 10,
    total: 10,
  })

  const [debounceSearch, search, setSearch] = useDebounceState<
    string | undefined
  >(undefined, 1000)
  const [clientData, setClientData] = useState<IClient[]>([])

  let { data, error, isLoading } = useQuery({
    queryKey: ['user', pagination, debounceSearch],
    queryFn: async () => {
      const response = await getClient({
        paginate: true,
        current_page: pagination.page,
        per_page: pagination.itemsPerPage,
        total: pagination.total,
        filter: { name: debounceSearch ?? '' },
      })

      const updatedData = response.data.map((client: IClient) => ({
        ...client,
        isOpen: false,
      }))

      setClientData(updatedData)
      return { ...response, data: updatedData }
    },
  })

  const handleOpenRow = (rowData: IClient) => {
    const updatedData = clientData.map((client) =>
      client.id === rowData.id ? { ...client, isOpen: !client.isOpen } : client,
    )

    setClientData(updatedData)
  }

  const columns = getColumns(handleOpenRow)

  if (error) {
    return <ErrorComponent error={error} />
  }

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
      >
        <TextField
          label="Buscar por nome"
          variant="outlined"
          size="medium"
          value={search ?? ''}
          onChange={(event) => setSearch(event.target.value)}
        />
      </Box>
      <FPTable
        columns={columns}
        data={parseSubscriptions({
          ...data,
          data: clientData,
        })}
        columnsCollapse={subColumns}
        isLoading={isLoading}
        pagination={pagination}
        setPagination={setPagination}
        paginationItems={[10, 20, 30, 40]}
      />
    </Layout>
  )
}
