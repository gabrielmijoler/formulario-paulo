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
    url: RoutesUrls.HOME,
    icon: IconCasa(),
    submenu: false,
    submenuItens: [],
  },
  {
    title: 'Cadastro',
    icon: DashBoard(),
    submenu: true,
    submenuItens: [
      { title: 'Paciente', url: RoutesUrls.PATIENT_URL },
      { title: 'Perguntas', url: RoutesUrls.QUESTION_URL },
      { title: 'Patologias', url: RoutesUrls.PATHOLIES_URL },
    ],
  },
  {
    title: 'Prontuário',
    icon: DashBoard(),
    submenu: true,
    submenuItens: [{ title: 'Prontuário', url: RoutesUrls.MEDICAL_RECORD_URL }],
  },
]
