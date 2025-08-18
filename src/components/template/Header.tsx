'use client'

import { useState } from 'react'

import { IconBar } from '../icons'
import { ModalBase } from '../ModalBase'

import SideBar from './SideBar'

interface HeaderProps {
  onToggleSidebar: (isOpen: boolean) => void
}

export function Header({ onToggleSidebar }: Readonly<HeaderProps>) {
  const [isOpen, setIsOpen] = useState(false)

  const handleModalVisibility = () => {
    const newState = !isOpen
    setIsOpen(newState)
    onToggleSidebar(newState)
  }

  return (
    <div className={`flex`}>
      <div className={`flex flex-grow justify-start items-center`}>
        <button
          type="button"
          onClick={handleModalVisibility}
          className={`
            flex flex-col justify-center items-center
            dark:text-gray-200 mr-2 cursor-pointer
            bg-transparent border-none p-0
            `}
          aria-label="Open sidebar"
        >
          {IconBar()}
        </button>
        <ModalBase
          isOpen={isOpen}
          closeOnOutsideClick
          onClose={handleModalVisibility}
          bgOpacity={false}
        >
          <SideBar />
        </ModalBase>
      </div>
    </div>
  )
}
