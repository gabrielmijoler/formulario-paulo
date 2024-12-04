import { ReactNode } from 'react'

export interface ModalBaseProps {
  width?: string
  height?: string
  p?: string
  isOpen: boolean
  closeOnOutsideClick?: boolean
  children: ReactNode
  onClose?: () => void
}
