import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconEdit, IconPlus, IconClipboard } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  Typography, Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
  Pagination
} from '@mui/material';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);  // Quantidade de eventos por página (5)
  const navigate = useNavigate();

  // Função para buscar eventos da API
  const fetchEvents = async () => {
    try {
      const idCliente = localStorage.getItem('idCliente');
      const apiUrl = `http://localhost:8000/api/eventos?idCliente=${idCliente}`;
      const response = await axios.get(apiUrl);
      setEvents(response.data);
      setFilteredEvents(response.data); // Inicialmente, mostrar todos os eventos
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
      Swal.fire('Erro!', 'Não foi possível buscar os eventos.', 'error');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Função para filtrar eventos
  const filterEvents = () => {
    const filtered = events.filter(event =>
      event.nomeEvento.toLowerCase().startsWith(searchTitle.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  useEffect(() => {
    filterEvents();
  }, [searchTitle, events]);

  // Função para mudar a página
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Filtrar os eventos para a página atual
  const paginatedEvents = filteredEvents.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleNewEvent = () => {
    navigate('/evento/create');
  };

  const handleReport = () => {
    navigate('/relatorio/eventos');
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Lista de Eventos</h2>
      </div>

      {/* Filtro de busca */}
      <Box mb={3} display="flex" gap={2}>
        <TextField
          label="Pesquisar Evento"
          variant="outlined"
          size='small'
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
      </Box>

      <div className="d-flex justify-content-between mb-3">
        <Button variant="contained" color="primary" onClick={handleReport} startIcon={<IconClipboard />}>
          Gerar Relatório
        </Button>
        <Button variant="contained" color="primary" onClick={handleNewEvent} startIcon={<IconPlus />}>
          Novo Evento
        </Button>
      </div>

      {/* Tabela de eventos */}
      <Table sx={{ marginTop: '2%' }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Nome do Evento
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Descrição
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Local
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Data
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
          {paginatedEvents.length > 0 ? (
            paginatedEvents.map((event) => (
              <TableRow key={event.id}>
                <TableCell align="center">
                  <Typography variant="body2">{event.nomeEvento}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">{event.descricaoEvento}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">{event.local.nomeLocal}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">{new Date(event.dataEvento).toLocaleDateString()}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/eventos/edit/${event.id}`)}
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
              <TableCell colSpan={5} align="center">
                <Typography variant="body1">Nenhum evento encontrado</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Paginação */}
      <Box display="flex" justifyContent="center" marginTop={2}>
        <Pagination
          count={Math.ceil(filteredEvents.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
    </div>
  );
};

export default EventList;
