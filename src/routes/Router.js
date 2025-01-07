import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import PrivateRoute from './privateRoute';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */

// Dashboard
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')))
// Landing Page
const AlianceLandingPage = Loadable(lazy(() => import('../components/landing_page/index.js')));
// Usuários
const UserList = Loadable(lazy(() => import('../components/users/list')));
const UserCreate = Loadable(lazy(() => import('../components/users/create')));
// Departamentos
const DepartmentCreate = Loadable(lazy(() => import('../components/departamentos/create')));
const DepartmentList = Loadable(lazy(() => import('../components/departamentos/list')));
// Missões
const MissoesList = Loadable(lazy(() => import('../components/missoes/list')));
const MissoesCreate = Loadable(lazy(() => import('../components/missoes/create')))
// Recursos
const RecursosList = Loadable(lazy(() => import('../components/recursos/list')));
const RecursosCreate = Loadable(lazy(() => import('../components/recursos/create')));
// Tipos Recursos
const CriarTipoRecurso = Loadable(lazy(() => import('../components/tipo_recurso/create')));
const ListaTiposRecursos = Loadable(lazy(() => import('../components/tipo_recurso/list')));
// Eventos
const EventosCreate = Loadable(lazy(() => import('../components/eventos/create')));
// EBD
const EBDAulasList = Loadable(lazy(() => import('../components/aulas_ebd/list.js')));
const EBDClassesList = Loadable(lazy(() => import('../components/classes_ebd/list.js')));
const EBDClassesCreate = Loadable(lazy(() => import('../components/classes_ebd/create.js')));
const EBDAulaCreate = Loadable(lazy(() => import('../components/aulas_ebd/create.js')));
// Células
const CelulasList = Loadable(lazy(() => import('../components/celulas/list.js')));
const CelulasCreate = Loadable(lazy(() => import('../components/celulas/create.js')));
const CelulasPerfil = Loadable(lazy(() => import('../components/celulas/celulasPerfil.js')));
const CelulasMembros = Loadable(lazy(() => import('../components/celulas/membrosCelula.js')));
const AdicionarMembroCelula = Loadable(lazy(() => import('../components/celulas/adicionarMembroCelula.js')));
const EncontrosCelulasCreate = Loadable(lazy(() => import('../components/celulas/encontrosCelula.js')));
// Finanças
const EventosList = Loadable(lazy(() => import('../components/eventos/list.js')));
const Financas = Loadable(lazy(() => import('../components/financas/list.js')));
const CadastrarEntrada = Loadable(lazy(() => import('../components/financas/entradas_create.js')));
const CadastrarSaida = Loadable(lazy(() => import('../components/financas/saidas_create.js')));
// Dízimo
const CadastroDizimo = Loadable(lazy(() => import('../components/dizimos/create')));
const DizimoList = Loadable(lazy(() => import('../components/dizimos/list')));
// Relatórios
const UserReport = Loadable(lazy(() => import('../components/users/report.js')));
const DepartamentoReport = Loadable(lazy(() => import('../components/departamentos/report.js')));
const RecursoReport = Loadable(lazy(() => import('../components/recursos/report.js')));
const MissoesReport = Loadable(lazy(() => import('../components/missoes/report.js')));
const EBDAulaReport = Loadable(lazy(() => import('../components/aulas_ebd/report.js')));
const FinancasReport = Loadable(lazy(() => import('../components/financas/report.js')));
const EventoReport = Loadable(lazy(() => import('../components/eventos/report.js')));
const DizimosReport = Loadable(lazy(() => import('../components/dizimos/report.js')));
// Auth
const Register = Loadable(lazy(() => import('../views/authentication/Register'))); 
const Login = Loadable(lazy(() => import('../views/authentication/Login')));
const Payment = Loadable(lazy(() => import('../views/authentication/Payment3.js')));
// Livros
const CadastrarLivro = Loadable(lazy(() => import('../components/livros/create.js')));
const ListaLivros = Loadable(lazy(() => import('../components/livros/list.js')));
// Cultos
const CadastrarCulto = Loadable(lazy(() => import('../components/cultos/create.js')));
const ListaCultos = Loadable(lazy(() => import('../components/cultos/list.js')));
const CultoReport = Loadable(lazy(() => import('../components/cultos/report.js')));
// Escalas de Cultos
const CadastrarEscalaCulto = Loadable(lazy(() => import('../components/escalas-cultos/create.js')));
const ListaEscalasCultos = Loadable(lazy(() => import('../components/escalas-cultos/list.js')));
const ListaEscalasUsuario = Loadable(lazy(() => import('../components/escalas-cultos/escala_usuario.js')));
const EscalaCultoReport = Loadable(lazy(() => import('../components/escalas-cultos/report.js')));
// Posts
const PostList = Loadable(lazy(() => import('../components/posts/list')));
const PostCreate = Loadable(lazy(() => import('../components/posts/create')));
// Outros
const Settings = Loadable(lazy(() => import('../components/settings/index')));
const CriarLocal = Loadable(lazy(() => import('../components/locais/create')));
const ListaLocais = Loadable(lazy(() => import('../components/locais/list')));
const CriarNivelUsuario = Loadable(lazy(() => import('../components/niveis_usuarios/create')));
const ListaNivelUsuario = Loadable(lazy(() => import('../components/niveis_usuarios/list')));
const OnBoarding = Loadable(lazy(() => import('../components/onboarding/index.js')));
const AtasList = Loadable(lazy(() => import('../components/atas/index')));
const ReportIndex = Loadable(lazy(() => import('../components/reports/index')));

import SavePaymentMethodWrapper from '../views/authentication/Payment.js';
import TermsAndConditions from '../components/landing_page/termosECondicoes.js';

const SamplePage = Loadable(lazy(() => import('../views/sample-page/SamplePage')))
const Icons = Loadable(lazy(() => import('../views/icons/Icons')))
const TypographyPage = Loadable(lazy(() => import('../views/utilities/TypographyPage')))
const Shadow = Loadable(lazy(() => import('../views/utilities/Shadow')))
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const SemPermissao = Loadable(lazy(() => import('../views/authentication/SemPermissao')));
const ReportCreate = Loadable(lazy(() => import('../components/reports/create')));


const Router = [
   // Landing page fora das rotas autenticadas
   { path: '/', element: <AlianceLandingPage /> },

   { path: '/login', element: <Login /> },
   { path: '/cadastro', element: <Register /> },
   { path: '/pagamento', element: <SavePaymentMethodWrapper /> },
   { path: '/termos-e-condicoes', element: <TermsAndConditions /> },
   // Rotas autenticadas
   {
    path: '/dashboard',
    element: <FullLayout />,
    children: [

      // Dashboard
      { 
        path: '', 
        exact: true, 
        element: <PrivateRoute><Dashboard /></PrivateRoute> 
      },
    
      // Livros
      { 
        path: 'livros', 
        element: <PrivateRoute><ListaLivros /></PrivateRoute> 
      },
      { 
        path: 'livros/create', 
        element: <PrivateRoute><CadastrarLivro /></PrivateRoute> 
      },
      { 
        path: 'configuracoes', 
        element: <PrivateRoute><Settings /></PrivateRoute> 
      },
    
      // Departamentos
      { 
        path: 'departaments', 
        element: <PrivateRoute><DepartmentList /></PrivateRoute> 
      },
      { 
        path: 'departament/create', 
        element: <PrivateRoute><DepartmentCreate /></PrivateRoute> 
      },
      { 
        path: 'departament/create/:id', 
        element: <PrivateRoute><DepartmentCreate /></PrivateRoute> 
      },
    
      // Dízimos
      { 
        path: 'dizimos', 
        element: <PrivateRoute><DizimoList /></PrivateRoute> 
      },
      { 
        path: 'dizimos/create', 
        element: <PrivateRoute><CadastroDizimo /></PrivateRoute> 
      },
    
      // EBD (Aulas e Classes)
      { 
        path: 'aulasEBD', 
        element: <PrivateRoute><EBDAulasList /></PrivateRoute> 
      },
      { 
        path: 'aulasEBD/create', 
        element: <PrivateRoute><EBDAulaCreate /></PrivateRoute> 
      },
      { 
        path: 'classesEBD', 
        element: <PrivateRoute><EBDClassesList /></PrivateRoute> 
      },
      { 
        path: 'classesEBD/create', 
        element: <PrivateRoute><EBDClassesCreate /></PrivateRoute> 
      },
    
      // Eventos
      { 
        path: 'eventos', 
        element: <PrivateRoute><EventosList /></PrivateRoute> 
      },
      { 
        path: 'eventos/create', 
        element: <PrivateRoute><EventosCreate /></PrivateRoute> 
      },
      { 
        path: 'eventos/create/:eventId', 
        element: <PrivateRoute><EventosCreate /></PrivateRoute> 
      },
    
      // Finanças
      { 
        path: 'financas', 
        element: <PrivateRoute><Financas /></PrivateRoute> 
      },
      { 
        path: 'entradas/create', 
        element: <PrivateRoute><CadastrarEntrada /></PrivateRoute> 
      },
      { 
        path: 'saidas/create', 
        element: <PrivateRoute><CadastrarSaida /></PrivateRoute> 
      },
    
      // Missões
      { 
        path: 'missoes', 
        element: <PrivateRoute><MissoesList /></PrivateRoute> 
      },
      { 
        path: 'missoes/create', 
        element: <PrivateRoute><MissoesCreate /></PrivateRoute> 
      },
      { 
        path: 'missoes/create/:missaoId', 
        element: <PrivateRoute><MissoesCreate /></PrivateRoute> 
      },
    
      // Níveis de usuário
      { 
        path: 'nivelUsuario', 
        element: <PrivateRoute><ListaNivelUsuario /></PrivateRoute> 
      },
      { 
        path: 'nivelUsuario/create', 
        element: <PrivateRoute><CriarNivelUsuario /></PrivateRoute> 
      },
    
      // Tipos de Recursos
      { 
        path: 'tipoRecursos', 
        element: <PrivateRoute><ListaTiposRecursos /></PrivateRoute> 
      },
      { 
        path: 'tipoRecursos/create', 
        element: <PrivateRoute><CriarTipoRecurso /></PrivateRoute> 
      },
    
      // Posts
      { 
        path: 'posts', 
        element: <PrivateRoute><PostList /></PrivateRoute> 
      },
      { 
        path: 'posts/create', 
        element: <PrivateRoute><PostCreate /></PrivateRoute> 
      },
      { 
        path: 'posts/create/:id', 
        element: <PrivateRoute><PostCreate /></PrivateRoute> 
      },
    
      // Recursos
      { 
        path: 'recursos', 
        element: <PrivateRoute><RecursosList /></PrivateRoute> 
      },
      { 
        path: 'recursos/create', 
        element: <PrivateRoute><RecursosCreate /></PrivateRoute> 
      },
    
      // Usuários
      { 
        path: 'users', 
        element: <PrivateRoute><UserList /></PrivateRoute> 
      },
      { 
        path: 'user/create', 
        element: <PrivateRoute><UserCreate /></PrivateRoute> 
      },
      { 
        path: 'user/create/:userId', 
        element: <PrivateRoute><UserCreate /></PrivateRoute> 
      },
    
      // Células
      { 
        path: 'celulas',
        element: <PrivateRoute><CelulasList /></PrivateRoute>
      },
      { 
        path: 'membrosCelula/:idCelula', 
        element: <PrivateRoute><CelulasMembros /></PrivateRoute> 
      },
      { 
        path: 'membrosCelula/:idCelula/adicionar', 
        element: <PrivateRoute><AdicionarMembroCelula /></PrivateRoute> 
      },
      { 
        path: 'celulas/:id', 
        element: <PrivateRoute><CelulasPerfil /></PrivateRoute> 
      },
      { 
        path: 'celulas/create', 
        element: <PrivateRoute><CelulasCreate /></PrivateRoute> 
      },
      { 
        path: 'encontrosCelulas/create/:idCelula', 
        element: <PrivateRoute><EncontrosCelulasCreate /></PrivateRoute> 
      },
      { 
        path: 'encontrosCelulas/edit/:idEncontro', 
        element: <PrivateRoute><EncontrosCelulasCreate /></PrivateRoute> 
      },

      { 
        path: 'cultos', 
        element: <PrivateRoute><ListaCultos /></PrivateRoute> 
      },
      { 
        path: 'cultos/create', 
        element: <PrivateRoute><CadastrarCulto /></PrivateRoute> 
      },
      { 
        path: 'escalas-cultos', 
        element: <PrivateRoute><ListaEscalasCultos /></PrivateRoute> 
      },
      { 
        path: 'escalas-cultos/create', 
        element: <PrivateRoute><CadastrarEscalaCulto /></PrivateRoute> 
      },
      { 
        path: 'escalas-cultos/usuario', 
        element: <PrivateRoute><ListaEscalasUsuario /></PrivateRoute> 
      },

      // Outros
      { path: 'locais', exact: true, element: <PrivateRoute ><ListaLocais /></PrivateRoute> },
      { path: 'locais/create', exact: true, element: <PrivateRoute ><CriarLocal /></PrivateRoute> },
      { path: 'sample-page', exact: true, element: <PrivateRoute ><SamplePage /></PrivateRoute> },
      { path: 'icons', exact: true, element: <PrivateRoute ><Icons /></PrivateRoute> },
      { path: 'ui/typography', exact: true, element: <PrivateRoute ><TypographyPage /></PrivateRoute> },
      { path: 'ui/shadow', exact: true, element: <PrivateRoute ><Shadow /></PrivateRoute> },
      { path: '*', element: <Navigate to="/auth/404" /> },
      
      
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '500', element: <SemPermissao /> },
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
      { path: '/relatorio/financas', element: <PrivateRoute ><FinancasReport /></PrivateRoute> },
      { path: '/relatorio/eventos', element: <PrivateRoute ><EventoReport /></PrivateRoute> },
      { path: '/relatorio/ebd', element: <PrivateRoute ><EBDAulaReport /></PrivateRoute> },
      { path: '/relatorio/dizimos', element: <PrivateRoute ><DizimosReport /></PrivateRoute> },
      { path: '/relatorio/cultos', element: <PrivateRoute ><CultoReport /></PrivateRoute> },
      { path: '/relatorio/escala-culto', element: <PrivateRoute ><EscalaCultoReport /></PrivateRoute> },
    ],
  },
];


export default Router;