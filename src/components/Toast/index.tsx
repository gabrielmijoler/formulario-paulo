import { useEffect, useState } from 'react'

interface Props {
  item: {
    message: string
    type: 'warning' | 'error' | 'success' | 'info' | string
  }
}

export const Toast = ({ item }: Props) => {
  const [showToast, setShowToast] = useState(false)
  const [message, setMessage] = useState({ message: '', type: '' })

  useEffect(() => {
    if (showToast) {
      setTimeout(() => {
        setShowToast(false)
        setMessage({ message: '', type: '' })
      }, 3000)
    }
  }, [showToast])

  useEffect(() => {
    if (item.message) {
      setMessage(item)
      setShowToast(true)
    }
  }, [item])

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
            className={`flex items-center justify-end w-full h-full border border-white rounded-2xl min-h-20 ${getToastColor(message.type)}`}
          >
            <div className="flex items-center justify-center w-72 h-full">
              <span className="break-words w-full h-full text-center">
                {message.message}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
