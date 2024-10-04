import {
  IconAperture, IconCopy, IconEyeDollar, IconFileDollar, IconLayoutDashboard, IconLogin, IconMoodHappy, IconStar, IconTarget, IconTargetArrow, IconTypography, IconUser, IconUserPlus,
  IconUsers, IconBuildingChurch, IconScript, IconArticle, IconPencilStar, IconFileAnalytics
} from '@tabler/icons-react';

import { uniqueId } from 'lodash';



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
    allowedLevels: [1, 2, 3, 4], // Permitido para níveis 3 e 4
  },
  {
    navlabel: true,
    subheader: 'Gerenciamento',
    allowedLevels: [2, 3, 4],
  },
  {
    id: uniqueId(),
    title: 'Usuários',
    icon: IconUsers,
    href: '/users',
    allowedLevels: [3, 4], // Permitido para níveis 3 e 4
  },
  {
    id: uniqueId(),
    title: 'Departamentos',
    icon: IconCopy,
    href: '/departaments',
    allowedLevels: [2, 3, 4], // Permitido para níveis 3 e 4
  },
  {
    id: uniqueId(),
    title: 'Missões',
    icon: IconTargetArrow,
    href: '/missoes',
    allowedLevels: [2, 3, 4], // Permitido para níveis 3 e 4
  },
  {
    id: uniqueId(),
    title: 'Recursos',
    icon: IconStar,
    href: '/recursos',
    allowedLevels: [3, 4], // Permitido para níveis 3 e 4
  },
  {
    id: uniqueId(),
    title: 'Finanças',
    icon: IconFileDollar,
    href: '/financas',
    allowedLevels: [3, 4], // Permitido para níveis 3 e 4
  },
  {
    id: uniqueId(),
    title: 'Relatórios',
    icon: IconFileAnalytics,
    href: '/financas',
    allowedLevels: [3, 4], // Permitido para níveis 3 e 4
  },
  
  {
    navlabel: true,
    subheader: 'Cultos',
    allowedLevels: [2, 3, 4],
  },
  {
    id: uniqueId(),
    title: 'Histórico de Cultos',
    icon: IconBuildingChurch,
    href: '/ui/shadow',
    allowedLevels: [2, 3, 4], // Permitido para níveis 3 e 4
  },
  {
    id: uniqueId(),
    title: 'Atas de Cultos',
    icon: IconScript,
    href: '/ui/shadow',
    allowedLevels: [3, 4], // Permitido para níveis 3 e 4
  },
  {
    navlabel: true,
    subheader: 'Blog',
    allowedLevels: [1, 2, 3, 4],
  },
  {
    id: uniqueId(),
    title: 'Ver Blog',
    icon: IconArticle,
    href: 'https://pib-three.vercel.app/blog',
    allowedLevels: [1, 2, 3, 4], // Permitido para níveis 3 e 4
  },
  {
    id: uniqueId(),
    title: 'Posts',
    icon: IconPencilStar,
    href: '/posts',
    allowedLevels: [1, 2, 3, 4], // Permitido para níveis 3 e 4
  },
  {
    navlabel: true,
    subheader: 'Outros',
  },
  {
    id: uniqueId(),
    title: 'Icons',
    icon: IconMoodHappy,
    href: '/icons',
    allowedLevels: [2, 3, 4], // Permitido para níveis 3 e 4
  },
  {
    id: uniqueId(),
    title: 'Sample Page',
    icon: IconAperture,
    href: '/sample-page',
    allowedLevels: [2, 3, 4], // Permitido para níveis 3 e 4
  },
];

export default Menuitems;
