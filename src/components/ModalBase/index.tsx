import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

import { ModalBaseProps } from './types'

export function ModalBase({
  isOpen,
  closeOnOutsideClick = false,
  children,
  width,
  height,
  onClose,
  className,
  bgOpacity,
  p,
}: ModalBaseProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnOutsideClick) {
        onClose?.()
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        closeOnOutsideClick &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose?.()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey)
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('keydown', handleEscapeKey)
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [closeOnOutsideClick, isOpen, onClose])

  return isOpen
    ? createPortal(
        <div
          className={`fixed z-[999] inset-0 overflow-y-auto ${bgOpacity && 'bg-black bg-opacity-50'}`}
        >
          <div
            className={`flex items-center flex-col justify-center min-h-screen`}
          >
            <div
              className={`
                ${height ? `${height}` : 'h-auto'}
                ${width ? `${width}` : 'w-20'}
                ${p ? `p-${p}` : 'p-0'}
                bg-white rounded-lg
                ${className}
              `}
              ref={modalRef}
            >
              {children}
            </div>
          </div>
        </div>,
        document.body,
      )
    : null
}
