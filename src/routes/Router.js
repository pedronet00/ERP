import React from 'react';
import { Navigate } from 'react-router-dom';
import PrivateRoute from './privateRoute';

/* ***Layouts**** */
import FullLayout from '../layouts/full/FullLayout';
import BlankLayout from '../layouts/blank/BlankLayout';

/* ****Pages***** */
import Dashboard from '../views/dashboard/Dashboard';
import SamplePage from '../views/sample-page/SamplePage';
import Icons from '../views/icons/Icons';
import TypographyPage from '../views/utilities/TypographyPage';
import Shadow from '../views/utilities/Shadow';
import Error from '../views/authentication/Error';
import Register from '../views/authentication/Register';
import Login from '../views/authentication/Login';
import UserCreate from '../components/users/create';
import DepartmentCreate from '../components/departamentos/create';
import UserList from '../components/users/list';
import DepartmentList from '../components/departamentos/list';
import MissoesList from '../components/missoes/list';

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <PrivateRoute><Navigate to="/dashboard" /></PrivateRoute> },
      { path: '/dashboard', exact: true, element: <PrivateRoute><Dashboard /></PrivateRoute> },
      { path: '/sample-page', exact: true, element: <PrivateRoute><SamplePage /></PrivateRoute> },
      { path: '/icons', exact: true, element: <PrivateRoute><Icons /></PrivateRoute> },
      { path: '/ui/typography', exact: true, element: <PrivateRoute><TypographyPage /></PrivateRoute> },
      { path: '/ui/shadow', exact: true, element: <PrivateRoute><Shadow /></PrivateRoute> },
      { path: '*', element: <Navigate to="/auth/404" /> },
      { path: '/user/create', element: <PrivateRoute><UserCreate /></PrivateRoute> },
      { path: '/users', element: <PrivateRoute><UserList /></PrivateRoute> },
      { path: '/departaments', element: <PrivateRoute><DepartmentList /></PrivateRoute> },
      { path: '/departament/create', element: <PrivateRoute><DepartmentCreate /></PrivateRoute> },
      { path: '/missoes', element: <PrivateRoute><MissoesList /></PrivateRoute> },
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
];

export default Router;
