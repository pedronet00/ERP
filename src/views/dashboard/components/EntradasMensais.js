import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Fab } from '@mui/material';
import { IconArrowDownRight, IconCurrencyDollar } from '@tabler/icons-react';
import DashboardCard from '../../../components/shared/DashboardCard';
import axios from 'axios';

const EntradasMensais = () => {
  // Estado para armazenar o saldo mensal
  const [saldoMensal, setSaldoMensal] = useState(0);
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;
  const secondarylight = '#f5fcff';
  const errorlight = '#fdede8';

  // Chart options
  const optionscolumnchart = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      colors: [secondarylight],
      type: 'solid',
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
  };

  const seriescolumnchart = [
    {
      name: '',
      color: secondary,
      data: [25, 66, 20, 40, 12, 58, 20], // Você pode substituir isso por dados reais quando disponível
    },
  ];

  // Função para buscar o saldo mensal
  const fetchSaldoMensal = async () => {
    try {
      const idCliente = localStorage.getItem('idCliente'); // Supondo que o idCliente é armazenado no localStorage
      const response = await axios.get(`http://localhost:8000/api/financas/saldo-mensal?idCliente=${idCliente}`);
      setSaldoMensal(parseFloat(response.data.saldoMensal)); // Convertendo string para número
    } catch (error) {
      console.error("Erro ao buscar saldo mensal:", error);
    }
  };

  // useEffect para buscar o saldo mensal ao montar o componente
  useEffect(() => {
    fetchSaldoMensal();
  }, []);

  return (
    <DashboardCard
      title="Saldo atual"
      action={
        <Fab color="secondary" size="medium" sx={{ color: '#ffffff' }}>
          <IconCurrencyDollar width={24} />
        </Fab>
      }
      footer={
        <Chart options={optionscolumnchart} series={seriescolumnchart} type="area" height="60px" />
      }
    >
      <>
        <Typography variant="h3" fontWeight="700" mt="-20px">
          R$ {saldoMensal.toFixed(2)} {/* Exibe o saldo mensal formatado */}
        </Typography>
        <Stack direction="row" spacing={1} my={1} alignItems="center">
          <Avatar sx={{ bgcolor: errorlight, width: 27, height: 27 }}>
            <IconArrowDownRight width={20} color="#FA896B" />
          </Avatar>
          <Typography variant="subtitle2" fontWeight="600">
            +9%
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            last year
          </Typography>
        </Stack>
      </>
    </DashboardCard>
  );
};

export default EntradasMensais;
