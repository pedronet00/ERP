import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography } from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const InformativoProximoEncontro = () => {
  const theme = useTheme();
  const { id } = useParams();
  const [proximoEncontro, setProximoEncontro] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProximoEncontro = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/proximoEncontroCelula/${id}`);
        setProximoEncontro(response.data || []);
      } catch (error) {
        console.error('Erro ao buscar o próximo encontro:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProximoEncontro();
  }, [id]);

  if (loading) {
    return (
      <DashboardCard
        title="Próximo Encontro"
        sx={{ height: '215px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Typography variant="body1" color="textSecondary">
          Carregando...
        </Typography>
      </DashboardCard>
    );
  }

  console.log("proximo encontro: " + proximoEncontro.length)

  if (!proximoEncontro || proximoEncontro.length === 0) {
    return (
      <DashboardCard
        title="Próximo Encontro"
        sx={{ height: '215px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Typography variant="body1" color="textSecondary">
          Não há registros de próximos encontros.
        </Typography>
      </DashboardCard>
    );
  }

  const encontro = proximoEncontro[0];

  const formatarData = (data) => {
    const dateObj = new Date(`${data}T00:00:00Z`);
    const dia = String(dateObj.getUTCDate()).padStart(2, '0');
    const mes = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
    const ano = dateObj.getUTCFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  const diaEncontro = new Date(`${encontro.dataEncontro}T00:00:00Z`).getUTCDate() || 'Não informada';
  const nomeMes = new Date(`${encontro.dataEncontro}T00:00:00Z`).toLocaleString('default', { month: 'long' }) || 'Não informado';
  const tema = encontro.temaEstudo || 'Não informado';
  const local = encontro.localizacao?.nomeLocal || 'Local não informado';
  const pessoaEstudo = encontro.responsavel?.name || 'Pessoa não informada';

  return (
    <DashboardCard
      title="Próximo Encontro"
      sx={{ height: '215px', display: 'flex', alignItems: 'center' }}
    >
      <Grid container spacing={3} alignItems="center" sx={{ height: '100%' }}>
        <Grid item xs={6}>
          <Stack direction="column" spacing={1} alignItems="center">
            <Typography variant="subtitle1" color="textSecondary" fontWeight={500} style={{ textTransform: 'capitalize' }}>
              {nomeMes}
            </Typography>
            <Typography variant="h3" fontWeight="700" color={theme.palette.primary.main}>
              {diaEncontro}
            </Typography>
            <Typography variant="body1" fontWeight="600" color="textSecondary">
              {local}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack direction="column" spacing={1} alignItems="center">
            <Typography variant="subtitle1" color="textSecondary" fontWeight={500} style={{ textTransform: 'capitalize' }}>
              Tema:
            </Typography>
            <Typography variant="h3" fontWeight="700" color={theme.palette.primary.main}>
              {tema}
            </Typography>
            <Typography variant="body1" fontWeight="600" color="textSecondary">
              {pessoaEstudo}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default InformativoProximoEncontro;
