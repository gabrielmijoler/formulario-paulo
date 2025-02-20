import { useState } from 'react'

interface PaginationState {
  page: number
  itemsPerPage: number
  total: number
}

const usePagination = (
  initialState = { page: 1, itemsPerPage: 10, total: 0 },
) => {
  const [pagination, setPagination] = useState(initialState)

  const setPage = (page: number) => {
    setPagination((prev) => ({ ...prev, page }))
  }

  const setItemsPerPage = (itemsPerPage: number) => {
    setPagination((prev: PaginationState) => ({ ...prev, itemsPerPage }))
  }

  const setTotal = (total: number) => {
    setPagination((prev) => ({ ...prev, total }))
  }

  return {
    pagination,
    setPage,
    setItemsPerPage,
    setTotal,
    setPagination,
  }
}

export default usePagination
