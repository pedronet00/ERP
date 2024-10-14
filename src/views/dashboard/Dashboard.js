import React from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

import Onboarding from '../../components/onboarding';

// components
import SalesOverview from './components/BalancoFiscal';
import YearlyBreakup from './components/QuantidadeMembros';
import RecentTransactions from './components/EntradaSaida';
import EventosIgreja from './components/EventosIgreja';
import Blog from './components/Blog';
import EntradasMensais from './components/EntradasMensais';
import EntradaSaida from './components/EntradaSaida';
import BalancoFiscal from './components/BalancoFiscal';
import QuantidadeMembros from './components/QuantidadeMembros';


const nivelUsuario = localStorage.getItem('nivelUsuario');

const Dashboard = () => {

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      
      <Box>
        <Grid container spacing={3}>
        { nivelUsuario == 4 && (
          <Grid item xs={12} lg={12}>
            <Onboarding /> 
          </Grid>
        )}

        { nivelUsuario == 4 && (
          <Grid item xs={12} lg={12}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <QuantidadeMembros />
              </Grid>
              <Grid item xs={6}>
                <EntradasMensais />
              </Grid>
            </Grid>
          </Grid>
        )}

          <Grid item xs={12} lg={12}>
            <EventosIgreja />
          </Grid>
          
          { nivelUsuario == 4 && (
          <Grid item xs={12} lg={12}>
            <BalancoFiscal />
          </Grid>
          )}
          
          
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
