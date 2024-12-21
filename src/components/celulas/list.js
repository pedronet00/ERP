import React, { useState, useEffect } from 'react';
import api from '../../axiosConfig';
import { IconPlus, IconClipboard } from '@tabler/icons-react'; // Ícones
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

const ListaCelulas = () => {
  const [celulas, setCelulas] = useState([]);
  const navigate = useNavigate();

  // Função para buscar células da API
  const fetchCelulas = async () => {
    try {
      const idCliente = localStorage.getItem('idCliente'); // Pegando idCliente do localStorage
      const apiUrl = `http://localhost:8000/api/celulas?idCliente=${idCliente}`; // URL com idCliente como parâmetro
      const response = await api.get(apiUrl);
      setCelulas(response.data); // Guardar as células obtidas na state
    } catch (error) {
      console.error('Erro ao buscar células:', error);
    }
  };

  // Usar o useEffect para chamar a API quando o componente for montado
  useEffect(() => {
    fetchCelulas();
  }, []);

  const handleNewCelula = () => {
    navigate('/dashboard/celulas/create'); // Navega para a tela de criação de célula
  };

  return (
    <div className="container mt-4">
      <h2>Lista de Células</h2>
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-success">
          <IconClipboard /> Gerar Relatório
        </button>
        <button className="btn btn-primary" onClick={handleNewCelula}>
          <IconPlus /> Nova Célula
        </button>
      </div>
      {/* Tabela de Células */}
      <Table sx={{ marginTop: '2%' }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Nome da Célula
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Localização
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Responsável
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Dia de Reunião
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {celulas.length > 0 ? (
            celulas.map((celula) => (
              <TableRow key={celula.id}>
                <TableCell align="center">
                  <Typography variant="body2">{celula.nomeCelula}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">{celula.localizacao.nomeLocal}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">{celula.responsavel.name}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">{celula.diaReuniao}</Typography>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                <Typography variant="body2">Nenhuma célula encontrada</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListaCelulas;
