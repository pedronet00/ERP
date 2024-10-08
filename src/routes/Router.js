import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import PrivateRoute from './privateRoute';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')))
const SamplePage = Loadable(lazy(() => import('../views/sample-page/SamplePage')))
const Icons = Loadable(lazy(() => import('../views/icons/Icons')))
const TypographyPage = Loadable(lazy(() => import('../views/utilities/TypographyPage')))
const Shadow = Loadable(lazy(() => import('../views/utilities/Shadow')))
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register'))); 
const Login = Loadable(lazy(() => import('../views/authentication/Login')));
const UserCreate = Loadable(lazy(() => import('../components/users/create')));
const DepartmentCreate = Loadable(lazy(() => import('../components/departamentos/create')));
const UserList = Loadable(lazy(() => import('../components/users/list')));
const DepartmentList = Loadable(lazy(() => import('../components/departamentos/list')));
const MissoesList = Loadable(lazy(() => import('../components/missoes/list')));
const MissoesCreate = Loadable(lazy(() => import('../components/missoes/create')));
const PostList = Loadable(lazy(() => import('../components/posts/list')));
const Settings = Loadable(lazy(() => import('../components/settings/index')));
const RecursosList = Loadable(lazy(() => import('../components/recursos/list')));
const RecursosCreate = Loadable(lazy(() => import('../components/recursos/create')));
const ReportIndex = Loadable(lazy(() => import('../components/reports/index')));
const AtasList = Loadable(lazy(() => import('../components/atas/index')));
const EventosCreate = Loadable(lazy(() => import('../components/eventos/create')));


const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <PrivateRoute><Navigate to="/dashboard" /></PrivateRoute> },
      { path: '/dashboard', exact: true, element: <PrivateRoute requiredLevel={1}><Dashboard /></PrivateRoute> },
      { path: '/sample-page', exact: true, element: <PrivateRoute requiredLevel={3}><SamplePage /></PrivateRoute> },
      { path: '/icons', exact: true, element: <PrivateRoute requiredLevel={3}><Icons /></PrivateRoute> },
      { path: '/ui/typography', exact: true, element: <PrivateRoute requiredLevel={3}><TypographyPage /></PrivateRoute> },
      { path: '/ui/shadow', exact: true, element: <PrivateRoute requiredLevel={3}><Shadow /></PrivateRoute> },
      { path: '*', element: <Navigate to="/auth/404" /> },
      { path: '/user/create', element: <PrivateRoute requiredLevel={4}><UserCreate /></PrivateRoute> },
      { path: '/user/edit/:userId', element: <PrivateRoute requiredLevel={4}><UserCreate /></PrivateRoute> },
      { path: '/users', element: <PrivateRoute requiredLevel={3}><UserList /></PrivateRoute> },
      { path: '/departaments', element: <PrivateRoute requiredLevel={2}><DepartmentList /></PrivateRoute> },
      { path: '/departament/create', element: <PrivateRoute requiredLevel={4}><DepartmentCreate /></PrivateRoute> },
      { path: '/departament/edit/:departmentId', element: <PrivateRoute requiredLevel={4}><DepartmentCreate /></PrivateRoute> },
      { path: '/missoes', element: <PrivateRoute requiredLevel={2}><MissoesList /></PrivateRoute> },
      { path: '/missoes/create', element: <PrivateRoute requiredLevel={4}><MissoesCreate /></PrivateRoute> },
      { path: '/missoes/edit/:missaoId', element: <PrivateRoute requiredLevel={4}><MissoesCreate /></PrivateRoute> },
      { path: '/posts', element: <PrivateRoute requiredLevel={1}><PostList /></PrivateRoute> },
      { path: '/settings', element: <PrivateRoute requiredLevel={1}><Settings /></PrivateRoute> },
      { path: '/recursos', element: <PrivateRoute requiredLevel={1}><RecursosList /></PrivateRoute> },
      { path: '/recursos/create', element: <PrivateRoute requiredLevel={1}><RecursosCreate /></PrivateRoute> },
      { path: '/atas', element: <PrivateRoute requiredLevel={1}><AtasList /></PrivateRoute> },
      { path: '/eventos/create', element: <PrivateRoute requiredLevel={1}><EventosCreate /></PrivateRoute> },
      { path: '/eventos/edit/:eventId', element: <PrivateRoute requiredLevel={1}><EventosCreate /></PrivateRoute> },
      
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/relatorio',
    element: <BlankLayout />,
    children: [
      { path: '/relatorio', element: <PrivateRoute requiredLevel={1}><ReportIndex /></PrivateRoute> },
    ],
  },
];


export default Router;