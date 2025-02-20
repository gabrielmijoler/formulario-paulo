import * as CSS from 'csstype'

export interface SortDirectionType {
  column: string
  direction: 'asc' | 'desc'
}

export interface Pagination {
  total: number
  page: number
  itemsPerPage: number
}

interface Params {
  [key: string]: any
}

export interface ColumnTypeProps<T = any> {
  key: string
  name?: React.ReactNode
  align?: React.ThHTMLAttributes<HTMLTableCellElement>['align']
  width?: CSS.Property.Width
  minWidth?: CSS.Property.MinWidth
  maxWidth?: CSS.Property.MaxWidth
  freeze?: boolean
  visibleOrdering?: boolean
  render?: (row: T, id?: string) => React.ReactNode
}

export interface RowProps {
  id?: string
  isOpen?: boolean
}

export interface CommonProps<T = RowProps & any, U = Params> {
  data: T[]
  columns: ColumnTypeProps<T>[]
  columnsCollapse?: ColumnTypeProps<T>[]
  params?: U
  emptyMessage?: React.ReactNode
  isLoading?: boolean
  paginationItems?: number[]
  shouldRenderEmptyColumns?: boolean
  hideHeader?: boolean
  sorting?: SortDirectionType
  fetchItems?: (params: U & Pagination) => void
  handleChangeSort?: (key: string) => void
}

export interface ConditionalProps {
  pagination?: Pagination
  setPagination?: React.Dispatch<Pagination>
}

export type TableProps = CommonProps & ConditionalProps

export interface GenericObject<T> {
  [key: string | number | symbol]: T
}
