'use client'

import { useState, useCallback } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDebounceState } from '@/hook/use-debounce-state'
import { IQuestion, IQuestionResponse } from '@/services/questions/types'
import { getQuestion, postQuestion } from '@/services/questions'
import { questionSchema } from '../schema'

interface PaginationState {
  page: number
  itemsPerPage: number
  total: number
}

interface UseQuestionControllerReturn {
  openModal: boolean
  questionData: IQuestionResponse[]
  pagination: PaginationState
  search: string | undefined

  isLoading: boolean
  error: unknown
  isSuccess: boolean
  isMutating: boolean

  methods: ReturnType<typeof useForm<IQuestion>>

  handleOpen: () => void
  handleClose: () => void
  onSubmit: SubmitHandler<IQuestion>
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>

  data: any
}

const INITIAL_PAGINATION = {
  page: 1,
  itemsPerPage: 10,
  total: 10,
} as const

const FORM_DEFAULT_VALUES = {
  name: '',
  response: '',
} as const

const DEBOUNCE_DELAY = 1000

export const useQuestionController = (): UseQuestionControllerReturn => {
  const queryClient = useQueryClient()
  const [debounceSearch, search, setSearch] = useDebounceState<
    string | undefined
  >(undefined, DEBOUNCE_DELAY)
  const [questionData, setQuestionData] = useState<IQuestion[]>([])
  const [openModal, setOpenModal] = useState(false)
  const [pagination, setPagination] =
    useState<PaginationState>(INITIAL_PAGINATION)

  const methods = useForm<IQuestion>({
    criteriaMode: 'all',
    resolver: zodResolver(questionSchema),
    defaultValues: FORM_DEFAULT_VALUES,
    mode: 'onBlur',
  })

  const handleOpen = useCallback(() => setOpenModal(true), [])
  const handleClose = useCallback(() => {
    setOpenModal(false)
    methods.reset()
  }, [methods])

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value)
      setPagination((prev) => ({ ...prev, page: 1 }))
    },
    [setSearch],
  )

  const {
    mutate,
    isSuccess,
    isPending: isMutating,
  } = useMutation({
    mutationFn: postQuestion,
    onSuccess: () => {
      methods.reset()
      handleClose()
      queryClient.invalidateQueries({ queryKey: ['questions'] })
    },
    onError: (error) => {
      console.error('Erro ao criar paciente:', error)
    },
  })

  const onSubmit: SubmitHandler<IQuestion> = useCallback(
    (data) => {
      mutate({
        ...data,
        response: data.response,
        name: data.name,
      })
    },
    [mutate],
  )

  const { data, error, isLoading } = useQuery({
    queryKey: ['questions', pagination, debounceSearch],
    queryFn: async () => {
      const response = await getQuestion({
        paginate: true,
        current_page: pagination.page,
        per_page: pagination.itemsPerPage,
        total: pagination.total,
        filter: { name: debounceSearch ?? '' },
      })

      const updatedData = response.data.map((question: IQuestion) => ({
        ...question,
        isOpen: false,
      }))

      setQuestionData(updatedData)

      setPagination((prev) => ({
        ...prev,
        total: response.pagination?.total || prev.total,
      }))

      return { ...response, data: updatedData }
    },
    refetchOnWindowFocus: false,
    retry: 2,
  })

  return {
    openModal,
    questionData,
    pagination,
    search,
    isLoading,
    error,
    isSuccess,
    isMutating,
    methods,
    handleOpen,
    handleClose,
    onSubmit,
    handleSearchChange,
    setPagination,
    data,
  }
}
