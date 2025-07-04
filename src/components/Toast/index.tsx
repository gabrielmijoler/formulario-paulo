"use client"
import { useEffect, useState } from 'react'
import { useAppData } from '@/context'

export const Toast = () => {
  const { toast } = useAppData()
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    if (toast?.message) {
      setShowToast(true)
      const timer = setTimeout(() => {
        setShowToast(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  const getToastColor = (type: string | undefined) => {
    switch (type) {
      case 'success':
        return 'bg-green-500'
      case 'error':
        return 'bg-red-500'
      case 'warning':
        return 'bg-yellow-500'
      case 'info':
        return 'bg-blue-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <>
      {showToast && (
        <div className="absolute z-50 top-10 right-8 p-2">
          <div
            className={`flex items-center justify-end w-full h-full border border-white rounded-2xl min-h-20 ${getToastColor(toast?.type)}`}
          >
            <div className="flex items-center justify-center w-72 h-full">
              <span className="break-words w-full h-full text-center">
                {toast?.message}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
