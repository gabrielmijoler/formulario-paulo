'use client'

import { Box, Paper, TextField } from '@mui/material'

import Layout from '@/components/template/Layout'
import { columnsMedicalRecord, columnsPatients } from '@/utils/table-columns'
import { useDebounceState } from '@/hook/use-debounce-state'
import { useState } from 'react'
import usePagination from '../../hook/use-pagination'
import { IQuestionResponse } from '@/services/questions/types'
import { useQuery } from '@tanstack/react-query'
import { getMedicalRecord } from '@/services/medical-record'
import { IMedicalRecordResponse } from '@/services/medical-record/types'
import { TableRows } from '@/componentsNext/table/table.rows'
import Table from '@/componentsNext/table'

const mapTo = (row: IMedicalRecordResponse) => ({
  client: {
    content: row.client?.name ?? '-',
    className: 'font-medium',
  },
  symptoms: {
    content: row.symptoms ?? '-',
    className: 'text-sm',
  },
  clinicalExam: {
    content: row.clinicalExam ?? '-',
    className: 'text-sm',
  },
  conclusion: {
    content: row.conclusion ?? '-',
    className: 'text-sm',
  },
  status: {
    content: row.status ?? '-',
    className: `text-sm ${
      row.status === 'ACTIVE' ? 'text-green-600' : 'text-red-600'
    }`,
  },
})

export default function Home() {
  const [debounceSearch, search, setSearch] = useDebounceState<
    string | undefined
  >(undefined, 1000)
  const { data, error, isLoading } = useQuery({
    queryKey: ['medicalRecordTable', debounceSearch],
    queryFn: async () => {
      const response = await getMedicalRecord({
        paginate: true,
        current_page: data?.pagination?.current_page,
        per_page: data?.pagination?.per_page,
        total: data?.pagination?.total,
        filter: { name: debounceSearch ?? '' },
      })
      console.log('response', response)
      return response
    },
  })
  console.log('data', data)
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
          <Table className="w-full">
            <TableRows
              data={data?.data?.flat() ?? []}
              columns={columnsMedicalRecord}
              mapTo={mapTo}
              emptyMessage="Nenhum prontuário encontrado"
            />
            <Table.Columns columns={columnsMedicalRecord} />
            <Table.Pagination
              total={data?.pagination?.total}
              perPage={data?.pagination?.per_page}
            />
          </Table>
        </Paper>
      </Box>
    </Layout>
  )
}
