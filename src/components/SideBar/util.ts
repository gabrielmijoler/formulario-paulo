import { RoutesUrls } from '@/routes'
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
      { title: 'Paciente', url: RoutesUrls.PATHOLIES_URL },
      { title: 'Perguntas', url: RoutesUrls.PATIENT_URL },
      { title: 'Patologias', url: RoutesUrls.QUESTION_URL },
    ],
  },
  {
    title: 'Prontuário',
    icon: DashBoard(),
    submenu: true,
    submenuItens: [{ title: 'Perguntas', url: RoutesUrls.MEDICAL_RECORD_URL }],
  },
]
