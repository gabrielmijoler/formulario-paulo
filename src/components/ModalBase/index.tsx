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
        <div className={`fixed z-[999] inset-0 overflow-y-auto`}>
          <div className={`flex items-center content-center min-h-screen`}>
            <div
              className={`
                ${height ? `h-${height}` : 'h-screen'}
                ${width ? `w-${width}` : 'w-20'}
                ${p ? `p-${p}` : 'p-0'}
                bg-white rounded-lg shadow-lg scale-100	duration-300
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
