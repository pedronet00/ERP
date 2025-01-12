import React, { useState, useEffect } from 'react';
import api from '../../axiosConfig';
import Swal from 'sweetalert2';
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
  MenuItem,
} from '@mui/material';
import { IconDotsVertical, IconClipboard, IconPlus, IconArrowLeft } from '@tabler/icons-react';
import { useParams, useNavigate } from 'react-router-dom';

const ListaMembrosCelula = () => {
  const [members, setMembers] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const { idCelula } = useParams();
  const navigate = useNavigate();

  const fetchMembers = async () => {
    try {
      const idCliente = localStorage.getItem('idCliente');
      const apiUrl = `http://localhost:8000/api/membrosCelulas?idCelula=${idCelula}&idCliente=${idCliente}`;
      const response = await api.get(apiUrl);
      setMembers(response.data);
    } catch (error) {
      console.error('Erro ao buscar membros:', error);
    }
  };

  useEffect(() => {
    if (idCelula) fetchMembers();
  }, [idCelula]);

  const handleMenuOpen = (event, member) => {
    setAnchorEl(event.currentTarget);
    setSelectedMember(member);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedMember(null);
  };

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleDeleteMember = async () => {
    handleMenuClose();

    Swal.fire({
      title: 'Tem certeza?',
      text: `Deseja excluir o membro ${selectedMember?.pessoa.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`http://localhost:8000/api/membrosCelulas/${selectedMember.id}`);
          Swal.fire('Excluído!', 'O membro foi excluído com sucesso.', 'success');
          fetchMembers();
        } catch (error) {
          console.error('Erro ao excluir membro:', error);
          Swal.fire('Erro!', 'Não foi possível excluir o membro.', 'error');
        }
      }
    });
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3" style={{ marginTop: '2%' }}>
        <button className="btn btn-secondary" onClick={handleGoBack}>
          <IconArrowLeft /> Voltar
        </button>
      </div>
      <h2>Lista de Membros da Célula</h2>
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-success" onClick={() => navigate(`/dashboard/membrosCelula/${idCelula}/adicionar`)}>
          <IconPlus /> Novo Membro
        </button>
        <button className="btn btn-primary" onClick={() => navigate('/relatorio/membros')}>
          <IconClipboard /> Gerar Relatório
        </button>
      </div>
      <Table sx={{ marginTop: '2%' }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">Nome</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {members.length > 0 ? (
            members.map((member) => (
              <TableRow key={member.id}>
                <TableCell align="center">{member.pessoa.name}</TableCell>
                <TableCell align="center">{member.pessoa.email}</TableCell>
                <TableCell align="center">{member.status === 1 ? 'Ativo' : 'Inativo'}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={(e) => handleMenuOpen(e, member)}>
                    <IconDotsVertical />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                Nenhum membro encontrado
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
        <MenuItem onClick={handleDeleteMember} style={{ color: 'red' }}>
          Excluir Membro
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ListaMembrosCelula;
