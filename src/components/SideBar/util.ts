import { DashBoard, IconCasa } from '../icons'

export type MenuItem = {
  title: string
  url: string
}
interface Menu {
  title: string
  url?: string
  icon: JSX.Element
  submenu: boolean
  submenuItens: { title: string; url: string }[]
}

export const MenuList: Menu[] = [
  {
    title: 'Home',
    url: '/home',
    icon: IconCasa(),
    submenu: false,
    submenuItens: [],
  },
  {
    title: 'Cadastro',
    icon: DashBoard(),
    submenu: true,
    submenuItens: [
      { title: 'Paciente', url: '/cadastro/paciente' },
      { title: 'Perguntas', url: '/cadastro/perguntas' },
      { title: 'Patologias', url: '/cadastro/patologias' },
    ],
  },
  {
    title: 'Prontuário',
    icon: DashBoard(),
    submenu: true,
    submenuItens: [{ title: 'Perguntas', url: '/prontuario' }],
  },
]
