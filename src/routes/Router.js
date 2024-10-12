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
const ReportCreate = Loadable(lazy(() => import('../components/reports/create')));
const AtasList = Loadable(lazy(() => import('../components/atas/index')));
const EventosCreate = Loadable(lazy(() => import('../components/eventos/create')));
const CadastroDizimo = Loadable(lazy(() => import('../components/dizimos/create')));
const DizimoList = Loadable(lazy(() => import('../components/dizimos/list')));
const CriarLocal = Loadable(lazy(() => import('../components/locais/create')));
const ListaLocais = Loadable(lazy(() => import('../components/locais/list')));
const CriarTipoRecurso = Loadable(lazy(() => import('../components/tipo_recurso/create')));
const ListaTiposRecursos = Loadable(lazy(() => import('../components/tipo_recurso/list')));
const CriarNivelUsuario = Loadable(lazy(() => import('../components/niveis_usuarios/create')));
const ListaNivelUsuario = Loadable(lazy(() => import('../components/niveis_usuarios/list')));
const UserReport = Loadable(lazy(() => import('../components/users/report.js')));
const DepartamentoReport = Loadable(lazy(() => import('../components/departamentos/report.js')));
const MissoesReport = Loadable(lazy(() => import('../components/missoes/report.js')));
const RecursoReport = Loadable(lazy(() => import('../components/recursos/report.js')));
const EBDAulasList = Loadable(lazy(() => import('../components/aulas_ebd/list.js')));
const EBDClassesList = Loadable(lazy(() => import('../components/classes_ebd/list.js')));
const EBDClassesCreate = Loadable(lazy(() => import('../components/classes_ebd/create.js')));
const EBDAulaCreate = Loadable(lazy(() => import('../components/aulas_ebd/create.js')));
const CadastrarLivro = Loadable(lazy(() => import('../components/livros/create.js')));
const ListaLivros = Loadable(lazy(() => import('../components/livros/list.js')));
const EventosList = Loadable(lazy(() => import('../components/eventos/list.js')));
const Financas = Loadable(lazy(() => import('../components/financas/list.js')));
const CadastrarEntrada = Loadable(lazy(() => import('../components/financas/entradas_create.js')));
const CadastrarSaida = Loadable(lazy(() => import('../components/financas/saidas_create.js')));


const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [

      // Dashboard
      { path: '/', element: <PrivateRoute><Navigate to="/dashboard" /></PrivateRoute> },
      { path: '/dashboard', exact: true, element: <PrivateRoute ><Dashboard /></PrivateRoute> },

      // Finanças
      { path: '/financas', element: <PrivateRoute ><Financas /></PrivateRoute> },
      { path: '/entradas/create', element: <PrivateRoute ><CadastrarEntrada /></PrivateRoute> },
      { path: '/saidas/create', element: <PrivateRoute ><CadastrarSaida /></PrivateRoute> },

      // Livros
      { path: '/livros/create', element: <PrivateRoute ><CadastrarLivro /></PrivateRoute> },
      { path: '/livros', element: <PrivateRoute ><ListaLivros /></PrivateRoute> },

      // Aulas da EBD
      { path: '/aulasEBD', element: <PrivateRoute ><EBDAulasList /></PrivateRoute> },
      { path: '/aulasEBD/create', element: <PrivateRoute ><EBDAulaCreate /></PrivateRoute> },

      // Classes da EBD
      { path: '/classesEBD', element: <PrivateRoute ><EBDClassesList /></PrivateRoute> },
      { path: '/classesEBD/create', element: <PrivateRoute ><EBDClassesCreate /></PrivateRoute> },

      // Usuários
      { path: '/users', element: <PrivateRoute ><UserList /></PrivateRoute> },
      { path: '/user/create', element: <PrivateRoute ><UserCreate /></PrivateRoute> },
      { path: '/user/edit/:userId', element: <PrivateRoute ><UserCreate /></PrivateRoute> },

      // Departamentos
      { path: '/departaments', element: <PrivateRoute ><DepartmentList /></PrivateRoute> },
      { path: '/departament/create', element: <PrivateRoute ><DepartmentCreate /></PrivateRoute> },
      { path: '/departament/edit/:departmentId', element: <PrivateRoute ><DepartmentCreate /></PrivateRoute> },

      // Missões
      { path: '/missoes', element: <PrivateRoute ><MissoesList /></PrivateRoute> },
      { path: '/missoes/create', element: <PrivateRoute ><MissoesCreate /></PrivateRoute> },
      { path: '/missoes/edit/:missaoId', element: <PrivateRoute ><MissoesCreate /></PrivateRoute> },

      // Recursos
      { path: '/recursos', element: <PrivateRoute ><RecursosList /></PrivateRoute> },
      { path: '/recursos/create', element: <PrivateRoute ><RecursosCreate /></PrivateRoute> },

      // Eventos
      { path: '/eventos', element: <PrivateRoute ><EventosList /></PrivateRoute> },
      { path: '/eventos/create', element: <PrivateRoute ><EventosCreate /></PrivateRoute> },
      { path: '/eventos/edit/:eventId', element: <PrivateRoute ><EventosCreate /></PrivateRoute> },

      // Dízimos
      { path: '/dizimos/create', element: <PrivateRoute ><CadastroDizimo /></PrivateRoute> },
      { path: '/dizimos/edit/:id', element: <PrivateRoute ><CadastroDizimo /></PrivateRoute> },
      { path: '/dizimos', element: <PrivateRoute ><DizimoList /></PrivateRoute> },

      // Locais
      { path: '/locais/create', element: <PrivateRoute ><CriarLocal /></PrivateRoute> },
      { path: '/locais', element: <PrivateRoute ><ListaLocais /></PrivateRoute> },

      // Tipos de recursos
      { path: '/tipoRecursos/create', element: <PrivateRoute ><CriarTipoRecurso /></PrivateRoute> },
      { path: '/tiposRecursos', element: <PrivateRoute ><ListaTiposRecursos /></PrivateRoute> },

      // Nível de usuário
      { path: '/nivelUsuario/create', element: <PrivateRoute ><CriarNivelUsuario /></PrivateRoute> },
      { path: '/nivelUsuario', element: <PrivateRoute ><ListaNivelUsuario /></PrivateRoute> },

      // Settings
      { path: '/settings', element: <PrivateRoute ><Settings /></PrivateRoute> },

      // Posts
      { path: '/posts', element: <PrivateRoute ><PostList /></PrivateRoute> },

      // Atas
      { path: '/atas', element: <PrivateRoute ><AtasList /></PrivateRoute> },

      // Relatórios
      { path: '/relatorios', element: <PrivateRoute ><ReportCreate /></PrivateRoute> },

      // Outros
      { path: '/sample-page', exact: true, element: <PrivateRoute ><SamplePage /></PrivateRoute> },
      { path: '/icons', exact: true, element: <PrivateRoute ><Icons /></PrivateRoute> },
      { path: '/ui/typography', exact: true, element: <PrivateRoute ><TypographyPage /></PrivateRoute> },
      { path: '/ui/shadow', exact: true, element: <PrivateRoute ><Shadow /></PrivateRoute> },
      { path: '*', element: <Navigate to="/auth/404" /> },
      
      
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
      { path: '/relatorio/usuarios', element: <PrivateRoute ><UserReport /></PrivateRoute> },
      { path: '/relatorio/departamentos', element: <PrivateRoute ><DepartamentoReport /></PrivateRoute> },
      { path: '/relatorio/missoes', element: <PrivateRoute ><MissoesReport /></PrivateRoute> },
      { path: '/relatorio/recursos', element: <PrivateRoute ><RecursoReport /></PrivateRoute> },
    ],
  },
];


export default Router;