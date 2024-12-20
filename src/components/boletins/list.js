import React, { useState, useEffect } from 'react';
import api from '../../axiosConfig';
import { IconEdit, IconPlus } from '@tabler/icons-react';
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
  TextField,
  Pagination,
} from '@mui/material';

const BoletinsList = () => {
  const [boletins, setBoletins] = useState([]);
  const [filteredBoletins, setFilteredBoletins] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5); // Quantidade de boletins por página
  const navigate = useNavigate();

  // Função para buscar boletins da API
  const fetchBoletins = async () => {
    try {
      const response = await api.get('http://localhost:8000/api/boletim');
      setBoletins(response.data);
      setFilteredBoletins(response.data); // Inicialmente, mostrar todos os boletins
    } catch (error) {
      console.error("Erro ao buscar boletins:", error);
      Swal.fire('Erro!', 'Não foi possível buscar os boletins.', 'error');
    }
  };

  useEffect(() => {
    fetchBoletins();
  }, []);

  // Filtrar boletins
  const filterBoletins = () => {
    const filtered = boletins.filter(
      (boletim) => boletim.dataCulto.startsWith(searchDate) || searchDate === ''
    );
    setFilteredBoletins(filtered);
  };

  useEffect(() => {
    filterBoletins();
  }, [searchDate, boletins]);

  // Função para mudar a página
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Filtrar os boletins para a página atual
  const paginatedBoletins = filteredBoletins.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleEdit = (boletimId) => {
    navigate(`/dashboard/boletim/create/${boletimId}`);
  };

  const handleCreate = () => {
    navigate('/dashboard/boletim/create');
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Typography variant="h4">Lista de Boletins de Culto</Typography>
        
      </div>

      {/* Filtro de busca */}
      <Box mb={3}>
        <TextField
          label="Pesquisar Data do Culto (YYYY-MM-DD)"
          variant="outlined"
          size="small"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
      </Box>
      <Button
          variant="contained"
          color="primary"
          onClick={handleCreate}
          startIcon={<IconPlus />}
        >
          Novo Boletim
        </Button>

      {/* Tabela de boletins */}
      <Table sx={{ marginTop: '2%' }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Data do Culto
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Turno
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
          {paginatedBoletins.length > 0 ? (
            paginatedBoletins.map((boletim) => (
              <TableRow key={boletim.id}>
                <TableCell align="center">
                  <Typography variant="body2">{boletim.dataCulto}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">
                    {boletim.turnoCulto === 1 ? 'Manhã' : 'Noite'}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(boletim.id)}
                    startIcon={<IconEdit />}
                    size="small"
                  >
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center">
                <Typography variant="body1">Nenhum boletim encontrado</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Paginação */}
      <Box display="flex" justifyContent="center" marginTop={2}>
        <Pagination
          count={Math.ceil(filteredBoletins.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
    </div>
  );
};

export default BoletinsList;
