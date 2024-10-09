import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconCheck, IconX, IconClipboard, IconPlus } from '@tabler/icons-react'; // Ícones
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';

const ListaTiposRecursos = () => {
  const [tiposRecursos, setTiposRecursos] = useState([]);
  const navigate = useNavigate();

  // Função para buscar tipos de recursos da API
  const fetchTiposRecursos = async () => {
    try {
      const idCliente = localStorage.getItem('idCliente'); // Pegando idCliente do localStorage
      const apiUrl = `http://localhost:8000/api/tipoRecurso?idCliente=${idCliente}`; // URL com idCliente como parâmetro
      const response = await axios.get(apiUrl);
      setTiposRecursos(response.data); // Guardar os tipos de recursos obtidos na state
    } catch (error) {
      console.error("Erro ao buscar tipos de recursos:", error);
    }
  };

  // Usar o useEffect para chamar a API quando o componente for montado
  useEffect(() => {
    fetchTiposRecursos();
  }, []);

  // Função para ativar tipo de recurso
  const handleActivateTipoRecurso = async (tipoRecursoId) => {
    try {
      await axios.patch(`http://localhost:8000/api/tipo-recurso/${tipoRecursoId}/ativar`);
      fetchTiposRecursos(); // Atualizar a lista de tipos de recursos após ativar
    } catch (error) {
      console.error("Erro ao ativar tipo de recurso:", error);
    }
  };

  // Função para desativar tipo de recurso
  const handleDeactivateTipoRecurso = async (tipoRecursoId) => {
    try {
      await axios.patch(`http://localhost:8000/api/tipoRecurso/${tipoRecursoId}/desativar`);
      fetchTiposRecursos(); // Atualizar a lista de tipos de recursos após desativar
    } catch (error) {
      console.error("Erro ao desativar tipo de recurso:", error);
    }
  };

  const handleNewTipoRecurso = () => {
    navigate('/tipoRecursos/create'); // Navega para a tela de criação de tipo de recurso
  };

  return (
    <div className="container mt-4">
      <h2>Lista de Tipos de Recursos</h2>
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-success" onClick={handleNewTipoRecurso}><IconClipboard /> Gerar Relatório</button>
        <button className="btn btn-primary" onClick={handleNewTipoRecurso}><IconPlus />Novo Tipo de Recurso</button>
      </div>
      {/* Tabela de Tipos de Recursos */}
      <Table sx={{ marginTop: '2%' }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Nome do Tipo de Recurso
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Status
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
          {tiposRecursos.length > 0 ? (
            tiposRecursos.map((tipoRecurso) => (
              <TableRow key={tipoRecurso.id}>
                <TableCell align="center">
                  <Typography variant="body2">{tipoRecurso.tipoRecurso}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">
                    {tipoRecurso.statusTipoRecurso === 1 ? 'Ativado' : 'Desativado'}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Box display="flex" justifyContent="center" gap={2}>
                    {tipoRecurso.statusTipoRecurso === 1 ? (
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeactivateTipoRecurso(tipoRecurso.id)}
                        startIcon={<IconX />}
                        size="small"
                      >
                        Desativar
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleActivateTipoRecurso(tipoRecurso.id)}
                        startIcon={<IconCheck />}
                        size="small"
                      >
                        Ativar
                      </Button>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center">
                <Typography variant="body2">Nenhum tipo de recurso encontrado</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListaTiposRecursos;
