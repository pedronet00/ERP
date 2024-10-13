import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconX, IconEdit, IconPlus, IconClipboard } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Pagination
} from '@mui/material';

const DizimoList = () => {
  const [dizimos, setDizimos] = useState([]);
  const [filteredDizimos, setFilteredDizimos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dizimosPerPage] = useState(5); // Número de dízimos por página
  const navigate = useNavigate();
  const nivelUsuario = localStorage.getItem('nivelUsuario');
  const idCliente = localStorage.getItem('idCliente');

  // Função para buscar dízimos da API
  const fetchDizimos = async () => {
    try {
      const apiUrl = `http://localhost:8000/api/dizimos?idCliente=${idCliente}`;
      const response = await axios.get(apiUrl);
      setDizimos(response.data);
      setFilteredDizimos(response.data); // Inicialmente, mostrar todos os dízimos
    } catch (error) {
      console.error("Erro ao buscar dízimos:", error);
    }
  };

  // Usar o useEffect para chamar a API quando o componente for montado
  useEffect(() => {
    fetchDizimos();
  }, []);

  const handleNewDizimo = () => {
    navigate('/dizimos/create');
  };

  // Cálculo dos índices para a paginação
  const indexOfLastDizimo = currentPage * dizimosPerPage;
  const indexOfFirstDizimo = indexOfLastDizimo - dizimosPerPage;
  const currentDizimos = filteredDizimos.slice(indexOfFirstDizimo, indexOfLastDizimo);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Lista de Dízimos</h2>
      </div>
      {nivelUsuario > 3 && (
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-success" onClick={handleNewDizimo}><IconClipboard/> Gerar relatório</button>
        <button className="btn btn-primary" onClick={handleNewDizimo}><IconPlus/> Novo registro</button>
      </div>
      )}

      {/* Tabela de Dízimos */}
      <Table sx={{ marginTop: '2%' }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>ID</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>Data do Culto</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>Turno do Culto</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>Valor arrecadado</Typography>
            </TableCell>
            {nivelUsuario > 3 && (
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>Ações</Typography>
            </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {currentDizimos.length > 0 ? (
            currentDizimos.map((dizimo) => (
              <TableRow key={dizimo.id}>
                <TableCell align="center">
                  <Typography variant="body2">{dizimo.id}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">{dizimo.dataCulto}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">{dizimo.turnoCulto === 0 ? 'Manhã' : 'Noite'}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">{dizimo.valorArrecadado}</Typography>
                </TableCell>
                {nivelUsuario > 3 && (
                <TableCell align="center">
                  <Box display="flex" flexDirection="column" gap={1}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate(`/dizimos/edit/${dizimo.id}`)}
                      startIcon={<IconEdit />}
                      size="small"
                    >
                      Editar
                    </Button>
                  </Box>
                </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <Typography variant="body2">Nenhum dízimo encontrado</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Componente de Paginação */}
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={Math.ceil(filteredDizimos.length / dizimosPerPage)}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          color="primary"
        />
      </Box>
    </div>
  );
};

export default DizimoList;
