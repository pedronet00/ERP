import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Grid, Typography, Stack, Avatar } from '@mui/material';
import { IconArrowUpLeft, IconArrowDownRight } from '@tabler/icons-react';
import DashboardCard from '../../../components/shared/DashboardCard';

const EntradasMensais = ({ saldoMesAtual = 0, saldoMesPassado = 0, percentualSaldo = 0 }) => {
  const theme = useTheme();
  const successlight = theme.palette.success.light;
  const errorlight = theme.palette.error.light;

  console.log('Props recebidas em EntradasMensais:', {
    saldoMesAtual,
    saldoMesPassado,
    percentualSaldo,
  });

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
      name: 'Saldo',
      data: [parseFloat(saldoMesPassado), parseFloat(saldoMesAtual)],
    },
  ];

  return (
    <DashboardCard title="Saldo Mensal Atual">
      <Grid container spacing={3}>
        {/* Coluna de resumo */}
        <Grid item xs={12} sm={7}>
          <Typography variant="h3" fontWeight="700">
            R$ {saldoMesAtual?.toFixed(2)} {/* Formata o saldo atual */}
          </Typography>
          <Stack direction="row" spacing={1} mt={1} alignItems="center">
            <Avatar
              sx={{
                bgcolor: percentualSaldo >= 0 ? successlight : errorlight,
                width: 27,
                height: 27,
              }}
            >
              {percentualSaldo >= 0 ? (
                <IconArrowUpLeft width={20} color="#39B69A" />
              ) : (
                <IconArrowDownRight width={20} color="#E53935" />
              )}
            </Avatar>
            <Typography variant="subtitle2" fontWeight="600">
              {percentualSaldo >= 0 ? '+' : ''}
              {percentualSaldo}%
            </Typography>
          </Stack>
        </Grid>

        {/* Coluna do gráfico */}
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

export default EntradasMensais;
