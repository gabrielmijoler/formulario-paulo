'use client'

import { useState } from 'react'

import { IconBar } from '../icons'
import { ModalBase } from '../ModalBase'

import SideBar from './SideBar'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const handleModalVisibility = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={`flex`}>
      <div className={`flex flex-grow justify-start items-center`}>
        <span
          onClick={handleModalVisibility}
          className={`
            flex flex-col justify-center items-center
            dark:text-gray-200 mr-2 cursor-pointer
            `}
        >
          {IconBar()}
        </span>
        <ModalBase
          isOpen={isOpen}
          closeOnOutsideClick
          onClose={handleModalVisibility}
        >
          <SideBar />
        </ModalBase>
      </div>
    </div>
  )
}
