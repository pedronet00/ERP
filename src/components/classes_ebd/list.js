import React, { useState, useEffect } from 'react';
import api from '../../axiosConfig';
import { IconEdit, IconPlus, IconClipboard, IconDotsVertical } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  Typography, Box,
  Table, TableBody,
  TableCell, TableHead,
  TableRow, Button,
  TextField, Pagination,
  IconButton, Menu, MenuItem
} from '@mui/material';

const EBDClassesList = () => {
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const navigate = useNavigate();

  // Função para buscar classes da API
  const fetchClasses = async () => {
    try {
      const idCliente = localStorage.getItem('idCliente');
      const apiUrl = `http://localhost:8000/api/classesEBD?idCliente=${idCliente}`;
      const response = await api.get(apiUrl);
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
    navigate('/dashboard/classesEBD/create');
  };

  const handleReport = () => {
    navigate('/relatorio/classes');
  };

  // Abrir o menu
  const handleMenuOpen = (event, classItem) => {
    setAnchorEl(event.currentTarget);
    setSelectedClass(classItem);
  };

  // Fechar o menu
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedClass(null);
  };

  // Editar classe
  const handleEditClass = (id) => {
    navigate(`/dashboard/classesEBD/create?id=${id}`);
    handleMenuClose();
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
        <button className="btn btn-success" onClick={handleReport}><IconClipboard /> Gerar Relatório</button>
        <button className="btn btn-primary" onClick={handleNewClass}><IconPlus /> Nova classe</button>
      </div>

      

      {/* Tabela de Classes */}
      <Table sx={{ marginTop: '2%' }}>
        <TableHead>
          <TableRow>
            <TableCell align="center"><Typography variant="subtitle2" fontWeight={600}>Nome da Classe</Typography></TableCell>
            <TableCell align="center"><Typography variant="subtitle2" fontWeight={600}>Quantidade de Membros</Typography></TableCell>
            <TableCell align="center"><Typography variant="subtitle2" fontWeight={600}>Status</Typography></TableCell>
            <TableCell align="center"><Typography variant="subtitle2" fontWeight={600}>Ações</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedClasses.length > 0 ? (
            paginatedClasses.map((classItem) => (
              <TableRow key={classItem.id}>
                <TableCell align="center"><Typography variant="body2">{classItem.nomeClasse}</Typography></TableCell>
                <TableCell align="center"><Typography variant="body2">{classItem.quantidadeMembros}</Typography></TableCell>
                <TableCell align="center"><Typography variant="body2">{classItem.statusClasse === 1 ? 'Ativa' : 'Desativada'}</Typography></TableCell>
                <TableCell align="center">
                  <IconButton onClick={(e) => handleMenuOpen(e, classItem)}>
                    <IconDotsVertical />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
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

      {/* Menu de Ações */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem onClick={() => handleEditClass(selectedClass.id)}>
          Editar Classe
        </MenuItem>
      </Menu>
    </div>
  );
};

export default EBDClassesList;
