import React, { useState, useEffect } from 'react';
import api from '../../axiosConfig';
import Swal from 'sweetalert2';
import { IconX, IconEdit, IconPlus, IconClipboard, IconCheck } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Button,
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
  Pagination, // Importando o componente de paginação
} from '@mui/material';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Alterado para 1 para melhor experiência
  const [usersPerPage] = useState(5);
  const nivelUsuario = localStorage.getItem('nivelUsuario');
  const navigate = useNavigate();


  // Função para buscar usuários da API
  const fetchUsers = async () => {
    try {
      const idCliente = localStorage.getItem('idCliente'); // Pega o idCliente do localStorage
      const apiUrl = `http://localhost:8000/api/user?idCliente=${idCliente}`; // Monta a URL com o idCliente como parâmetro
      const response = await api.get(apiUrl);
  
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  // Usar o useEffect para chamar a API quando o componente for montado
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleNewUser = () => {
    navigate('/dashboard/user/create');
  };

  const handleReport = () => {
    navigate('/relatorio/usuarios');
  };

  const handleFilterChange = () => {
    let filtered = users;

    if (nameFilter) {
      filtered = filtered.filter(user => user.name.toLowerCase().startsWith(nameFilter.toLowerCase()));
    }

    if (statusFilter) {
      filtered = filtered.filter(user =>
        statusFilter === 'Ativo' ? user.usuarioAtivo === 1 : user.usuarioAtivo === 0
      );
    }

    setFilteredUsers(filtered);
  };

  useEffect(() => {
    handleFilterChange();
  }, [nameFilter, statusFilter, users]);

  const handleDeactivateUser = async (userId) => {
    const result = await Swal.fire({
      title: "Tem certeza?",
      text: "Deseja desativar esse usuário?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, desativar."
    });

    if (result.isConfirmed) {
      try {
        await api.patch(`http://localhost:8000/api/deactivateUser/${userId}`);
        // Atualizar a lista de usuários após a desativação
        fetchUsers();
        Swal.fire({
          title: "Desativado!",
          text: "O usuário foi desativado.",
          icon: "success"
        });
      } catch (error) {
        console.error("Erro ao desativar usuário:", error);
        Swal.fire({
          title: "Erro!",
          text: "Ocorreu um erro ao desativar o usuário.",
          icon: "error"
        });
      }
    }
  };

  const handleActivateUser = async (userId) => {
    const result = await Swal.fire({
      title: "Tem certeza?",
      text: "Deseja ativar esse usuário?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, ativar."
    });

    if (result.isConfirmed) {
      try {
        await api.patch(`http://localhost:8000/api/activateUser/${userId}`);
        // Atualizar a lista de usuários após a ativação
        fetchUsers();
        Swal.fire({
          title: "Ativado!",
          text: "O usuário foi ativado.",
          icon: "success"
        });
      } catch (error) {
        console.error("Erro ao ativar usuário:", error);
        Swal.fire({
          title: "Erro!",
          text: "Ocorreu um erro ao ativar o usuário.",
          icon: "error"
        });
      }
    }
  };

  // Calcular usuários paginados
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const paginatedUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

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

      {nivelUsuario > 2 && (
      <div className="d-flex justify-content-between mb-3" style={{ marginTop: '2%' }}>
        <button className="btn btn-success" onClick={handleNewUser}><IconPlus /> Novo Usuário</button>
        <button className="btn btn-primary" onClick={handleReport}><IconClipboard /> Gerar Relatório</button>
      </div>
      )}

      <Table sx={{ marginTop: '2%' }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>Nome</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>Email</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>Data de Nascimento</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>Status</Typography>
            </TableCell>
            {nivelUsuario > 2 && (
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>Ações</Typography>
            </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedUsers.length > 0 ? (
            paginatedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell align="center">
                  <Typography variant="body2">{user.name}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">{user.email}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">{user.dataNascimentoUsuario}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">{user.usuarioAtivo === 1 ? "Ativo" : "Inativo"}</Typography>
                </TableCell>
                {nivelUsuario > 2 && (
                <TableCell align="center">
                  <Box display="flex" flexDirection="column" gap={1}>
                    {user.usuarioAtivo === 1 ? (
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeactivateUser(user.id)}
                        startIcon={<IconX />}
                        size="small"
                      >
                        Desativar
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleActivateUser(user.id)}
                        startIcon={<IconCheck />}
                        size="small"
                      >
                        Ativar
                      </Button>
                    )}

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate(`/dashboard/user/create/${user.id}`)}
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
                <Typography variant="body2">Nenhum usuário encontrado</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Paginação */}
      <Box display="flex" justifyContent="center" marginTop={2}>
        <Pagination
          count={Math.ceil(filteredUsers.length / usersPerPage)}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          color="primary"
        />
      </Box>
    </div>
  );
};

export default UserList;
