import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconX, IconEdit, IconPlus, IconClipboard } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import {
  Typography, Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip
} from '@mui/material';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate(); // Inicializar o navegador

  // Função para buscar departamentos da API
  const fetchDepartments = async () => {
    try {
      const response = await axios.get('https://apoleon.com.br/api-estagio/public/api/departamentos');
      setDepartments(response.data);
    } catch (error) {
      console.error("Erro ao buscar departamentos:", error);
    }
  };

  // Usar o useEffect para chamar a API quando o componente for montado
  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleNewUser = () => {
    navigate('/departament/create');
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Lista de Departamentos</h2>
      </div>

      <div className="d-flex justify-content-between">
        <button className="btn btn-success" onClick={handleNewUser}><IconClipboard/> Gerar Relatório</button>
        <button className="btn btn-primary" onClick={handleNewUser}><IconPlus/>Novo Departamento</button>
      </div>

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
    {departments.length > 0 ? (
      departments.map((department) => (
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
