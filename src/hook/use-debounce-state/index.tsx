'use client'
import { SetStateAction, useEffect, useRef, useState } from 'react'

export type DispatchDebounce<T> = (
  value: SetStateAction<T>,
  options?: { immediate?: boolean },
) => void

export function useDebounceState<T = any>(defaultValue: T, wait = 500) {
  const [value, setValue] = useState(defaultValue)
  const [debouncedValue, setDebouncedValue] = useState(defaultValue)
  const timeoutRef = useRef<number | undefined>()

  const clearTimeout = () => window.clearTimeout(timeoutRef.current)

  const debounceChange = (newValue: SetStateAction<T>) => {
    setValue(newValue)
    clearTimeout()
    timeoutRef.current = window.setTimeout(() => {
      setDebouncedValue(newValue)
    }, wait)
  }

  const immediateChange = (newValue: SetStateAction<T>) => {
    setValue(newValue)
    setDebouncedValue(newValue)
  }

  const debouncedSetValue: DispatchDebounce<T> = (
    value: SetStateAction<T>,
    options,
  ) => {
    if (options?.immediate) immediateChange(value)
    else debounceChange(value)
  }

  useEffect(() => clearTimeout(), [])

  return [debouncedValue, value, debouncedSetValue] as const
}
