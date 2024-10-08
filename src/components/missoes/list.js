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
} from '@mui/material';

const MissoesList = () => {
  const [missoes, setMissoes] = useState([]);
  const [filteredMissoes, setFilteredMissoes] = useState([]);
  const [filterNome, setFilterNome] = useState('');
  const [filterCidade, setFilterCidade] = useState('');
  const navigate = useNavigate();

  const fetchMissoes = async () => {
    try {
      const idCliente = localStorage.getItem('idCliente'); // Pega o idCliente do localStorage
      const apiUrl = `http://localhost:8000/api/missoes?idCliente=${idCliente}`; // Monta a URL com o idCliente como parâmetro
      const response = await axios.get(apiUrl);// Alterado para HTTP
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
        await axios.patch(`localhost:8000/api/missoes/${id}/ativar`);
        fetchMissoes(); // Recarrega as missões após ativar
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
        await axios.patch(`localhost:8000/api/missoes/${id}/desativar`);
        fetchMissoes(); // Recarrega as missões após desativar
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

      <Table sx={{ marginTop: '2%' }} >
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
          {filteredMissoes.length > 0 ? (
            filteredMissoes.map((missao) => (
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
                  <Typography align="center" variant="body2">{missao.pastorTitular}</Typography>
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
    </div>
  );
};

export default MissoesList;
