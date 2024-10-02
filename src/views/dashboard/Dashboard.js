import React from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

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


const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <EventosIgreja />
          </Grid>
          <Grid item xs={8} lg={8}>
            <EntradaSaida />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <QuantidadeMembros />
              </Grid>
              <Grid item xs={12}>
                <EntradasMensais />
              </Grid>
            </Grid>
          </Grid>
          
          <Grid item xs={12} lg={12}>
            <BalancoFiscal />
          </Grid>
          
          <Grid item xs={12}>
            <Blog />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
