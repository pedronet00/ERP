import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../axiosConfig';
import { Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Menu, MenuItem } from '@mui/material';
import { IconDotsVertical, IconX, IconEdit, IconPlus, IconClipboard, IconCheck } from '@tabler/icons-react'; // IconCheck adicionado
import Swal from 'sweetalert2'; // Importa o SweetAlert2

const ListaCultos = () => {
  const [cultos, setCultos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCulto, setSelectedCulto] = useState(null);
  const navigate = useNavigate();

  // Função para buscar os cultos da API
  const fetchCultos = async () => {
    try {
      const idCliente = localStorage.getItem('idCliente'); // Pegando idCliente do localStorage
      if (!idCliente) {
        throw new Error('ID do cliente não encontrado no localStorage.');
      }

      const apiUrl = `http://localhost:8000/api/culto?idCliente=${idCliente}`;
      const response = await api.get(apiUrl);
      
      // Ajusta a data do culto para o formato UTC
      const cultosComDataCorrigida = response.data.map(culto => {
        return {
          ...culto,
          dataCulto: new Date(culto.dataCulto).toISOString().slice(0, 10), // Converte para UTC e extrai a data no formato YYYY-MM-DD
        };
      });

      setCultos(cultosComDataCorrigida); // Atualiza os cultos na state
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Erro ao buscar cultos');
      setLoading(false);
    }
  };

  // Usar o useEffect para chamar a API quando o componente for montado
  useEffect(() => {
    fetchCultos();
  }, []);

  // Lógica do menu
  const handleMenuOpen = (event, idCulto) => {
    setAnchorEl(event.currentTarget);
    setSelectedCulto(idCulto);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCulto(null);
  };

  const handleViewEscalas = () => {
    if (selectedCulto) {
      navigate(`/dashboard/escalas-cultos?idCulto=${selectedCulto}`);
    }
    handleMenuClose();
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6">Carregando cultos...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  const handleNovoCulto = () => {
    navigate(`/dashboard/cultos/create`);
  };

  const handleEditarCulto = () => {
    if (selectedCulto) {
      navigate(`/dashboard/cultos/create?idCulto=${selectedCulto}`);
    }
    handleMenuClose();
  };

  const handleDeleteCulto = async () => {
    handleMenuClose(); // Fecha o menu antes de exibir a confirmação

    
    const result = await Swal.fire({
      title: 'Tem certeza?',
      text: "Você não poderá reverter essa ação!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    });
  
    if (result.isConfirmed) {
      try {
        const response = await api.delete('http://localhost:8000/api/culto', {
          data: { id: selectedCulto } // Envia o id no corpo da requisição
        });
  
        Swal.fire(
          'Excluído!',
          'O culto foi excluído com sucesso.',
          'success'
        );

        setCultos(cultos.filter(culto => culto.id !== selectedCulto));
      } catch (error) {
        Swal.fire(
          'Erro!',
          'Houve um problema ao excluir o culto. Tente novamente mais tarde.',
          'error'
        );
      }
    }
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
        navigate(`/relatorio/cultos?dataInicial=${dataInicial}&dataFinal=${dataFinal}`);
      }
    });
  };

  return (
    <div className="container mt-4">
      <Typography variant="h5" gutterBottom>
        Lista de Cultos
      </Typography>
        <div className="d-flex justify-content-between mb-3">
            <button className="btn btn-success" onClick={handleNovoCulto}><IconPlus/>Novo culto</button>
            <button className="btn btn-primary" onClick={handleReport}><IconClipboard/> Gerar Relatório</button>
        </div>
      {/* Tabela de Cultos */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Data do Culto
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Local do Culto
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Turno
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
          {cultos.length > 0 ? (
            cultos.map((culto) => (
              <TableRow key={culto.id}>
                <TableCell align="center">
                  <Typography variant="body2">
                  {new Date(culto.dataCulto).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}                  
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">
                  {culto.local ? culto.local.nomeLocal : 'Local não definido'}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">
                    {culto.turnoCulto === 1 ? 'Noite' : 'Manhã'}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="menu"
                    onClick={(e) => handleMenuOpen(e, culto.id)}
                  >
                    <IconDotsVertical />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center">
                <Typography variant="body2">Nenhum culto encontrado</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Menu de ações */}
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
        <MenuItem onClick={handleViewEscalas}>Ver Escalas do Culto</MenuItem>
        <MenuItem onClick={handleEditarCulto}>Editar culto</MenuItem>
        <MenuItem style={{color: 'red'}} onClick={handleDeleteCulto}>Excluir culto</MenuItem>
      </Menu>
    </div>
  );
};

export default ListaCultos;
