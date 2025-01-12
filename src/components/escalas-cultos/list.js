import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../../axiosConfig';
import {
  IconX,
  IconEdit,
  IconPlus,
  IconClipboard,
  IconCheck,
  IconBrandWhatsapp,
  IconArrowLeft,
  IconDotsVertical // Ícone dos três pontinhos
} from '@tabler/icons-react'; // IconCheck adicionado
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import Swal from 'sweetalert2'; // Importa o SweetAlert2

const ListaEscalasCulto = () => {
  const [escalas, setEscalas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const idCulto = searchParams.get('idCulto'); // Obtém o idCulto da URL
  const [anchorEl, setAnchorEl] = useState(null); // Estado para o menu
  const [currentEscala, setCurrentEscala] = useState(null); // Estado para a escala selecionada

  // Função para buscar as escalas de culto
  const fetchEscalas = async () => {
    try {
      if (!idCulto) {
        throw new Error('ID do culto não fornecido.');
      }

      const apiUrl = `http://localhost:8000/api/escalas-cultos?idCulto=${idCulto}`;
      const response = await api.get(apiUrl);
      setEscalas(response.data); // Atualiza as escalas na state
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Erro ao buscar escalas');
      setLoading(false);
    }
  };

  // Chama a API ao montar o componente
  useEffect(() => {
    fetchEscalas();
  }, [idCulto]);

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6">Carregando escalas...</Typography>
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

  const handleNovaEscala = () => {
    navigate(`/dashboard/escalas-cultos/create?idCulto=${idCulto}`);
  };

  const handleGoBack = () => {
    navigate(-1);
  }

  const handleReport = () => {
    
    navigate(`/relatorio/escala-culto?idCulto=${idCulto}`);
      
  };

  const handleMenuClick = (event, escala) => {
    setAnchorEl(event.currentTarget); // Abre o menu para a escala selecionada
    setCurrentEscala(escala);
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Fecha o menu
    setCurrentEscala(null);
  };

  const handleEditEscala = () => {
    navigate(`/dashboard/escalas-cultos/create?idCulto=${idCulto}&idEscala=${currentEscala.id}`);
    handleMenuClose();
  };

  const handleDeleteEscala = async () => {
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
        const response = await api.delete('http://localhost:8000/api/escala-culto', {
          data: { id: currentEscala.id } // Envia o id no corpo da requisição
        });
  
        Swal.fire(
          'Excluído!',
          'A escala foi excluída com sucesso.',
          'success'
        );
  
        // Atualiza a lista de escalas após a exclusão
        setEscalas(escalas.filter(escala => escala.id !== currentEscala.id));
      } catch (error) {
        Swal.fire(
          'Erro!',
          'Houve um problema ao excluir a escala. Tente novamente mais tarde.',
          'error'
        );
      }
    }
  };

  const handleWhatsappMessage = () => {
    if (!currentEscala) return;
    const { pessoa, funcao_culto } = currentEscala;
    const numeroTelefone = '5518988075144'; // Número de telefone fixo para o exemplo
    const mensagem = `Olá, ${pessoa.name}! Você está escalado para o culto na função de ${funcao_culto.nomeFuncao}. Data: ${new Date().toLocaleDateString()}.`;
  
    // Codifica a mensagem para inseri-la na URL
    const mensagemCodificada = encodeURIComponent(mensagem);
    const urlWhatsapp = `https://api.whatsapp.com/send?phone=${numeroTelefone}&text=${mensagemCodificada}`;
  
    // Abre a URL do WhatsApp em uma nova aba
    window.open(urlWhatsapp, '_blank');
  
    handleMenuClose();
  };
  
  

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3" style={{ marginTop: '2%' }}>
        <button className="btn btn-secondary" onClick={handleGoBack}><IconArrowLeft /> Voltar</button>
      </div>
      <Typography variant="h5" gutterBottom style={{ marginTop: '5%' }}>
        Lista de Escalas do Culto
      </Typography>
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-success" onClick={handleNovaEscala}><IconPlus/>Nova escala</button>
        <button className="btn btn-primary" onClick={handleReport}><IconClipboard/> Gerar Relatório</button>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Nome da Função
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Nome da Pessoa
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                E-mail da Pessoa
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
          {escalas.length > 0 ? (
            escalas.map((escala) => (
              <TableRow key={escala.id}>
                <TableCell align="center">
                  <Typography variant="body2">
                    {escala.funcao_culto?.nomeFuncao || 'N/A'}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">{escala.pessoa?.name || 'N/A'}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">{escala.pessoa?.email || 'N/A'}</Typography>
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={(event) => handleMenuClick(event, escala)}>
                    <IconDotsVertical />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleEditEscala}>
                      Editar escala
                    </MenuItem>
                    <MenuItem onClick={handleWhatsappMessage}>
                      Lembrete &nbsp;
                      <IconBrandWhatsapp style={{ fontWeight: 100, width: '15px', height: '15px' }} />
                    </MenuItem>

                    <MenuItem style={{color: 'red'}} onClick={handleDeleteEscala}>
                      Excluir escala
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                <Typography variant="body2">Nenhuma escala encontrada</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListaEscalasCulto;
