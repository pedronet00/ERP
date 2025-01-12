import React, { useEffect, useState } from 'react';
import api from '../../axiosConfig';
import Swal from 'sweetalert2';
import {
  Container,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  Paper,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { IconDotsVertical, IconArrowLeft } from '@tabler/icons-react';
import QuantidadeMembrosCelula from '../../views/dashboard/components/QuantidadeMembrosCelula';
import InformativoProximoEncontro from '../../views/dashboard/components/ProximosEncontrosCelulas';

const PerfilCelula = () => {
  const [celula, setCelula] = useState(null);
  const [encontros, setEncontros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEncontro, setSelectedEncontro] = useState(null);
  const [qtdeUsuarios, setQtdeUsuarios] = useState(0);
  const [versiculoAtual, setVersiculoAtual] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const idCliente = localStorage.getItem('idCliente');

  const versiculos = [
    { versiculo: "Porque eu sei que o meu Redentor vive, e que por fim se levantará sobre a terra.", endereco: "Jó 19:25" },
    { versiculo: "O Senhor é o meu pastor, nada me faltará.", endereco: "Salmos 23:1" },
    { versiculo: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.", endereco: "João 3:16" },
    { versiculo: "Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará.", endereco: "Salmos 91:1" },
    { versiculo: "Posso todas as coisas em Cristo que me fortalece.", endereco: "Filipenses 4:13" },
    { versiculo: "Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus; eu te fortaleço, e te ajudo, e te sustento com a destra da minha justiça.", endereco: "Isaías 41:10" },
    { versiculo: "Deleita-te também no Senhor, e ele te concederá o que deseja o teu coração.", endereco: "Salmos 37:4" },
    { versiculo: "O Senhor é a minha luz e a minha salvação; a quem temerei? O Senhor é a força da minha vida; de quem me recearei?", endereco: "Salmos 27:1" },
    { versiculo: "Porque para mim o viver é Cristo, e o morrer é ganho.", endereco: "Filipenses 1:21" },
    { versiculo: "Mas os que esperam no Senhor renovarão as forças, subirão com asas como águias; correrão, e não se cansarão; caminharão, e não se fatigarão.", endereco: "Isaías 40:31" }
  ];

  useEffect(() => {
    const versiculoAleatorio = versiculos[Math.floor(Math.random() * versiculos.length)];
    setVersiculoAtual(versiculoAleatorio);
  }, []);

  const formatarData = (data) => {
    const dateObj = new Date(data);
    const dia = String(dateObj.getUTCDate()).padStart(2, '0');
    const mes = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
    const ano = dateObj.getUTCFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  const fetchCelula = async () => {
    try {
      const response = await api.get(`http://localhost:8000/api/celulas/${id}`);
      setCelula(response.data);
    } catch (error) {
      console.error('Erro ao buscar célula:', error);
      Swal.fire('Erro!', 'Não foi possível buscar as informações da célula.', 'error');
    }
  };

  const fetchEncontros = async () => {
    try {
      const response = await api.get(`http://localhost:8000/api/encontrosCelulas?idCliente=${idCliente}&idCelula=${id}`);
      setEncontros(response.data);
    } catch (error) {
      console.error('Erro ao buscar encontros:', error);
      Swal.fire('Erro!', 'Não foi possível buscar os encontros da célula.', 'error');
    }
  };

  const fetchQtdeUsuarios = async () => {
    try {
      const response = await api.get(`http://localhost:8000/api/membrosCount?idCelula=${id}`);
      setQtdeUsuarios(response.data.totalMembros);
    } catch (error) {
      console.error('Erro ao buscar quantidade de membros:', error);
      Swal.fire('Erro!', 'Não foi possível buscar a quantidade de membros da célula.', 'error');
    }
  };

  const handleDeleteEncontro = async (encontroId) => {
    const result = await Swal.fire({
      title: 'Confirmar exclusão',
      text: 'Tem certeza que deseja excluir este encontro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`http://localhost:8000/api/encontrosCelulas/${encontroId}`);
        Swal.fire('Excluído!', 'O encontro foi excluído com sucesso.', 'success');
        fetchEncontros(); // Atualiza a lista após a exclusão
      } catch (error) {
        console.error('Erro ao excluir encontro:', error);
        Swal.fire('Erro!', 'Não foi possível excluir o encontro.', 'error');
      }
    }
  };

  const handleEditEncontro = (encontroId) => {
    navigate(`/dashboard/encontrosCelulas/edit/${encontroId}`);
  };

  const handleMenuOpen = (event, encontroId) => {
    setAnchorEl(event.currentTarget);
    setSelectedEncontro(encontroId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedEncontro(null);
  };

  useEffect(() => {
    setLoading(true);
    fetchCelula();
    fetchEncontros();
    fetchQtdeUsuarios();
    setLoading(false);
  }, [id, idCliente]);

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <Container maxWidth="lg">
      <div className="d-flex justify-content-between mb-3" style={{ marginTop: '2%' }}>
              <button className="btn btn-secondary" onClick={handleGoBack}>
                <IconArrowLeft /> Voltar
              </button>
            </div>
      <Box
        sx={{
          backgroundImage: celula?.imagemCelula
            ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(http://localhost:8000/storage/${celula.imagemCelula})`
            : 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://via.placeholder.com/1200x200")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '200px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          marginBottom: 4,
        }}
      >
        <Typography variant="h1" component="h1" textAlign="center">
          {celula?.nomeCelula || 'Carregando...'}
        </Typography>
      </Box>

      <Paper
        sx={{
          padding: 2,
          marginBottom: 4,
          borderLeft: '5px solid #1976d2',
          backgroundColor: '#f9f9f9',
        }}
        elevation={0}
      >
        {versiculoAtual && (
          <Typography variant="body1" fontStyle="italic">
            "{versiculoAtual.versiculo}" — {versiculoAtual.endereco}
          </Typography>
        )}
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={6}>
          <QuantidadeMembrosCelula nomeCelula={celula?.nomeCelula || ''} qtdeUsuarios={qtdeUsuarios} />
        </Grid>
        <Grid item xs={6}>
          <InformativoProximoEncontro idCelula={celula?.idCelula || ''} />
        </Grid>
      </Grid>

      <Box
        sx={{
          backgroundColor: '#1976d2',
          color: 'white',
          padding: '10px',
          textAlign: 'center',
          marginBottom: '16px',
          marginTop: '50px',
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Histórico de Encontros
        </Typography>
      </Box>

      <Table sx={{ marginTop: '2%' }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">Data do Encontro</TableCell>
            <TableCell align="center">Tema do Estudo</TableCell>
            <TableCell align="center">Localização</TableCell>
            <TableCell align="center">Presentes</TableCell>
            <TableCell align="center">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {encontros.length > 0 ? (
            encontros.map((encontro) => (
              <TableRow key={encontro.id}>
                <TableCell align="center">{formatarData(encontro.dataEncontro)}</TableCell>
                <TableCell align="center">{encontro.temaEstudo}</TableCell>
                <TableCell align="center">{encontro.localizacao?.nomeLocal || 'Não informado'}</TableCell>
                <TableCell align="center">{encontro.qtdePresentes || 'N/A'}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={(e) => handleMenuOpen(e, encontro.id)}>
                    <IconDotsVertical />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl) && selectedEncontro === encontro.id}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={() => handleEditEncontro(encontro.id)}>Editar encontro</MenuItem>
                    <MenuItem style={{color: 'red'}} onClick={() => handleDeleteEncontro(encontro.id)}>Excluir encontro</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                Nenhum encontro encontrado
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Container>
  );
};

export default PerfilCelula;
