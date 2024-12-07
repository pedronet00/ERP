import React, { useState, useEffect } from 'react';
import api from '../../axiosConfig';
import { IconX, IconEdit, IconPlus, IconClipboard, IconCheck } from '@tabler/icons-react'; // IconCheck adicionado
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  Typography, Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Pagination  // Importação do componente de paginação
} from '@mui/material';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [page, setPage] = useState(1);  // Estado para controlar a página atual
  const [rowsPerPage] = useState(5);    // Quantidade de departamentos por página (5)
  const nivelUsuario = localStorage.getItem('nivelUsuario');
  const navigate = useNavigate();

  // Função para buscar departamentos da API
  const fetchDepartments = async () => {
    try {
      const idCliente = localStorage.getItem('idCliente'); // Pega o idCliente do localStorage
      const apiUrl = `http://localhost:8000/api/departamentos?idCliente=${idCliente}`; // Monta a URL com o idCliente como parâmetro
      const response = await api.get(apiUrl); // Alterado para HTTP
      setDepartments(response.data);
      setFilteredDepartments(response.data); // Inicialmente, mostrar todos os departamentos
    } catch (error) {
      console.error("Erro ao buscar departamentos:", error);
    }
  };

  // Função para ativar departamento
  const handleActivateDepartment = async (departmentId) => {
    const result = await Swal.fire({
      title: "Tem certeza?",
      text: "Deseja ativar este departamento?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, ativar."
    });
  
    if (result.isConfirmed) {
      try {
        await api.patch(`http://localhost:8000/api/departamento/${departmentId}/ativar`); // Alterado para HTTP
        fetchDepartments();
        Swal.fire({
          title: "Ativado!",
          text: "O departamento foi ativado.",
          icon: "success"
        });
      } catch (error) {
        console.error("Erro ao ativar departamento:", error);
        Swal.fire({
          title: "Erro!",
          text: "Ocorreu um erro ao ativar o departamento.",
          icon: "error"
        });
      }
    }
  };
  
  const handleDeactivateDepartment = async (departmentId) => {
    const result = await Swal.fire({
      title: "Tem certeza?",
      text: "Deseja desativar este departamento?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, desativar."
    });
  
    if (result.isConfirmed) {
      try {
        await api.patch(`http://localhost:8000/api/departamento/${departmentId}/desativar`); // Alterado para HTTP
        fetchDepartments();
        Swal.fire({
          title: "Desativado!",
          text: "O departamento foi desativado.",
          icon: "success"
        });
      } catch (error) {
        console.error("Erro ao desativar departamento:", error);
        Swal.fire({
          title: "Erro!",
          text: "Ocorreu um erro ao desativar o departamento.",
          icon: "error"
        });
      }
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // Função para filtrar departamentos
  const filterDepartments = () => {
    const filtered = departments.filter(department => {
      const titleMatch = department.tituloDepartamento.toLowerCase().startsWith(searchTitle.toLowerCase());
      const statusMatch = filterStatus === '' || department.statusDepartamento === parseInt(filterStatus);
      return titleMatch && statusMatch;
    });
    setFilteredDepartments(filtered);
  };

  useEffect(() => {
    filterDepartments();
  }, [searchTitle, filterStatus, departments]);

  // Função para mudar a página
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Filtrar os departamentos para a página atual
  const paginatedDepartments = filteredDepartments.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleNewUser = () => {
    navigate('/dashboard/departament/create');
  };

  const handleReport = () => {
    navigate('/relatorio/departamentos');
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Lista de Departamentos</h2>
      </div>

      {/* Filtros */}
      <Box mb={3} display="flex" gap={2}>
        <TextField
          label="Pesquisar Título"
          variant="outlined"
          size='small'
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <FormControl variant="outlined" sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            label="Status"
            size='small'
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="1">Ativo</MenuItem>
            <MenuItem value="0">Inativo</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {nivelUsuario > 2 && (
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-success" onClick={handleNewUser}><IconPlus/>Novo Departamento</button>
        <button className="btn btn-primary" onClick={handleReport}><IconClipboard/> Gerar Relatório</button>
      </div>
      )}

      {/* Tabela de Departamentos */}
      <Table sx={{ marginTop: '2%' }}>
        <TableHead>
          <TableRow>
            
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Título
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Texto
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Status
              </Typography>
            </TableCell>
            {nivelUsuario > 2 && (
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Ações
              </Typography>
            </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedDepartments.length > 0 ? (
            paginatedDepartments.map((department) => (
              
              <TableRow key={department.id}>
                <TableCell align="center">
                  <Typography variant="body2">{department.tituloDepartamento}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">{department.textoDepartamento}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">
                    {department.statusDepartamento === 1 ? 'Ativo' : 'Inativo'}
                  </Typography>
                </TableCell>
                {nivelUsuario > 2 && (
                <TableCell align="center">
                  <Box display="flex" flexDirection="column" gap={1}>
                    {department.statusDepartamento === 1 ? (
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeactivateDepartment(department.id)}
                        startIcon={<IconX />}
                        size="small"
                      >
                        Desativar
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleActivateDepartment(department.id)}
                        startIcon={<IconCheck />}
                        size="small"
                      >
                        Ativar
                      </Button>
                    )}

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate(`/dashboard/departament/create/${department.id}`)}
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
                <Typography variant="body1">Nenhum departamento encontrado</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Paginação */}
      <Box display="flex" justifyContent="center" marginTop={2}>
        <Pagination
          count={Math.ceil(filteredDepartments.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
    </div>
  );
};

export default DepartmentList;
