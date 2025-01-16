import { ColumnTypeProps } from '@/components/TableCollapse/types'
import { IClient } from '@/services/clients/types'

import IconButton from '@mui/material/IconButton'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

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
