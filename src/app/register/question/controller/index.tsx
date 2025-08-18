'use client'

import { useState, useCallback } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDebounceState } from '@/hook/use-debounce-state'
import { IQuestion } from '@/services/questions/types'
import { getQuestion, postQuestion } from '@/services/questions'
import { questionSchema } from '../schema'

interface UseQuestionControllerReturn {
  openModal: boolean
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
  data: any
}

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
  const [openModal, setOpenModal] = useState(false)

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
      console.log('Submitting question:', data)
      mutate({
        ...data,
        response: data.response,
        name: data.name,
      })
    },
    [mutate],
  )

  const { data, error, isLoading } = useQuery({
    queryKey: ['questions', debounceSearch],
    queryFn: async () => {
      const response = await getQuestion({
        paginate: true,
        current_page: data?.pagination?.current_page,
        per_page: data?.pagination?.per_page,
        total: data?.pagination?.total,
        filter: { name: debounceSearch ?? '' },
      })

      return response
    },
    refetchOnWindowFocus: false,
    retry: 2,
  })

  return {
    openModal,
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
    data,
  }
}
