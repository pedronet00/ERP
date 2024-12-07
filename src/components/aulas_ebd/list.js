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
  Pagination,
} from '@mui/material';

const EBDAulasList = () => {
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const navigate = useNavigate();
  const nivelUsuario = localStorage.getItem('nivelUsuario');
  // Função para buscar aulas da API
  const fetchClasses = async () => {
    try {
      const idCliente = localStorage.getItem('idCliente');
      const apiUrl = `http://localhost:8000/api/aulaEBD?idCliente=${idCliente}`;
      const response = await api.get(apiUrl);
      setClasses(response.data);
      setFilteredClasses(response.data); // Inicialmente, mostrar todas as aulas
    } catch (error) {
      console.error("Erro ao buscar aulas:", error);
      Swal.fire("Erro!", "Ocorreu um erro ao buscar as aulas de EBD.", "error");
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  // Função para filtrar aulas
  const filterClasses = () => {
    const filtered = classes.filter(classItem =>
      classItem.dataAula.startsWith(searchDate) || searchDate === ''
    );
    setFilteredClasses(filtered);
  };

  useEffect(() => {
    filterClasses();
  }, [searchDate, classes]);

  // Função para mudar a página
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Filtrar as aulas para a página atual
  const paginatedClasses = filteredClasses.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleNewClass = () => {
    navigate('/dashboard/aulasEBD/create');
  };

  const handleReport = () => {
    navigate('/relatorio/ebd');
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Lista de Aulas de EBD</h2>
      </div>

      {/* Filtro */}
      <Box mb={3}>
        <TextField
          label="Pesquisar Data da Aula (YYYY-MM-DD)"
          variant="outlined"
          size='small'
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
      </Box>

      {nivelUsuario > 2 && (
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-success" onClick={handleNewClass}><IconPlus/>Nova aula</button>
        <button className="btn btn-primary" onClick={handleReport}><IconClipboard/> Gerar Relatório</button>
      </div>
      )}

      {/* Tabela de Aulas */}
      <Table sx={{ marginTop: '2%' }}>
        <TableHead>
          <TableRow>
            <TableCell align="center"><Typography variant="subtitle2" fontWeight={600}>Data da Aula</Typography></TableCell>
            <TableCell align="center"><Typography variant="subtitle2" fontWeight={600}>Classe</Typography></TableCell>
            <TableCell align="center"><Typography variant="subtitle2" fontWeight={600}>Professor</Typography></TableCell>
            <TableCell align="center"><Typography variant="subtitle2" fontWeight={600}>Presentes</Typography></TableCell>
            <TableCell align="center"><Typography variant="subtitle2" fontWeight={600}>Lição</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedClasses.length > 0 ? (
            paginatedClasses.map((classItem) => (
              <TableRow key={classItem.id}>
                <TableCell align="center"><Typography variant="body2">{classItem.dataAula}</Typography></TableCell>
                <TableCell align="center"><Typography variant="body2">{classItem.classe.nomeClasse}</Typography></TableCell>
                <TableCell align="center"><Typography variant="body2">{classItem.professor.name}</Typography></TableCell>
                <TableCell align="center"><Typography variant="body2">{classItem.quantidadePresentes}</Typography></TableCell>
                <TableCell align="center"><Typography variant="body2">{classItem.numeroAula}</Typography></TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <Typography variant="body1">Nenhuma aula encontrada</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Paginação */}
      <Box display="flex" justifyContent="center" marginTop={2}>
        <Pagination
          count={Math.ceil(filteredClasses.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
    </div>
  );
};

export default EBDAulasList;
