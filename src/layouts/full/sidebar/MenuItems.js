import {
  IconAperture, 
  IconCopy, 
  IconFileDollar, 
  IconLayoutDashboard, 
  IconMoodHappy, 
  IconStar, 
  IconTargetArrow, 
  IconUsers, 
  IconBuildingChurch, 
  IconScript, 
  IconArticle, 
  IconPencilStar, 
  IconFileAnalytics, 
  IconMapPin, 
  IconPackage, 
  IconChartArrowsVertical, 
  IconHeartHandshake,
  IconSchool,
  IconChalkboard,
  IconCalendarEvent,
  IconBooks
} from '@tabler/icons-react';

import { uniqueId } from 'lodash';

const razaoSocial = localStorage.getItem('razaoSocial'); 
const idCliente = localStorage.getItem('idCliente'); 
const nivelUsuario = parseInt(localStorage.getItem('nivelUsuario'), 10); // Convertendo para número

console.log("Nível usuário: " + nivelUsuario)

// Função para verificar se o usuário tem permissão de acordo com o nível
const canView = (requiredLevel) => nivelUsuario >= requiredLevel;
const canManage = (requiredLevel) => nivelUsuario >= requiredLevel;

// Definindo os itens do menu
const Menuitems = [
  {
    navlabel: true,
    subheader: 'Inicial',
  },
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },
  {
    navlabel: true,
    subheader: 'Gerenciamento',
  },
  canView(1) && {
    id: uniqueId(),
    title: 'Acervo Virtual',
    icon: IconBooks,
    href: '/livros',
    manage: canManage(3), // Somente pastores (3) e adms (4) podem gerenciar
  },
  canView(1) && {
    id: uniqueId(),
    title: 'Departamentos',
    icon: IconCopy,
    href: '/departaments',
    manage: canManage(3), // Somente pastores (3) e adms (4) podem gerenciar
  },
  canView(3) && {
    id: uniqueId(),
    title: 'Dízimos',
    icon: IconHeartHandshake,
    href: '/dizimos',
    manage: canManage(4), // Somente adms (4) podem gerenciar
  },
  canView(1) && {
    id: uniqueId(),
    title: 'EBD',
    icon: IconSchool,
    href: '/aulasEBD',
    manage: canManage(2), // Somente líderes (2), pastores (3) e adms (4) podem gerenciar
  },
  canView(1) && {
    id: uniqueId(),
    title: 'Eventos',
    icon: IconCalendarEvent,
    href: '/eventos',
    manage: canManage(2), // Somente líderes (2), pastores (3) e adms (4) podem gerenciar
  },
  canView(3) && {
    id: uniqueId(),
    title: 'Finanças',
    icon: IconFileDollar,
    href: '/financas',
    manage: canManage(3), // Somente pastores (3) e adms (4) podem ver e gerenciar
  },
  canView(1) && {
    id: uniqueId(),
    title: 'Missões',
    icon: IconTargetArrow,
    href: '/missoes',
    manage: canManage(3), // Somente pastores (3) e adms (4) podem gerenciar
  },
  canView(2) && {
    id: uniqueId(),
    title: 'Recursos',
    icon: IconStar,
    href: '/recursos',
    manage: canManage(2), // Somente líderes (2), pastores (3) e adms (4) podem ver e gerenciar
  },
  canView(1) && {
    id: uniqueId(),
    title: 'Relatórios',
    icon: IconFileAnalytics,
    href: '/relatorios',
  },
  canView(1) && {
    id: uniqueId(),
    title: 'Usuários',
    icon: IconUsers,
    href: '/users',
    manage: canManage(3), // Somente pastores (3) e adms (4) podem gerenciar
  },
  {
    navlabel: true,
    subheader: 'Cultos',
  },
  {
    id: uniqueId(),
    title: 'Histórico de Cultos',
    icon: IconBuildingChurch,
    href: '/ui/shadow',
  },
  {
    id: uniqueId(),
    title: 'Atas de Cultos',
    icon: IconScript,
    href: '/atas',
  },
  {
    navlabel: true,
    subheader: 'Blog',
  },
  {
    id: uniqueId(),
    title: 'Ver Blog',
    icon: IconArticle,
    href: 'https://pib-three.vercel.app/blog',
  },
  canView(3) && {
    id: uniqueId(),
    title: 'Posts',
    icon: IconPencilStar,
    href: '/posts',
  },
  {
    navlabel: true,
    subheader: 'Outros',
  },
  canView(2) && {
    id: uniqueId(),
    title: 'Locais',
    icon: IconMapPin,
    href: '/locais',
  },
  canView(2) && {
    id: uniqueId(),
    title: 'Classes de EBD',
    icon: IconChalkboard,
    href: '/classesEBD',
  },
  canView(2) && {
    id: uniqueId(),
    title: 'Tipo de Recurso',
    icon: IconPackage,
    href: '/tiposRecursos',
  },
  canView(4) && {
    id: uniqueId(),
    title: 'Níveis de Usuário',
    icon: IconChartArrowsVertical,
    href: '/nivelUsuario',
  },
  {
    id: uniqueId(),
    title: 'Icons',
    icon: IconMoodHappy,
    href: '/icons',
  },
  {
    id: uniqueId(),
    title: 'Sample Page',
    icon: IconAperture,
    href: '/sample-page',
  },
];

// Filtra os itens que foram marcados como falsos no filtro
const filteredMenuItems = Menuitems.filter(item => item !== false);

export default filteredMenuItems;
