import React, { useState, useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import EventosIgreja from './components/EventosIgreja';
import EntradasMensais from './components/EntradasMensais';
import BalancoFiscal from './components/BalancoFiscal';
import QuantidadeMembros from './components/QuantidadeMembros';
import api from '../../axiosConfig';
import Onboarding from '../../components/onboarding';
import SubscriptionDetails from './components/DetalhesAssinatura';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null); // Dados do dashboard
  const [permissions, setPermissions] = useState([]); // Lista de permissões ativas do usuário
  const [loading, setLoading] = useState(true); // Estado de carregamento

  const idCliente = localStorage.getItem('idCliente'); // ID do cliente
  const perfilId = localStorage.getItem('perfil'); // ID do perfil

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [dashboardResponse, permissionsResponse] = await Promise.all([
          api.get(`http://localhost:8000/api/dashboardData?idCliente=${idCliente}`),
          api.get(`http://localhost:8000/api/perfis-funcoes/${perfilId}`),
        ]);
  
        console.log('Dashboard data:', dashboardResponse.data); // Verifique os dados aqui
        setDashboardData(dashboardResponse.data);
  
        const activePermissions = permissionsResponse.data
          .filter((perm) => perm.permissao === 1)
          .map((perm) => perm.funcao?.nome);
  
        setPermissions(activePermissions || []);
      } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchDashboardData();
  }, [idCliente, perfilId]);
  

  // Verifica se o usuário possui uma permissão específica
  const hasPermission = (requiredFuncao) => permissions.includes(requiredFuncao);

  if (loading) {
    return <div>Carregando...</div>; // Loader enquanto os dados estão sendo carregados
  }

  return (
    <PageContainer title="Dashboard" description="Este é o painel de controle">
      <Box>
        <Grid container spacing={3}>
          
          <Grid item xs={12} lg={12}>
            <Onboarding onboarding={dashboardData?.onboarding} />
          </Grid>

          {hasPermission('Visualizar Próximos Eventos') && (
            <Grid item xs={12} lg={12}>
              <EventosIgreja eventos={dashboardData?.eventos?.proximosEventos || []} />
            </Grid>
          )}

            <Grid item xs={12} lg={4}>
              <SubscriptionDetails/>
            </Grid>
          

          {hasPermission('Visualizar Quantidade de Usuários') && (
            <Grid item xs={12} lg={4}>
              <QuantidadeMembros qtdeUsuarios={dashboardData?.onboarding?.userCount || 0} />
            </Grid>
          )}

          {hasPermission('Visualizar Saldo Atual') && (
            <Grid item xs={12} lg={4}>
              <EntradasMensais saldoAtual={dashboardData?.saldoAtual?.saldoAtual || 0} />
            </Grid>
          )}

          

          {hasPermission('Visualizar Balanço Fiscal') && (
            <Grid item xs={12} lg={12}>
              <BalancoFiscal balancoFiscal={dashboardData?.balancoFiscal || {}} />
            </Grid>
          )}
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
