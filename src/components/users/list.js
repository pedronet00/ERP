import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconX, IconEdit, IconPlus, IconClipboard } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const navigate = useNavigate(); // Inicializar o navegador

  // Função para buscar usuários da API
  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://apoleon.com.br/api-estagio/public/api/user');
      setUsers(response.data);
      setFilteredUsers(response.data); // Inicialmente, todos os usuários são filtrados
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  // Usar o useEffect para chamar a API quando o componente for montado
  useEffect(() => {
    fetchUsers();
  }, []);

  // Função do botão de novo usuário (você pode ajustar conforme necessário)
  const handleNewUser = () => {
    navigate('/user/create');
  };

  // Função para filtrar usuários
  const handleFilterChange = () => {
    let filtered = users;

    // Filtrar por nome
    if (nameFilter) {
      filtered = filtered.filter(user => user.name.toLowerCase().startsWith(nameFilter.toLowerCase()));
    }

    // Filtrar por status
    if (statusFilter) {
      filtered = filtered.filter(user => 
        statusFilter === 'Ativo' ? user.usuarioAtivo === 1 : user.usuarioAtivo === 0
      );
    }

    setFilteredUsers(filtered);
  };

  // Usar useEffect para aplicar filtros quando os filtros mudarem
  useEffect(() => {
    handleFilterChange();
  }, [nameFilter, statusFilter, users]);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Lista de Usuários</h2>
      </div>

      <TextField 
          label="Filtrar por Nome" 
          variant="outlined" 
          value={nameFilter} 
          onChange={(e) => setNameFilter(e.target.value)} 
          style={{ marginRight: '10px' }}
        />
        <FormControl variant="outlined" style={{ marginRight: '10px', width: '200px' }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            label="Status"
          >
            <MenuItem value=""><em>Todos</em></MenuItem>
            <MenuItem value="Ativo">Ativo</MenuItem>
            <MenuItem value="Inativo">Inativo</MenuItem>
          </Select>
        </FormControl>

      <div className="d-flex justify-content-between mb-3" style={{marginTop: '2%'}}>
        <button className="btn btn-success" onClick={handleNewUser}><IconClipboard/> Gerar Relatório</button>
        <button className="btn btn-primary" onClick={handleNewUser}><IconPlus/> Novo Usuário</button>
      </div>

      <Table sx={{ marginTop: '2%' }}>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                ID
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Nome
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Email
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Data de Nascimento
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
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Typography variant="body2">{user.id}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{user.name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{user.email}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{user.dataNascimentoUsuario}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{user.usuarioAtivo === 1 ? "Ativo" : "Inativo"}</Typography>
                </TableCell>
                <TableCell align="right">
                  <IconX />
                  <IconEdit />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <Typography variant="body2">Nenhum usuário encontrado</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserList;
