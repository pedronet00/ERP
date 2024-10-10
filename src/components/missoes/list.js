import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconX, IconEdit, IconPlus, IconClipboard, IconCheck } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  Typography, Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Button,
  Pagination, // Importa o componente de Paginação
} from '@mui/material';

const MissoesList = () => {
  const [missoes, setMissoes] = useState([]);
  const [filteredMissoes, setFilteredMissoes] = useState([]);
  const [filterNome, setFilterNome] = useState('');
  const [filterCidade, setFilterCidade] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Estado da página atual
  const [usersPerPage] = useState(5); // Número de missões por página
  const navigate = useNavigate();

  const fetchMissoes = async () => {
    try {
      const idCliente = localStorage.getItem('idCliente');
      const apiUrl = `http://localhost:8000/api/missoes?idCliente=${idCliente}`;
      const response = await axios.get(apiUrl);
      setMissoes(response.data);
      setFilteredMissoes(response.data);
    } catch (error) {
      console.error('Erro ao buscar missões:', error);
    }
  };

  useEffect(() => {
    fetchMissoes();
  }, []);

  useEffect(() => {
    const filtered = missoes.filter((missao) =>
      missao.nomeMissao.toLowerCase().startsWith(filterNome.toLowerCase()) &&
      missao.cidadeMissao.toLowerCase().startsWith(filterCidade.toLowerCase())
    );
    setFilteredMissoes(filtered);
  }, [filterNome, filterCidade, missoes]);

  const handleNewUser = () => {
    navigate('/missoes/create');
  };

  const ativarMissao = async (id) => {
    const result = await Swal.fire({
      title: "Tem certeza?",
      text: "Deseja ativar esta missão?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, ativar."
    });
  
    if (result.isConfirmed) {
      try {
        await axios.patch(`http://localhost:8000/api/missoes/${id}/ativar`); // Corrigido para incluir 'http://'
        fetchMissoes();
        Swal.fire({
          title: "Ativada!",
          text: "A missão foi ativada com sucesso.",
          icon: "success"
        });
      } catch (error) {
        console.error("Erro ao ativar a missão:", error);
        Swal.fire({
          title: "Erro!",
          text: "Ocorreu um erro ao ativar a missão.",
          icon: "error"
        });
      }
    }
  };
  
  const desativarMissao = async (id) => {
    const result = await Swal.fire({
      title: "Tem certeza?",
      text: "Deseja desativar esta missão?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, desativar."
    });
  
    if (result.isConfirmed) {
      try {
        await axios.patch(`http://localhost:8000/api/missoes/${id}/desativar`); // Corrigido para incluir 'http://'
        fetchMissoes();
        Swal.fire({
          title: "Desativada!",
          text: "A missão foi desativada com sucesso.",
          icon: "success"
        });
      } catch (error) {
        console.error("Erro ao desativar a missão:", error);
        Swal.fire({
          title: "Erro!",
          text: "Ocorreu um erro ao desativar a missão.",
          icon: "error"
        });
      }
    }
  };

  // Cálculos para paginação
  const indexOfLastMission = currentPage * usersPerPage;
  const indexOfFirstMission = indexOfLastMission - usersPerPage;
  const currentMissoes = filteredMissoes.slice(indexOfFirstMission, indexOfLastMission);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Lista de Missões</h2>
      </div>

      <Box mb={3} display="flex" gap={2}>
        <TextField
          label="Filtrar por Nome"
          variant="outlined"
          size="small"
          value={filterNome}
          onChange={(e) => setFilterNome(e.target.value)}
        />
        <TextField
          label="Filtrar por Cidade"
          variant="outlined"
          size="small"
          value={filterCidade}
          onChange={(e) => setFilterCidade(e.target.value)}
        />
      </Box>

      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-success" onClick={handleNewUser}><IconClipboard /> Gerar Relatório</button>
        <button className="btn btn-primary" onClick={handleNewUser}><IconPlus /> Nova Missão</button>
      </div>

      <Table sx={{ marginTop: '2%' }}>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography align="center" variant="subtitle2" fontWeight={600}>
                ID
              </Typography>
            </TableCell>
            <TableCell>
              <Typography align="center" variant="subtitle2" fontWeight={600}>
                Nome
              </Typography>
            </TableCell>
            <TableCell>
              <Typography align="center" variant="subtitle2" fontWeight={600}>
                Cidade
              </Typography>
            </TableCell>
            <TableCell>
              <Typography align="center" variant="subtitle2" fontWeight={600}>
                Membros
              </Typography>
            </TableCell>
            <TableCell>
              <Typography align="center" variant="subtitle2" fontWeight={600}>
                Pastor titular
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Ações
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentMissoes.length > 0 ? (
            currentMissoes.map((missao) => (
              <TableRow key={missao.id}>
                <TableCell>
                  <Typography align="center" variant="body2">{missao.id}</Typography>
                </TableCell>
                <TableCell>
                  <Typography align="center" variant="body2">{missao.nomeMissao}</Typography>
                </TableCell>
                <TableCell>
                  <Typography align="center" variant="body2">{missao.cidadeMissao}</Typography>
                </TableCell>
                <TableCell>
                  <Typography align="center" variant="body2">{missao.quantidadeMembros}</Typography>
                </TableCell>
                <TableCell>
                  <Typography align="center" variant="body2">{missao.pastor_titular.name}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Box display="flex" flexDirection="column" gap={1}>
                    {missao.statusMissao == 1 ? (
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => desativarMissao(missao.id)}
                        startIcon={<IconX />}
                        size="small"
                      >
                        Desativar
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => ativarMissao(missao.id)}
                        startIcon={<IconCheck />}
                        size="small"
                      >
                        Ativar
                      </Button>
                    )}

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate(`/missoes/edit/${missao.id}`)}
                      startIcon={<IconEdit />}
                      size="small"
                    >
                      Editar
                    </Button>
                  </Box>
                </TableCell>

              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <Typography variant="body2">Nenhuma missão encontrada</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Componente de Paginação */}
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={Math.ceil(filteredMissoes.length / usersPerPage)}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          color="primary"
        />
      </Box>
    </div>
  );
};

export default MissoesList;
