import { ColumnTypeProps } from '@/components/TableCollapse/types'
import { IClient } from '@/services/clients/types'

import IconButton from '@mui/material/IconButton'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import DeleteIcon from '@mui/icons-material/Delete'

import { FPBox } from '@/components/Box'

export const getColumns = (
  handleOpenRow: (rowData: IClient) => void,
): ColumnTypeProps<IClient>[] => [
  {
    key: 'collapse',
    render: (row: IClient) => {
      if (!row) return null

      return (
        <IconButton size="small" onClick={() => handleOpenRow(row)}>
          {row.isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      )
    },
  },
  {
    name: 'Nome',
    key: 'name',
  },
  {
    name: 'Email',
    key: 'email',
  },
  {
    name: 'RG',
    key: 'IeRG',
  },
  {
    name: <div className="text-center">Editar</div>,
    key: 'edit',
    width: '5rem',
    render: (row: IClient) => {
      if (!row) return null

      return (
        <FPBox display="flex" direction="row">
          <IconButton size="small" onClick={() => handleOpenRow(row)}>
            {<DeleteIcon />}
          </IconButton>
        </FPBox>
      )
    },
  },
]

export const subColumns: ColumnTypeProps<IClient>[] = [
  {
    name: 'Documento',
    key: 'document',
  },
  {
    name: 'Endereço',
    key: 'address',
  },
  {
    name: 'Telefone',
    key: 'telephone',
  },
]
