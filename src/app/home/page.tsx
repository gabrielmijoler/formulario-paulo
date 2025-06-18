'use client'

import { Box, Paper, TextField } from '@mui/material'

import Layout from '@/components/template/Layout'
import { FPTable } from '@/components/TableCollapse'
import { columnsPathologies } from '@/utils/columns'
import { data } from 'tailwindcss/defaultTheme'
import { parseQuestions } from './utils'
import { useDebounceState } from '@/hook/useDebounceState'
import { useState } from 'react'
import usePagination from '../../hook/usePagination'
import { IQuestionResponse } from '@/services/questions/types'
import { useQuery } from '@tanstack/react-query'
import { getMedicalRecord } from '@/services/medical-record'

export default function Home() {
  const { pagination, setPagination } = usePagination()
  const [open, setOpen] = useState(false)
  const [debounceSearch, search, setSearch] = useDebounceState<
    string | undefined
  >(undefined, 1000)
  const [medicalRecordData, setMedicalRecordData] = useState<
    IQuestionResponse[]
  >([])
  let { data, error, isLoading } = useQuery({
    queryKey: ['medicalRecordTable', pagination, debounceSearch],
    queryFn: async () => {
      const response = await getMedicalRecord({
        paginate: true,
        current_page: pagination.page,
        per_page: pagination.itemsPerPage,
        total: pagination.total,
        filter: { name: debounceSearch ?? '' },
      })
      console.log(response.data)
      const updatedData = response.data.map((client: any) => ({
        ...client,
        isOpen: false,
      }))

      setMedicalRecordData(updatedData)
      return { ...response, data: updatedData }
    },
  })
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
        <Paper className="p-1">
          <TextField
            label="Buscar por nome"
            variant="outlined"
            size="medium"
            margin="dense"
            value={search ?? ''}
            onChange={(event) => setSearch(event.target.value)}
          />
          <FPTable
            columns={columnsPathologies()}
            data={parseQuestions({ ...data, data: medicalRecordData })}
            isLoading={isLoading}
            pagination={pagination}
            setPagination={setPagination}
            paginationItems={[10, 20, 30, 40]}
          />
        </Paper>
      </Box>
    </Layout>
  )
}
