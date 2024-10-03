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

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // Inicializar o navegador

  // Função para buscar usuários da API
  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://apoleon.com.br/api-estagio/public/api/user');
      setUsers(response.data);
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

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Lista de Usuários</h2>
      </div>

      <div className="d-flex justify-content-between">
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
      <TableCell align="right">
        <Typography variant="subtitle2" fontWeight={600}>
          Ações
        </Typography>
      </TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {users.length > 0 ? (
      users.map((user) => (
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
          <TableCell align="right">
            <IconX />
            <IconEdit />
          </TableCell>
        </TableRow>
      ))
    ) : (
      <TableRow>
        <TableCell colSpan={5} align="center">
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
