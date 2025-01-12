import React, { useState, useEffect } from 'react';
import api from '../../axiosConfig';
import Swal from 'sweetalert2';
import { IconX, IconEdit, IconPlus, IconClipboard, IconCheck, IconDotsVertical, } from '@tabler/icons-react';
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
  IconButton,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination, // Importando o componente de paginação
} from '@mui/material';

const formatDate = (dateString) => {
  // Extrai os componentes da data
  const [year, month, day] = dateString.split('-').map(Number);

  // Cria a data no horário local
  const date = new Date(year, month - 1, day); // `month` começa em 0 no JS

  // Formata a data no formato DD/MM/YYYY
  const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
  return formattedDate;
};




const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Alterado para 1 para melhor experiência
  const [usersPerPage] = useState(5);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const perfil = parseInt(localStorage.getItem('perfil'), 10); // Convertendo para número
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  async function fetchPerfilFuncao() {
    try {
      const response = await fetch(`http://localhost:8000/api/perfis-funcoes/${perfil}`, {
        method: 'GET', // O método da requisição
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Erro ao buscar os dados');
      }
  
      const data = await response.json();
      return data; // Retorna o resultado na variável 'data'
    } catch (error) {
      console.error('Erro na requisição:', error);
      return []; // Retorna um array vazio em caso de erro
    }
  }

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
      Swal.fire({
        title: 'Gerar Relatório',
        html: `
          <p>Insira a data inicial e final para a geração do relatório.</p>
          <p style="font-size: 12px;">*<b>Atenção:</b> não coloque períodos muito longos, pois isso acarretará na lentidão do processamento do relatório.</p>
          <input type="date" id="dataInicial" class="swal2-input" placeholder="Data Inicial">
          <input type="date" id="dataFinal" class="swal2-input" placeholder="Data Final">
        `,
        showCancelButton: true,
        confirmButtonText: 'Gerar Relatório',
        cancelButtonText: 'Cancelar',
        focusConfirm: false,
        preConfirm: () => {
          const dataInicial = document.getElementById('dataInicial').value;
          const dataFinal = document.getElementById('dataFinal').value;
          if (!dataInicial || !dataFinal) {
            Swal.showValidationMessage('Por favor, insira ambas as datas!');
            return false;
          }
          return { dataInicial, dataFinal };
        }
      }).then((result) => {
        if (result.isConfirmed) {
          const { dataInicial, dataFinal } = result.value;
          // Redirecionar para o relatório com as datas na URL
          navigate(`/relatorio/usuarios?dataInicial=${dataInicial}&dataFinal=${dataFinal}`);
        }
      });
    };

  const handleMenuOpen = (event, usuario) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(usuario);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
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

  const handleDeactivateUser = async () => {
    if (!selectedUser) return; // Verifica se há um usuário selecionado
  
    const result = await Swal.fire({
      title: "Tem certeza?",
      text: `Deseja desativar o usuário ${selectedUser.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, desativar."
    });
  
    if (result.isConfirmed) {
      try {
        await api.patch(`http://localhost:8000/api/deactivateUser/${selectedUser.id}`);
        // Atualizar a lista de usuários após a desativação
        fetchUsers();
        Swal.fire({
          title: "Desativado!",
          text: `O usuário ${selectedUser.name} foi desativado.`,
          icon: "success"
        });
        handleMenuClose(); // Fecha o menu após a ação
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
  
  const handleActivateUser = async () => {
    if (!selectedUser) return; // Verifica se há um usuário selecionado
  
    const result = await Swal.fire({
      title: "Tem certeza?",
      text: `Deseja ativar o usuário ${selectedUser.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, ativar."
    });
  
    if (result.isConfirmed) {
      try {
        await api.patch(`http://localhost:8000/api/activateUser/${selectedUser.id}`);
        // Atualizar a lista de usuários após a ativação
        fetchUsers();
        Swal.fire({
          title: "Ativado!",
          text: `O usuário ${selectedUser.name} foi ativado.`,
          icon: "success"
        });
        handleMenuClose(); // Fecha o menu após a ação
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

  useEffect(() => {
            fetchPerfilFuncao().then(fetchedData => {
              setData(fetchedData); // Atualiza o estado com os dados
            });
          }, []); // Executa apenas uma vez ao montar o componente
        
          if (data === null) {
            return []; // Retorna um array vazio enquanto os dados estão sendo carregados
          }
          
    const permissaoCadastroUsuario = data.find(permissao => permissao.idFuncao === 10)?.permissao; // Listagem de células
    const permissaoEdicaoUsuario = data.find(permissao => permissao.idFuncao === 59)?.permissao; // Listagem de células
    const permissaoAtivarDesativarUsuario = data.find(permissao => permissao.idFuncao === 75)?.permissao; // Listagem de células
  

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

      {permissaoCadastroUsuario == 1 && (
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
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>Ações</Typography>
            </TableCell>
            
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
                  <Typography variant="body2">{formatDate(user.dataNascimentoUsuario)}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">{user.usuarioAtivo === 1 ? "Ativo" : "Inativo"}</Typography>
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={(e) => handleMenuOpen(e, user)}>
                    <IconDotsVertical />
                  </IconButton>
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
        <MenuItem onClick={() => navigate(`/dashboard/user/create/${selectedUser?.id}`)}>
        Editar usuário
      </MenuItem>
       {permissaoAtivarDesativarUsuario === 1 && 
        selectedUser?.usuarioAtivo === 0 && ( // Verifica se o usuário está inativo
            <MenuItem onClick={handleActivateUser}>Ativar Usuário</MenuItem>
        )}

       {permissaoAtivarDesativarUsuario === 1 && 
        selectedUser?.usuarioAtivo === 1 && ( // Verifica se o usuário está inativo
          <MenuItem onClick={handleDeactivateUser}>Desativar Usuário</MenuItem>
        )}

      
      <MenuItem onClick={() => navigate(`/dashboard/escalas-cultos/usuario?idPessoa=${selectedUser?.id}`)}>
        Ver Escalas do Usuário
      </MenuItem>

      </Menu>

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
