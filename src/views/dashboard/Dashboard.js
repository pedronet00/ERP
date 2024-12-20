import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

import Onboarding from '../../components/onboarding';
import EventosIgreja from './components/EventosIgreja';
import EntradasMensais from './components/EntradasMensais';
import EntradaSaida from './components/EntradaSaida';
import BalancoFiscal from './components/BalancoFiscal';
import QuantidadeMembros from './components/QuantidadeMembros';

import api from '../../axiosConfig';
const nivelUsuario = localStorage.getItem('nivelUsuario');

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null); // Estado para armazenar dados da API
  const idCliente = localStorage.getItem('idCliente'); // Substitua pelo idCliente correto ou obtenha dinamicamente
  const [loading, setLoading] = useState(true); // Estado de carregamento

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get(
          `http://localhost:8000/api/dashboardData?idCliente=${idCliente}`
        );
        setDashboardData(response.data); // Armazena os dados no estado
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar os dados do dashboard', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div>Carregando...</div>; // Mostra um loader enquanto os dados são carregados
  }

  if (!dashboardData) {
    return <div>Erro ao carregar dados do dashboard.</div>;
  }

  const {
    onboarding,
    saldoAtual,
    eventos,
    balancoFiscal,
  } = dashboardData;

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          {nivelUsuario == 4 && (
            <Grid item xs={12} lg={12}>
              <Onboarding onboarding={onboarding} loading={loading} />
            </Grid>
          )}

          {nivelUsuario == 4 && (
            <Grid item xs={12} lg={12}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  {/* Passando as informações necessárias para o componente de membros */}
                  <QuantidadeMembros
                    usuariosMesAtual={onboarding.usuariosMesAtual}
                    usuariosMesPassado={onboarding.usuariosMesPassado}
                    percentualAumento={onboarding.percentualAumento}
                  />
                </Grid>
                <Grid item xs={6}>
            <EntradasMensais
              saldoMesAtual={dashboardData?.saldoMensal?.saldoMesAtual || 0}
              saldoMesPassado={dashboardData?.saldoMensal?.saldoMesPassado || 0}
              percentualSaldo={dashboardData?.saldoMensal?.percentualSaldo || 0}
            />
          </Grid>
              </Grid>
            </Grid>
          )}

          <Grid item xs={12} lg={12}>
            <EventosIgreja eventos={eventos.proximosEventos} />
          </Grid>

          {nivelUsuario == 4 && (
            <Grid item xs={12} lg={12}>
              <BalancoFiscal balancoFiscal={balancoFiscal} />
            </Grid>
          )}
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
