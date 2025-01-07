import { useState, useEffect } from 'react';
import { uniqueId } from 'lodash';
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
  IconBooks,
  IconHeart
} from '@tabler/icons-react';

const useMenuItems = (perfil) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPerfilFuncao = async (perfil) => {
    try {
      const response = await fetch(`http://localhost:8000/api/perfis-funcoes/${perfil}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar os dados');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro na requisição:', error);
      return []; // Retorna um array vazio em caso de erro
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await fetchPerfilFuncao(perfil);
      setData(fetchedData);
      setLoading(false); // Finaliza o carregamento
    };

    fetchData();
  }, [perfil]);

  const permissaoListagemCelulas = data.find(permissao => permissao.idFuncao === 17)?.permissao;
  const permissaoListagemDepartamentos = data.find(permissao => permissao.idFuncao === 18)?.permissao;
  const permissaoListagemEventos = data.find(permissao => permissao.idFuncao === 19)?.permissao;
  const permissaoListagemMissoes = data.find(permissao => permissao.idFuncao === 20)?.permissao;
  const permissaoListagemSalasEBD = data.find(permissao => permissao.idFuncao === 21)?.permissao;
  const permissaoListagemAulasEBD = data.find(permissao => permissao.idFuncao === 22)?.permissao;
  const permissaoListagemLocais = data.find(permissao => permissao.idFuncao === 23)?.permissao;
  const permissaoListagemCategoriasRecursos = data.find(permissao => permissao.idFuncao === 24)?.permissao;
  const permissaoListagemTiposRecursos = data.find(permissao => permissao.idFuncao === 25)?.permissao;
  const permissaoListagemUsuarios = data.find(permissao => permissao.idFuncao === 26)?.permissao;
  const permissaoListagemEncontrosCelulas = data.find(permissao => permissao.idFuncao === 27)?.permissao;
  const permissaoListagemMembrosCelulas = data.find(permissao => permissao.idFuncao === 28)?.permissao;
  const permissaoListagemEntradas = data.find(permissao => permissao.idFuncao === 29)?.permissao;
  const permissaoListagemSaidas = data.find(permissao => permissao.idFuncao === 30)?.permissao;
  const permissaoListagemRecursos = data.find(permissao => permissao.idFuncao === 31)?.permissao;
  const permissaoListagemDizimos = data.find(permissao => permissao.idFuncao === 32)?.permissao;
  const permissaoListagemFinancas = data.find(permissao => permissao.idFuncao === 40)?.permissao;

  const Menuitems = [
    {
      navlabel: true,
      subheader: 'Inicial',
    },
    {
      id: uniqueId(),
      title: 'Dashboard',
      icon: IconLayoutDashboard,
      href: '/dashboard/',
    },
    {
      navlabel: true,
      subheader: 'Gerenciamento',
    },
    permissaoListagemCelulas === 1 && {
      id: uniqueId(),
      title: 'Células',
      icon: IconHeart,
      href: '/dashboard/celulas',
    },
    permissaoListagemDepartamentos === 1 && {
      id: uniqueId(),
      title: 'Departamentos',
      icon: IconCopy,
      href: '/dashboard/departaments',
    },
    permissaoListagemDizimos === 1 && {
      id: uniqueId(),
      title: 'Dízimos',
      icon: IconHeartHandshake,
      href: '/dashboard/dizimos',
    },
    permissaoListagemAulasEBD === 1 && {
      id: uniqueId(),
      title: 'EBD',
      icon: IconSchool,
      href: '/dashboard/aulasEBD',
    },
    permissaoListagemEventos === 1 && {
      id: uniqueId(),
      title: 'Eventos',
      icon: IconCalendarEvent,
      href: '/dashboard/eventos',
    },
    permissaoListagemFinancas === 1 && {
      id: uniqueId(),
      title: 'Finanças',
      icon: IconFileDollar,
      href: '/dashboard/financas',
    },
    permissaoListagemMissoes === 1 && {
      id: uniqueId(),
      title: 'Missões',
      icon: IconTargetArrow,
      href: '/dashboard/missoes',
    },
    permissaoListagemRecursos === 1 && {
      id: uniqueId(),
      title: 'Recursos',
      icon: IconStar,
      href: '/dashboard/recursos',
    },
    permissaoListagemUsuarios === 1 && {
      id: uniqueId(),
      title: 'Usuários',
      icon: IconUsers,
      href: '/dashboard/users',
    },
    {
      navlabel: true,
      subheader: 'Cultos',
    },
     {
      id: uniqueId(),
      title: 'Cultos',
      icon: IconUsers,
      href: '/dashboard/cultos',
    },
    {
      navlabel: true,
      subheader: 'Outros',
    },
    permissaoListagemLocais && {
      id: uniqueId(),
      title: 'Locais',
      icon: IconMapPin,
      href: '/dashboard/locais',
    },
    permissaoListagemSalasEBD && {
      id: uniqueId(),
      title: 'Classes de EBD',
      icon: IconChalkboard,
      href: '/dashboard/classesEBD',
    },
    permissaoListagemTiposRecursos && {
      id: uniqueId(),
      title: 'Tipo de Recurso',
      icon: IconPackage,
      href: '/dashboard/tipoRecursos',
    },
  ].filter(item => item); // Garantindo que itens null ou falsos sejam filtrados

  return { Menuitems, loading };
};

export default useMenuItems;
