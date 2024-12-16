'use client'

import { useEffect, useState } from "react"

interface Props {
  message: string
  type: 'warning' | 'error' | 'success' | 'info'
}

export const Toast = ({ message, type }: Props) => {
  const [showToast, setShowToast] = useState(false)
  const [messagem, setMessagem] = useState({ message: '', type: '' })

  useEffect(() => {
    if (message) {
      setMessagem({ message, type })
      setShowToast(true)
    }
  }, [message, type])

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false)
        setMessagem({ message: '', type: '' })
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [showToast])

  const getToastColor = (type: string) => {
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
            className={`flex items-center justify-end w-full h-full border border-white rounded-2xl min-h-20 ${getToastColor(messagem.type)}`}
          >
            <div className="flex items-center justify-center w-72 h-full">
              <span className="break-words w-full h-full text-center">
                {messagem.message}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
