// import useAuth from "../../data/hook/useAuth"
'use client'

import { useState } from 'react'

import { useAppData } from '@/context'

import { IconSair } from '../icons'
import { MenuList } from '../SideBar/util'

import ButtonToggleTheme from './ButtonToggleTheme'
import Logo from './Logo'
import MenuItems from './MenuItems'

export default function Menu() {
  const { theme, changeTheme, Logout } = useAppData()

  const handleLogout = async () => {
    return await Logout()
  }

  return (
    <div
      className="
        flex flex-col py-2 z-50 text-white w-56
        bg-gradient-to-r from-indigo-500 to-purple-800 inset-0 overflow-auto fixed
      "
    >
      <div className="flex items-center justify-center mb-8">
        <Logo />
      </div>
      <ul className="flex-grow">
        {MenuList.map((menu) => (
          <MenuItems
            key={menu.title}
            url={menu.url}
            texto={menu.title}
            icon={menu.icon}
            hasSubMenu={menu.submenu}
            subItems={menu.submenuItens}
          />
        ))}
      </ul>
      <ul>
        <ButtonToggleTheme theme={theme} changeTheme={changeTheme} />
      </ul>
      <ul>
        <MenuItems
          texto="Sair"
          icon={IconSair()}
          onClickIcon={handleLogout}
          className="text-red-500 dark:text-red-500"
        />
      </ul>
    </div>
  )
}
