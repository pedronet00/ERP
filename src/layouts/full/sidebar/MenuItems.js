import {
  IconAperture, IconCopy, IconEyeDollar, IconFileDollar, IconLayoutDashboard, IconLogin, IconMoodHappy, IconStar, IconTarget, IconTargetArrow, IconTypography, IconUser, IconUserPlus,
  IconUsers, IconBuildingChurch, IconScript, IconArticle, IconPencilStar
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
  },
  {
    navlabel: true,
    subheader: 'Gerenciamento',
  },
  {
    id: uniqueId(),
    title: 'Usuários',
    icon: IconUsers,
    href: '/users',
  },
  {
    id: uniqueId(),
    title: 'Departamentos',
    icon: IconCopy,
    href: '/departaments',
  },
  {
    id: uniqueId(),
    title: 'Missões',
    icon: IconTargetArrow,
    href: '/missoes',
  },
  {
    id: uniqueId(),
    title: 'Recursos',
    icon: IconStar,
    href: '/ui/shadow',
  },
  {
    id: uniqueId(),
    title: 'Finanças',
    icon: IconFileDollar,
    href: '/ui/shadow',
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
    href: '/ui/shadow',
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
  {
    id: uniqueId(),
    title: 'Posts',
    icon: IconPencilStar,
    href: '/posts',
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
  },
  {
    id: uniqueId(),
    title: 'Sample Page',
    icon: IconAperture,
    href: '/sample-page',
  },
];

export default Menuitems;
