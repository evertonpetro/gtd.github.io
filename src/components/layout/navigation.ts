import {
  Archive,
  BookOpen,
  BookOpenCheck,
  CalendarClock,
  Clock,
  FolderKanban,
  History,
  Inbox,
  ListTodo,
  Settings,
  Star,
  Trash2,
  type LucideIcon,
} from 'lucide-react'

export interface NavItem {
  to: string
  label: string
  icon: LucideIcon
}

export const PRIMARY_NAV_ITEMS: NavItem[] = [
  { to: '/inbox', label: 'Entrada', icon: Inbox },
  { to: '/next', label: 'Próximas', icon: ListTodo },
  { to: '/focus', label: 'Foco', icon: Star },
  { to: '/projects', label: 'Projetos', icon: FolderKanban },
]

export const SECONDARY_NAV_ITEMS: NavItem[] = [
  { to: '/waiting', label: 'Aguardando', icon: Clock },
  { to: '/scheduled', label: 'Agendadas', icon: CalendarClock },
  { to: '/someday', label: 'Algum Dia', icon: Archive },
  { to: '/reference', label: 'Referência', icon: BookOpen },
  { to: '/manual', label: 'Manual GTD', icon: BookOpenCheck },
  { to: '/logbook', label: 'Registro', icon: History },
  { to: '/trash', label: 'Lixeira', icon: Trash2 },
  { to: '/settings', label: 'Configurações', icon: Settings },
]

export const NAV_ITEMS: NavItem[] = [...PRIMARY_NAV_ITEMS, ...SECONDARY_NAV_ITEMS]
