import { ColumnTypeProps } from '@/components/TableCollapse/types'

import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'

import { FPBox } from '@/components/Box'
import Link from 'next/link'
import { IPathologiesResponse } from '@/services/pathologies/types'

export const columnsPathologies =
  (): ColumnTypeProps<IPathologiesResponse>[] => [
    {
      name: 'Code',
      key: 'code',
    },
    {
      name: 'Description',
      key: 'description',
    },
    {
      name: 'Id',
      key: 'id',
    },
    {
      name: <div className="text-center">Editar</div>,
      key: 'edit',
      width: '5rem',
      render: (row: IPathologiesResponse) => {
        if (!row) return null

        return (
          <FPBox display="flex" direction="row">
            <Link href={`/cadastro/patologias/editar/${row.id}`} passHref>
              <IconButton size="small">{<EditIcon />}</IconButton>
            </Link>
          </FPBox>
        )
      },
    },
  ]
