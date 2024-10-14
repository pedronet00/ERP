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

const ListaNivelUsuario = () => {
  const [niveisUsuarios, setNiveisUsuarios] = useState([]);
  const navigate = useNavigate();

  // Função para buscar tipos de recursos da API
  const fetchNiveisUsuarios = async () => {
    try {
      const idCliente = localStorage.getItem('idCliente'); // Pegando idCliente do localStorage
      const apiUrl = `http://localhost:8000/api/nivelUsuario`; // URL com idCliente como parâmetro
      const response = await axios.get(apiUrl);
      setNiveisUsuarios(response.data); // Guardar os tipos de recursos obtidos na state
    } catch (error) {
      console.error("Erro ao buscar tipos de recursos:", error);
    }
  };

  // Usar o useEffect para chamar a API quando o componente for montado
  useEffect(() => {
    fetchNiveisUsuarios();
  }, []);

  // Função para ativar tipo de recurso
  const handleActivateNivelUsuario = async (nivelUsuarioId) => {
    try {
      await axios.patch(`http://localhost:8000/api/nivelUsuario/${nivelUsuarioId}/ativar`);
      fetchNiveisUsuarios(); // Atualizar a lista de tipos de recursos após ativar
    } catch (error) {
      console.error("Erro ao ativar tipo de recurso:", error);
    }
  };

  // Função para desativar tipo de recurso
  const handleDeactivateNivelUsuario = async (nivelUsuarioId) => {
    try {
      await axios.patch(`http://localhost:8000/api/nivelUsuario/${nivelUsuarioId}/desativar`);
      fetchNiveisUsuarios(); // Atualizar a lista de tipos de recursos após desativar
    } catch (error) {
      console.error("Erro ao desativar tipo de recurso:", error);
    }
  };

  const handleNewNivelUsuario = () => {
    navigate('/nivelUsuario/create'); // Navega para a tela de criação de tipo de recurso
  };

  return (
    <div className="container mt-4">
      <h2>Lista de Níveis de Usuários</h2>
      
      {/* Tabela de Tipos de Recursos */}
      <Table sx={{ marginTop: '2%' }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Nível de Usuário
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
          {niveisUsuarios.length > 0 ? (
            niveisUsuarios.map((nivelUsuario) => (
              <TableRow key={nivelUsuario.id}>
                <TableCell align="center">
                  <Typography variant="body2">{nivelUsuario.nivelUsuario}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">
                    {nivelUsuario.statusTipoRecurso === 1 ? 'Ativado' : 'Desativado'}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Box display="flex" justifyContent="center" gap={2}>
                    {nivelUsuario.statusTipoRecurso === 1 ? (
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeactivateNivelUsuario(tipoRecurso.id)}
                        startIcon={<IconX />}
                        size="small"
                      >
                        Desativar
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleActivateNivelUsuario(tipoRecurso.id)}
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
                <Typography variant="body2">Nenhum nível de usuário encontrado</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListaNivelUsuario;
