import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography } from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const InformativoProximoEncontro = () => {
  const theme = useTheme();
  const { id } = useParams(); // Obtém o ID da célula a partir da URL
  const [proximoEncontro, setProximoEncontro] = useState(null); // Armazena os dados do próximo encontro
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProximoEncontro = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/proximoEncontroCelula/${id}`);
        if (response.data) {
          setProximoEncontro(response.data);
        } else {
          setProximoEncontro(null); // Se não houver dados, define como null
        }
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

  if (!proximoEncontro) {
    return (
      <DashboardCard
        title="Próximo Encontro"
        sx={{ height: '215px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Typography variant="body1" color="textSecondary">
          Não há próximos encontros disponíveis.
        </Typography>
      </DashboardCard>
    );
  }

  // Formatar a data no formato DD/MM/YYYY
  const formatarData = (data) => {
    const dateObj = new Date(`${data}T00:00:00Z`); // Adiciona 'Z' para indicar UTC
    const dia = String(dateObj.getUTCDate()).padStart(2, '0');
    const mes = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
    const ano = dateObj.getUTCFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  const nomeMes = new Date(`${proximoEncontro.dataEncontro}T00:00:00Z`).toLocaleString('default', {
    month: 'long',
  });
  const diaEncontro = new Date(`${proximoEncontro.dataEncontro}T00:00:00Z`).getUTCDate();
  const tema = proximoEncontro.temaEstudo || 'Tema não informado';
  const local = proximoEncontro.idLocal ? `Local: ${proximoEncontro.localizacao?.nomeLocal || 'Local não informado'}` : 'Local não informado';
  const pessoaEstudo = proximoEncontro.responsavel?.name || 'Pessoa não informada';

  return (
    <DashboardCard
      title="Próximo Encontro"
      sx={{ height: '215px', display: 'flex', alignItems: 'center' }}
    >
      <Grid container spacing={3} alignItems="center" sx={{ height: '100%' }}>
        {/* Coluna 1: Data e Local */}
        <Grid item xs={6}>
          <Stack direction="column" spacing={1} alignItems="center">
            <Typography
              variant="subtitle1"
              color="textSecondary"
              fontWeight={500}
              style={{ textTransform: 'capitalize' }} // Primeira letra do mês em maiúscula
            >
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
        {/* Coluna 2: Tema */}
        <Grid item xs={6}>
          <Stack direction="column" spacing={1} alignItems="center">
            <Typography
              variant="subtitle1"
              color="textSecondary"
              fontWeight={500}
              style={{ textTransform: 'capitalize' }} // Primeira letra do mês em maiúscula
            >
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
