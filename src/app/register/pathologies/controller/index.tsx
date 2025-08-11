'use client'
import { useState, useCallback } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { getPathologies, postPathologies } from '@/services/pathologies'
import {
  IPathologiesRequest,
  IPathologiesResponse,
} from '@/services/pathologies/types'
import { useDebounceState } from '@/hook/use-debounce-state'
import usePagination from '@/hook/use-pagination'

const pathologySchema = z.object({
  code: z.string().min(1, 'Código é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
})

export const usePatologiasController = () => {
  const queryClient = useQueryClient()

  const [debounceSearch, search, setSearch] = useDebounceState<
    string | undefined
  >(undefined, 1000)
  const [pathologiesData, setPathologiesData] = useState<
    IPathologiesResponse[]
  >([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { pagination, setPagination } = usePagination()

  const methods = useForm<IPathologiesRequest>({
    criteriaMode: 'all',
    resolver: zodResolver(pathologySchema),
    defaultValues: {
      code: '',
      description: '',
    },
  })

  const { mutate: createPathology, isSuccess: isCreateSuccess } = useMutation({
    mutationFn: postPathologies,
    onSuccess: () => {
      methods.reset()
      queryClient.invalidateQueries({ queryKey: ['pathologies'] })
      handleCloseModal()
    },
    onError: (error) => {
      console.error('Erro ao criar patologia:', error)
    },
  })

  const { data, error, isLoading } = useQuery({
    queryKey: ['pathologies', pagination, debounceSearch],
    queryFn: async () => {
      const response = await getPathologies({
        paginate: true,
        current_page: pagination.page,
        per_page: pagination.itemsPerPage,
        total: pagination.total,
        filter: { name: debounceSearch ?? '' },
      })

      const updatedData = response.data.map((pathology: any) => ({
        ...pathology,
        isOpen: false,
      }))

      setPathologiesData(updatedData)
      return { ...response, data: updatedData }
    },
  })
  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    methods.reset()
  }, [methods])

  const handleSubmit: SubmitHandler<IPathologiesRequest> = useCallback(
    (data) => {
      console.log(data)
      createPathology({
        code: data.code,
        description: data.description,
      })
    },
    [createPathology],
  )

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearch(value)
    },
    [setSearch],
  )

  const handlePaginationChange = useCallback(
    (newPagination: any) => {
      setPagination(newPagination)
    },
    [setPagination],
  )

  return {
    pathologiesData,
    isModalOpen,
    pagination,
    search,
    methods,
    data,
    error,
    isLoading,
    isCreateSuccess,
    handleOpenModal,
    handleCloseModal,
    handleSubmit,
    handleSearchChange,
    handlePaginationChange,
  }
}
