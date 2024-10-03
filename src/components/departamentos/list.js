import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconX, IconEdit, IconPlus, IconClipboard } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import {
  Typography, Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
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

  // Função para buscar departamentos da API
  const fetchDepartments = async () => {
    try {
      const response = await axios.get('https://apoleon.com.br/api-estagio/public/api/departamentos');
      setDepartments(response.data);
      setFilteredDepartments(response.data); // Inicialmente, mostrar todos os departamentos
    } catch (error) {
      console.error("Erro ao buscar departamentos:", error);
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
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <FormControl variant="outlined" sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            label="Status"
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
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Título
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Texto
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Status
              </Typography>
            </TableCell>
            <TableCell align="right">
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
                <TableCell>
                  <Typography variant="body2">{department.tituloDepartamento}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{department.textoDepartamento}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {department.statusDepartamento === 1 ? 'Ativo' : 'Inativo'}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <IconX />
                  <IconEdit />
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
