// components/ActionButton.tsx
import React from 'react'
import clsx from 'clsx'

interface ActionButtonProps {
  onClick?: () => void
  type?: 'button' | 'submit'
  variant?: 'primary' | 'secondary' | 'conditional'
  disabled?: boolean
  condition?: boolean
  className?: string
  children: React.ReactNode
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  condition,
  className,
  children,
}) => {
  const baseClasses =
    'px-4 py-3 rounded-lg transition-colors duration-200 font-medium'

  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-amber-500 hover:bg-amber-600 text-black',
    conditional: condition
      ? 'bg-blue-500 text-white'
      : 'bg-gray-200 text-gray-600',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        baseClasses,
        variantClasses[variant],
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
    >
      {children}
    </button>
  )
}
