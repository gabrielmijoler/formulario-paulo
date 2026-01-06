export type Pagination = {
  per_page: number | undefined
  current_page: number | undefined
  total: number | undefined
}

export type FilterParams = {
  [key: string]: string
}

export type IGetResponse<T> = {
  data: T[] | undefined
  pagination?: Pagination
}

export type IGetPagination = {
  paginate: boolean
  per_page: number | undefined
  current_page: number | undefined
  total: number | undefined
  filter: FilterParams
  relations?: string
}
