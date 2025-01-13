import React, { useState, useEffect } from 'react';
import api from '../../axiosConfig';
import { IconX, IconEdit, IconPlus, IconClipboard, IconTrash } from '@tabler/icons-react';
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
  Pagination
} from '@mui/material';

const DizimoList = () => {
  const [dizimos, setDizimos] = useState([]);
  const [filteredDizimos, setFilteredDizimos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dizimosPerPage] = useState(5); 
  const navigate = useNavigate();
  const idCliente = localStorage.getItem('idCliente');
  const [data, setData] = useState(null);
  const perfil = parseInt(localStorage.getItem('perfil'), 10);

  async function fetchPerfilFuncao() {
    try {
      const response = await fetch(`http://localhost:8000/api/perfis-funcoes/${perfil}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar os dados');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro na requisição:', error);
      return [];
    }
  }

  const formatarData = (data) => {
    const dateObj = new Date(`${data}T00:00:00Z`);
    const dia = String(dateObj.getUTCDate()).padStart(2, '0');
    const mes = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
    const ano = dateObj.getUTCFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  const fetchDizimos = async () => {
    try {
      const apiUrl = `http://localhost:8000/api/dizimos?idCliente=${idCliente}`;
      const response = await api.get(apiUrl);
      setDizimos(response.data);
      setFilteredDizimos(response.data);
    } catch (error) {
      console.error("Erro ao buscar dízimos:", error);
    }
  };

  useEffect(() => {
    fetchDizimos();
  }, []);

  const handleNewDizimo = () => {
    navigate('/dashboard/dizimos/create');
  };

  const handleReport = () => {
    Swal.fire({
      title: 'Gerar Relatório',
      html: `
        <p>Insira a data inicial e final para a geração do relatório.</p>
        <input type="date" id="dataInicial" class="swal2-input" placeholder="Data Inicial">
        <input type="date" id="dataFinal" class="swal2-input" placeholder="Data Final">
      `,
      showCancelButton: true,
      confirmButtonText: 'Gerar Relatório',
      cancelButtonText: 'Cancelar',
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
        navigate(`/relatorio/dizimos?dataInicial=${dataInicial}&dataFinal=${dataFinal}`);
      }
    });
  };

  const handleDeleteDizimo = (id) => {
    Swal.fire({
      title: 'Tem certeza?',
      text: "Esta ação não poderá ser desfeita!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        api.delete(`http://localhost:8000/api/dizimos/${id}`)
          .then(() => {
            setDizimos(dizimos.filter(dizimo => dizimo.id !== id));
            setFilteredDizimos(filteredDizimos.filter(dizimo => dizimo.id !== id));
            Swal.fire('Excluído!', 'O dízimo foi excluído com sucesso.', 'success');
          })
          .catch((error) => {
            console.error("Erro ao excluir o dízimo:", error);
            Swal.fire('Erro!', 'Houve um problema ao excluir o dízimo.', 'error');
          });
      }
    });
  };

  const indexOfLastDizimo = currentPage * dizimosPerPage;
  const indexOfFirstDizimo = indexOfLastDizimo - dizimosPerPage;
  const currentDizimos = filteredDizimos.slice(indexOfFirstDizimo, indexOfLastDizimo);

  useEffect(() => {
    fetchPerfilFuncao().then(fetchedData => {
      setData(fetchedData);
    });
  }, []);

  if (data === null) {
    return [];
  }

  const permissaoCadastroDizimo = data.find(permissao => permissao.idFuncao === 16)?.permissao;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Lista de Dízimos</h2>
      </div>
      {permissaoCadastroDizimo == 1 && (
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-success" onClick={handleNewDizimo}><IconPlus /> Novo registro</button>
          <button className="btn btn-primary" onClick={handleReport}><IconClipboard /> Gerar relatório</button>
        </div>
      )}
      <Table sx={{ marginTop: '2%' }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>Data do Culto</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>Turno do Culto</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>Valor arrecadado</Typography>
            </TableCell>
            {perfil > 3 && (
              <TableCell align="center">
                <Typography variant="subtitle2" fontWeight={600}>Ações</Typography>
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {currentDizimos.length > 0 ? (
            currentDizimos.map((dizimo) => (
              <TableRow key={dizimo.id}>
                <TableCell align="center">
                  <Typography variant="body2">{new Date(dizimo.dataCulto).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">{dizimo.turnoCulto === 0 ? 'Manhã' : 'Noite'}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">{dizimo.valorArrecadado}</Typography>
                </TableCell>
                {/* {perfil > 3 && ( */}
                  <TableCell align="center">
                    <Box display="flex" flexDirection="column" gap={1}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate(`/dizimos/edit/${dizimo.id}`)}
                        startIcon={<IconEdit />}
                        size="small"
                      >
                        Editar
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDeleteDizimo(dizimo.id)}
                        startIcon={<IconTrash />}
                        size="small"
                      >
                        Excluir
                      </Button>
                    </Box>
                  </TableCell>
                {/* )} */}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <Typography variant="body2">Nenhum dízimo encontrado</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={Math.ceil(filteredDizimos.length / dizimosPerPage)}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          color="primary"
        />
      </Box>
    </div>
  );
};

export default DizimoList;
