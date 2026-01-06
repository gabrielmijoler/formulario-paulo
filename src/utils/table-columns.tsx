import { ColumnTypeProps } from '@/components/TableCollapse/types'
import { IClient } from '@/services/clients/types'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import { FPBox } from '@/components/Box'
import Link from 'next/link'
import { IPathologiesResponse } from '@/services/pathologies/types'
import { IQuestionResponse } from '@/services/questions/types'
import { RoutesUrls } from '@/routes'
import { TTableColumn } from '@/componentsNext/table'
import { IMedicalRecordResponse } from '@/services/medical-record/types'

export const columnsPathologies: TTableColumn[] = [
  {
    label: 'Code',
    property: 'code',
    sort: true,
  },
  {
    label: 'Description',
    property: 'description',
    sort: true,
  },
  {
    label: 'Editar',
    property: 'edit',
    className: 'w-24 text-center',
    render: (row: IPathologiesResponse) => {
      if (!row) return null

      return (
        <FPBox display="flex" className="justify-center pr-2" direction="row">
          <Link href={`${RoutesUrls.PATHOLIES_URL}/edit/${row.id}`} passHref>
            <IconButton size="small">{<EditIcon />}</IconButton>
          </Link>
        </FPBox>
      )
    },
  },
]
export const columnsQuestions: TTableColumn[] = [
  {
    label: 'Perguntas',
    property: 'name',
  },
  {
    label: 'Editar',
    property: 'edit',
    className: 'text-center',
    render: (row: IQuestionResponse) => {
      if (!row) return null

      return (
        <FPBox display="flex" direction="row">
          <Link href={`${RoutesUrls.QUESTION_URL}/edit/${row.id}`} passHref>
            <IconButton size="small">{<EditIcon />}</IconButton>
          </Link>
        </FPBox>
      )
    },
  },
]

export const columnsPatients: TTableColumn[] = [
  {
    label: 'Nome',
    property: 'name',
  },
  {
    label: 'Email',
    property: 'email',
  },
  {
    label: 'RG',
    property: 'ieRg',
  },
  {
    label: 'Documento',
    property: 'document',
  },
  {
    label: 'Cidade',
    property: 'client.clientAddress.city',
  },
  {
    label: 'Telefone',
    property: 'telephone',
  },
  {
    label: 'Editar',
    property: 'edit',
    className: '5rem text-center',
    render: (row: IClient) => {
      if (!row) return null

      return (
        <FPBox display="flex" direction="row">
          <Link href={`${RoutesUrls.PATIENT_URL}/edit/${row.id}`} passHref>
            <IconButton size="small">{<EditIcon />}</IconButton>
          </Link>
        </FPBox>
      )
    },
  },
]

export const columnsMedicalRecord: TTableColumn[] = [
  {
    label: 'Paciente',
    property: 'client',
    sort: true,
  },
  {
    label: 'Sintomas',
    property: 'symptoms',
    sort: true,
  },
  {
    label: 'Exame Clínico',
    property: 'clinicalExam',
    sort: true,
  },
  {
    label: 'Conclusão',
    property: 'conclusion',
    sort: true,
  },
  {
    label: 'Status',
    property: 'status',
    sort: true,
  },
  {
    label: 'Ações',
    property: 'actions',
    render: (row: IMedicalRecordResponse) => {
      return (
        <div className="flex gap-2 justify-center">
          <Link href={`/medical-record/edit/${row.id}`}>
            <IconButton size="small">
              <EditIcon />
            </IconButton>
          </Link>
        </div>
      )
    },
  },
]

export const subColumns: ColumnTypeProps<IClient>[] = []
