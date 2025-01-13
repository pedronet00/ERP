import React, { useState, useEffect } from 'react';
import api from '../../axiosConfig';
import { IconPlus, IconClipboard, IconDotsVertical } from '@tabler/icons-react'; // Ícones
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material';

const ListaCelulas = () => {
  const [celulas, setCelulas] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCelula, setSelectedCelula] = useState(null);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const perfil = parseInt(localStorage.getItem('perfil'), 10); // Convertendo para número
  
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

  // Função para buscar células da API
  const fetchCelulas = async () => {
    try {
      const idCliente = localStorage.getItem('idCliente'); // Pegando idCliente do localStorage
      const apiUrl = `http://localhost:8000/api/celulas?idCliente=${idCliente}`; // URL com idCliente como parâmetro
      const response = await api.get(apiUrl);
      setCelulas(response.data); // Guardar as células obtidas na state
    } catch (error) {
      console.error('Erro ao buscar células:', error);
    }
  };

  // Usar o useEffect para chamar a API quando o componente for montado
  useEffect(() => {
    fetchCelulas();
  }, []);

  const handleNewCelula = () => {
    navigate('/dashboard/celulas/create'); // Navega para a tela de criação de célula
  };

  const handleMenuOpen = (event, celula) => {
    setAnchorEl(event.currentTarget);
    setSelectedCelula(celula);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCelula(null);
  };

  const handleViewCelula = () => {
    navigate(`/dashboard/celulas/${selectedCelula.id}`); // Redireciona para a URL /celulas/{id}
    handleMenuClose();
  };

  const handleViewMembrosCelula = () => {
    navigate(`/dashboard/membrosCelula/${selectedCelula.id}`); // Redireciona para a URL /celulas/{id}
    handleMenuClose();
  };

  const handleNovoEncontroCelula = () => {
    navigate(`/dashboard/encontrosCelulas/create/${selectedCelula.id}`); // Redireciona para a URL /celulas/{id}
    handleMenuClose();
  };
  

const handleExcluirCelula = () => {
  // Exibe a janela de confirmação do SweetAlert
  handleMenuClose();
  Swal.fire({
    title: 'Tem certeza?',
    text: "Esta ação não pode ser desfeita.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim, excluir!',
    cancelButtonText: 'Cancelar',
    reverseButtons: true,
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        // Faz a requisição DELETE
        await api.delete(`http://localhost:8000/api/celulas/${selectedCelula.id}`);
        
        // Exibe o sucesso
        Swal.fire(
          'Excluída!',
          'A célula foi excluída com sucesso.',
          'success'
        );

        fetchCelulas()
        // Aqui você pode redirecionar o usuário ou fazer qualquer outra ação após a exclusão
        // navigate('/caminho/para/redirecionar'); // Caso precise redirecionar após a exclusão

      } catch (error) {
        // Exibe a mensagem de erro caso a exclusão falhe
        Swal.fire(
          'Erro!',
          'Ocorreu um erro ao tentar excluir a célula. Tente novamente.',
          'error'
        );
      }
    }
  });
};


    useEffect(() => {
              fetchPerfilFuncao().then(fetchedData => {
                setData(fetchedData); // Atualiza o estado com os dados
              });
            }, []); // Executa apenas uma vez ao montar o componente
          
            if (data === null) {
              return []; // Retorna um array vazio enquanto os dados estão sendo carregados
            }
            
      const permissaoCadastroCelula = data.find(permissao => permissao.idFuncao === 1)?.permissao; // Listagem de células
  

  return (
    <div className="container mt-4">
      <h2>Lista de Células</h2>
      { permissaoCadastroCelula == 1 && (
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-success">
          <IconClipboard /> Gerar Relatório
        </button>
        <button className="btn btn-primary" onClick={handleNewCelula}>
          <IconPlus /> Nova Célula
        </button>
      </div>
      )}
      {/* Tabela de Células */}
      <Table sx={{ marginTop: '2%' }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Nome da Célula
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Localização
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Responsável
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Dia de Reunião
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
          {celulas.length > 0 ? (
            celulas.map((celula) => (
              <TableRow key={celula.id}>
                <TableCell align="center">
                  <Typography variant="body2">{celula.nomeCelula}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">{celula.localizacao.nomeLocal}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">{celula.responsavel.name}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">{celula.diaReuniao}</Typography>
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={(e) => handleMenuOpen(e, celula)}>
                    <IconDotsVertical />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <Typography variant="body2">Nenhuma célula encontrada</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

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
        <MenuItem onClick={handleViewCelula}>Ver Célula</MenuItem>
        <MenuItem onClick={handleViewMembrosCelula}>Ver Membros da Célula</MenuItem>
        <MenuItem onClick={handleNovoEncontroCelula}>Registrar encontro</MenuItem>
        <MenuItem onClick={handleExcluirCelula} style={{color: 'red'}}>Excluir Célula</MenuItem>
      </Menu>
    </div>
  );
};

export default ListaCelulas;
