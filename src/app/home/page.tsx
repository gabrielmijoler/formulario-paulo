'use client'

import { FPTable } from '@/components/TableCollapse'
import { ColumnTypeProps } from '@/components/TableCollapse/types'
import Layout from '@/components/template/Layout'
import { getUserById } from '@/services/user'
import { IUser } from '@/services/user/type'
import { Box, Icon, IconButton, TextField } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useRef, useState } from 'react'
import { getClient } from '@/services/clients'

interface GenericObject<T> {
  [key: string | number | symbol]: T
}
export default function Home() {
  const [pagination, setPagination] = useState({
    page: 1,
    itemsPerPage: 10,
    total: 10,
  })

  const [expandedRows, setExpandedRows] =
    useState<GenericObject<boolean> | null>(null)

  const searchTermRef = useRef('')

  const { data, error, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => getClient(1),
  })

  if (!data) {
    return <div>Error</div>
  }
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>
  }

  console.log(Array(data))
  const filteredData = Array(data).map((row) => row.filter((item) => item.name))

  const rowStatus = useCallback(
    (id?: number) => {
      if (!id || !expandedRows) return false

      return expandedRows[id]
    },
    [expandedRows],
  )

  const toggleRow = useCallback(
    (id?: number) => {
      if (!id) return
      setExpandedRows((prev) => ({ ...prev, [id]: !rowStatus(id) }))
    },
    [rowStatus],
  )

  const columns: ColumnTypeProps<IUser>[] = [
    {
      key: 'collapse',
      render: (row) => {
        if (!row.id) return

        return (
          <IconButton size="small" onClick={() => toggleRow(row.id)}>
            {data?.some((user) => rowStatus(user.id))} ? (
            <KeyboardArrowUpIcon />
            ) : (
            <KeyboardArrowDownIcon />)
          </IconButton>
        )
      },
    },
    {
      name: 'Categoria TF',
      key: 'category',
      visibleOrdering: false,
      render: (row) => <>{row?.email ?? '-'}</>,
    },
    {
      name: 'Capacidade Máxima',
      key: 'maximumCapacity',
      width: '10rem',
      visibleOrdering: false,
      render: (row) => <>{row.name ?? '-'}</>,
    },
    {
      name: 'Visa',
      key: 'visa',
      visibleOrdering: false,
      render: (row) => <>{row.status ?? '-'}</>,
    },
  ]

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchTermRef.current = event.target.value
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
          label="Buscar"
          variant="outlined"
          size="small"
          onChange={handleSearchChange}
        />
      </Box>

      <FPTable
        columns={columns}
        data={filteredData}
        columnsCollapse={columns}
        rowCollapse={[data]}
        isLoading={isLoading}
        isOpen={data?.some((user) => rowStatus(user.id))}
        pagination={pagination}
        setPagination={setPagination}
        paginationItems={[10, 20, 30, 40]}
      />
    </Layout>
  )
}
