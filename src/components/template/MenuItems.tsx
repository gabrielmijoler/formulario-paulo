import { useState } from 'react'
import Link from 'next/link'

import { IconChevrondown } from '../icons'

interface MenuItemsProps {
  url?: string
  texto: string
  icon: JSX.Element
  className?: string
  onClick?: () => void
  hasSubMenu?: boolean
  onClickIcon?: () => void
  subItems?: { title: string; url: string }[]
}

export default function MenuItems(props: MenuItemsProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const renderizarLink = () => (
    <span
      className={`
        flex float-left items-center
        dark:text-gray-200
        ${props.className}
      `}
    >
      {props.icon}
      <span className="text-xs/[14px] font-light flex-1 ml-3">
        {props.texto}
      </span>
    </span>
  )

  const handleIconClick = () => {
    setIsExpanded(!isExpanded)
    if (props.onClickIcon) {
      props.onClickIcon()
    }
  }

  return (
    <>
      <li
        onClick={handleIconClick}
        className="flex items-center cursor-pointer gap-x-4 p-2 hover:bg-purple-600 rounded-md"
      >
        {props.url ? (
          <Link href={props.url}>{renderizarLink()}</Link>
        ) : (
          renderizarLink()
        )}
        {props.hasSubMenu && (
          <IconChevrondown
            tamanho={1}
            className={`${isExpanded ? 'rotate-180' : ''} flex-1`}
          />
        )}
      </li>
      {isExpanded && props.hasSubMenu && (
        <ul>
          {props.subItems?.map((submenuItem, index) => (
            <li
              onClick={props.onClick}
              key={index}
              className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-purple-600 rounded-md"
            >
              <Link href={submenuItem.url}>{submenuItem.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
