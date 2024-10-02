import {
  IconAperture, IconCopy, IconEyeDollar, IconFileDollar, IconLayoutDashboard, IconLogin, IconMoodHappy, IconStar, IconTarget, IconTargetArrow, IconTypography, IconUser, IconUserPlus,
  IconUsers
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
    href: '/ui/shadow',
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
    subheader: 'Auth',
  },
  {
    id: uniqueId(),
    title: 'Login',
    icon: IconLogin,
    href: '/auth/login',
  },
  {
    id: uniqueId(),
    title: 'Register',
    icon: IconUserPlus,
    href: '/auth/register',
  },
  {
    navlabel: true,
    subheader: 'Extra',
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
