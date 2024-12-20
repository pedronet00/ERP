import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar } from '@mui/material';
import { IconArrowUpLeft, IconArrowDownRight } from '@tabler/icons-react';

import DashboardCard from '../../../components/shared/DashboardCard';

const QuantidadeMembros = ({ usuariosMesAtual, usuariosMesPassado, percentualAumento }) => {
  const theme = useTheme();
  const successlight = theme.palette.success.light;
  const errorlight = theme.palette.error.light;

  // Dados para o gráfico de linha
  const optionsLineChart = {
    chart: {
      type: 'line',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
    },
    colors: [theme.palette.primary.main],
    xaxis: {
      categories: ['Mês Passado', 'Mês Atual'],
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: 'smooth',
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
    grid: {
      borderColor: '#f1f1f1',
    },
  };

  const seriesLineChart = [
    {
      name: 'Membros',
      data: [usuariosMesPassado, usuariosMesAtual],
    },
  ];

  return (
    <DashboardCard title="Total de Membros">
      <Grid container spacing={3}>
        {/* Coluna com informações de resumo */}
        <Grid item xs={7} sm={7}>
          <Typography variant="h3" fontWeight="700">
            {usuariosMesAtual} {/* Quantidade de membros no mês atual */}
          </Typography>
          <Stack direction="row" spacing={1} mt={1} alignItems="center">
            <Avatar
              sx={{
                bgcolor: percentualAumento >= 0 ? successlight : errorlight,
                width: 27,
                height: 27,
              }}
            >
              {percentualAumento >= 0 ? (
                <IconArrowUpLeft width={20} color="#39B69A" />
              ) : (
                <IconArrowDownRight width={20} color="#E53935" />
              )}
            </Avatar>
            <Typography variant="subtitle2" fontWeight="600">
              {percentualAumento >= 0 ? '+' : ''}
              {percentualAumento}%
            </Typography>
          </Stack>
        </Grid>

        {/* Coluna com gráfico de linha */}
        <Grid item xs={12} sm={12}>
          <Chart
            options={optionsLineChart}
            series={seriesLineChart}
            type="line"
            height="200px"
          />
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default QuantidadeMembros;
