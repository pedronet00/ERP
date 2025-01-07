import React, { useState, useEffect } from 'react';
import api from '../../axiosConfig';
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
  const [data, setData] = useState(null);
  const perfil = parseInt(localStorage.getItem('perfil'), 10); // Convertendo para número

  async function fetchPerfilFuncao() {
    try {
      const response = await fetch(`http://localhost:8000/api/perfis-funcoes/${perfil}`, {
        method: 'GET', // O método da requisição
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Erro ao buscar os dados');
      }
  
      const data = await response.json();
      return data; // Retorna o resultado na variável 'data'
    } catch (error) {
      console.error('Erro na requisição:', error);
      return []; // Retorna um array vazio em caso de erro
    }
  }
    
  // Função para buscar eventos da API
  const fetchEvents = async () => {
    try {
      const idCliente = localStorage.getItem('idCliente');
      const apiUrl = `http://localhost:8000/api/eventos?idCliente=${idCliente}`;
      const response = await api.get(apiUrl);
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
    navigate('/dashboard/eventos/create');
  };

  const handleReport = () => {
      Swal.fire({
        title: 'Gerar Relatório',
        html: `
          <p>Insira a data inicial e final para a geração do relatório.</p>
          <p style="font-size: 12px;">*<b>Atenção:</b> não coloque períodos muito longos, pois isso acarretará na lentidão do processamento do relatório.</p>
          <input type="date" id="dataInicial" class="swal2-input" placeholder="Data Inicial">
          <input type="date" id="dataFinal" class="swal2-input" placeholder="Data Final">
        `,
        showCancelButton: true,
        confirmButtonText: 'Gerar Relatório',
        cancelButtonText: 'Cancelar',
        focusConfirm: false,
        preConfirm: () => {
          const dataInicial = document.getElementById('dataInicial').value;
          const dataFinal = document.getElementById('dataFinal').value;
          if (!dataInicial || !dataFinal) {
            Swal.showValidationMessage('Por favor, insira ambas as datas!');
            return false;
          }
          return { dataInicial, dataFinal };
        }
      }).then((result) => {
        if (result.isConfirmed) {
          const { dataInicial, dataFinal } = result.value;
          // Redirecionar para o relatório com as datas na URL
          navigate(`/relatorio/eventos?dataInicial=${dataInicial}&dataFinal=${dataFinal}`);
        }
      });
    };

  useEffect(() => {
        fetchPerfilFuncao().then(fetchedData => {
          setData(fetchedData); // Atualiza o estado com os dados
        });
      }, []); // Executa apenas uma vez ao montar o componente
    
      if (data === null) {
        return []; // Retorna um array vazio enquanto os dados estão sendo carregados
      }
      
    const permissaoCadastroEventos = data.find(permissao => permissao.idFuncao === 3)?.permissao; // Listagem de células
  

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
      {permissaoCadastroEventos == 1 && (
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-success" onClick={handleNewEvent}><IconPlus /> Novo Evento</button>
        <button className="btn btn-primary" onClick={handleReport}><IconClipboard /> Gerar Relatório</button>
      </div>
      )}

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
            {perfil > 1 && (
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Ações
              </Typography>
            </TableCell>
            )}
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
                  <Typography variant="body2">
                    {new Date(event.dataEvento).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                  </Typography>
                </TableCell>

                {perfil > 1 && (
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/dashboard/eventos/create/${event.id}`)}
                    startIcon={<IconEdit />}
                    size="small"
                  >
                    Editar
                  </Button>
                </TableCell>
                )}
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
