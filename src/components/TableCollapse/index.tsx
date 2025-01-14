import { Fragment, useEffect } from 'react'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Collapse,
  PaginationItem,
  Pagination,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { ChevronLeft, ChevronRight, Sort } from '@mui/icons-material'
import { ColumnTypeProps, RowProps, TableProps } from './types'

export function FPTable({
  data,
  pagination = {
    total: 0,
    page: 1,
    itemsPerPage: 10,
  },
  columns,
  params,
  emptyMessage,
  isLoading,
  paginationItems = [10, 20, 30],
  shouldRenderEmptyColumns = false,
  hideHeader = false,
  setPagination,
  fetchItems,
  handleChangeSort,
  rowCollapse,
  columnsCollapse,
  isOpen = false,
}: TableProps) {
  const renderRows = (rows: RowProps[], parentColor?: string) => {
    return rows.map((row, index): JSX.Element => {
      const bgColor = index % 2 === 0 ? '#f5f6f6' : '#ffffff'
      const rowColor = parentColor ?? bgColor
      return (
        <Fragment key={index}>
          <TableRow sx={{ backgroundColor: rowColor }}>
            {renderColumns(row, rowColor)}
          </TableRow>
        </Fragment>
      )
    })
  }

  const renderColumns = (row: TableProps['data'][0], rowColor: string) => {
    return columns.map((column) => (
      <TableCell
        key={`${row.id}-${column.key}`}
        sx={{
          backgroundColor: rowColor,
          position: column.freeze ? 'sticky' : 'static',
          left: column.freeze ? 0 : 'auto',
        }}
      >
        {column.render ? column.render(row, row.id) : row[column.key]}
      </TableCell>
    ))
  }

  const renderTableWithNoRows = () => (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((item) => (
              <TableCell
                key={`${item.name}-${item.key}`}
                align={item.align && 'center'}
                sx={{
                  width: item.width,
                  minWidth: item.minWidth,
                  maxWidth: item.maxWidth,
                }}
              >
                {renderTableSortLabel(item)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  )

  const renderPagination = () => {
    if (pagination.total > 0 && setPagination) {
      const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        page: number,
      ) => {
        setPagination({ ...pagination, page })
      }

      const totalPages = Math.ceil(pagination.total / pagination.itemsPerPage)

      return (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          <Pagination
            count={totalPages}
            page={pagination.page}
            onChange={handlePageChange}
            renderItem={(item) => (
              <PaginationItem
                {...item}
                selected={item.page === pagination.page}
              />
            )}
          />
          <FormControl variant="outlined" size="small">
            <InputLabel>Itens por página</InputLabel>
            <Select
              label="Itens por página"
              value={pagination.itemsPerPage}
              onChange={(e) =>
                setPagination({
                  ...pagination,
                  itemsPerPage: Number(e.target.value),
                })
              }
            >
              {paginationItems?.map((item) => (
                <MenuItem key={item} value={item}>
                  {item} itens
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )
    } else {
      return null
    }
  }

  const renderTableSortLabel = (column: ColumnTypeProps) => {
    if (!column.visibleOrdering) return column.name

    return (
      <Tooltip title="Sort" enterDelay={300}>
        <span
          className="flex items-center cursor-pointer"
          onClick={() => handleChangeSort && handleChangeSort(column.key || '')}
        >
          <Sort sx={{ marginRight: '0.5rem' }} />
          {column.name}
        </span>
      </Tooltip>
    )
  }

  useEffect(() => {
    if (!fetchItems) return
    fetchItems({
      ...params,
      ...pagination,
    })
  }, [pagination.page, pagination.itemsPerPage])

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Box textAlign="center">
          <span>Loading...</span>
        </Box>
      </Box>
    )
  } else if (data.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Box textAlign="center">
          {shouldRenderEmptyColumns && renderTableWithNoRows()}
          <Box mt="2rem">
            <span>{emptyMessage || 'No data available'}</span>
          </Box>
        </Box>
      </Box>
    )
  }

  return (
    <>
      <TableContainer>
        <Table>
          {!hideHeader && (
            <TableHead>
              <TableRow>
                {columns.map((item) => (
                  <TableCell
                    key={`${item.name}-${item.key}`}
                    align={item.align && 'center'}
                    sx={{
                      width: item.width,
                      minWidth: item.minWidth,
                      maxWidth: item.maxWidth,
                    }}
                  >
                    {renderTableSortLabel(item)}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
          )}
          <TableBody>{renderRows(data)}</TableBody>
        </Table>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 1 }}>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>
                  {columnsCollapse.map((item) => (
                    <TableCell
                      key={`${item.name}-${item.key}`}
                      align={item.align && 'center'}
                      sx={{
                        width: item.width,
                        minWidth: item.minWidth,
                        maxWidth: item.maxWidth,
                      }}
                    >
                      {renderTableSortLabel(item)}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>{renderRows(data)}</TableBody>
            </Table>
          </Box>
        </Collapse>
        {renderPagination()}
      </TableContainer>
    </>
  )
}
