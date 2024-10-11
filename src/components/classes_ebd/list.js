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
  Pagination,
} from '@mui/material';

const EBDClassesList = () => {
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const navigate = useNavigate();

  // Função para buscar classes da API
  const fetchClasses = async () => {
    try {
      const idCliente = localStorage.getItem('idCliente');
      const apiUrl = `http://localhost:8000/api/classesEBD?idCliente=${idCliente}`;
      const response = await axios.get(apiUrl);
      setClasses(response.data);
      setFilteredClasses(response.data); // Inicialmente, mostrar todas as classes
    } catch (error) {
      console.error("Erro ao buscar classes:", error);
      Swal.fire("Erro!", "Ocorreu um erro ao buscar as classes de EBD.", "error");
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  // Função para filtrar classes
  const filterClasses = () => {
    const filtered = classes.filter(classItem =>
      classItem.nomeClasse.toLowerCase().includes(searchName.toLowerCase()) || searchName === ''
    );
    setFilteredClasses(filtered);
  };

  useEffect(() => {
    filterClasses();
  }, [searchName, classes]);

  // Função para mudar a página
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Filtrar as classes para a página atual
  const paginatedClasses = filteredClasses.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleNewClass = () => {
    navigate('/classesEBD/create');
  };

  const handleReport = () => {
    navigate('/relatorio/classes');
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Lista de Classes de EBD</h2>
      </div>

      {/* Filtro */}
      <Box mb={3}>
        <TextField
          label="Pesquisar Nome da Classe"
          variant="outlined"
          size='small'
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </Box>

      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-success" onClick={handleReport}><IconClipboard/> Gerar Relatório</button>
        <button className="btn btn-primary" onClick={handleNewClass}><IconPlus/>Nova classe</button>
      </div>

      {/* Tabela de Classes */}
      <Table sx={{ marginTop: '2%' }}>
        <TableHead>
          <TableRow>
            <TableCell align="center"><Typography variant="subtitle2" fontWeight={600}>Nome da Classe</Typography></TableCell>
            <TableCell align="center"><Typography variant="subtitle2" fontWeight={600}>Quantidade de Membros</Typography></TableCell>
            <TableCell align="center"><Typography variant="subtitle2" fontWeight={600}>Status</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedClasses.length > 0 ? (
            paginatedClasses.map((classItem) => (
              <TableRow key={classItem.id}>
                <TableCell align="center"><Typography variant="body2">{classItem.nomeClasse}</Typography></TableCell>
                <TableCell align="center"><Typography variant="body2">{classItem.quantidadeMembros}</Typography></TableCell>
                <TableCell align="center">
                  <Typography variant="body2">
                    {classItem.statusClasse === 1 ? 'Ativa' : 'Desativada'}
                  </Typography>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center">
                <Typography variant="body1">Nenhuma classe encontrada</Typography>
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

export default EBDClassesList;
