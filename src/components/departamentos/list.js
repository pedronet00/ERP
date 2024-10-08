import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  FormControl
} from '@mui/material';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const navigate = useNavigate();

  const getSubdomain = () => {
    const hostname = window.location.hostname;
    const subdomain = hostname.split('.')[0]; // Assumindo que o subdomínio é a primeira parte do hostname
    return subdomain;
  };

  
  const subdomain = getSubdomain();


  // Função para buscar departamentos da API
  const fetchDepartments = async () => {
    try {
      const response = await axios.get(`http://${subdomain}.localhost:8000/api/departamentos`); // Alterado para HTTP
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
        await axios.patch(`${subdomain}.localhost:8000/api/departamento/${departmentId}/ativar`); // Alterado para HTTP
        // Atualizar a lista de departamentos após a ativação
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
        await axios.patch(`${subdomain}.localhost:8000/api/departamento/${departmentId}/desativar`); // Alterado para HTTP
        // Atualizar a lista de departamentos após a desativação
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

  // Usar o useEffect para chamar a API quando o componente for montado
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

  // Atualizar a filtragem quando os valores de busca ou status mudarem
  useEffect(() => {
    filterDepartments();
  }, [searchTitle, filterStatus, departments]);

  const handleNewUser = () => {
    navigate('/departament/create');
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

      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-success" onClick={handleNewUser}><IconClipboard/> Gerar Relatório</button>
        <button className="btn btn-primary" onClick={handleNewUser}><IconPlus/>Novo Departamento</button>
      </div>

      {/* Tabela de Departamentos */}
      <Table sx={{ marginTop: '2%' }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                ID
              </Typography>
            </TableCell>
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
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Ações
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredDepartments.length > 0 ? (
            filteredDepartments.map((department) => (
              <TableRow key={department.id}>
                <TableCell align="center">
                  <Typography variant="body2">{department.id}</Typography>
                </TableCell>
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
                      onClick={() => navigate(`/departament/edit/${department.id}`)}
                      startIcon={<IconEdit />}
                      size="small"
                    >
                      Editar
                    </Button>
                  </Box>
                </TableCell>

              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                <Typography variant="body2">Nenhum departamento encontrado</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DepartmentList;
