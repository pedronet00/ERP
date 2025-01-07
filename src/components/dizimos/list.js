import React, { useState, useEffect } from 'react';
import api from '../../axiosConfig';
import { IconX, IconEdit, IconPlus, IconClipboard } from '@tabler/icons-react';
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
  const [dizimosPerPage] = useState(5); // Número de dízimos por página
  const navigate = useNavigate();
  const idCliente = localStorage.getItem('idCliente');
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

  // Função para formatar a data no formato DD/MM/YYYY
  const formatarData = (data) => {
    const dateObj = new Date(`${data}T00:00:00Z`); // Adiciona 'Z' para evitar problemas de fuso horário
    const dia = String(dateObj.getUTCDate()).padStart(2, '0');
    const mes = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
    const ano = dateObj.getUTCFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  // Função para buscar dízimos da API
  const fetchDizimos = async () => {
    try {
      const apiUrl = `http://localhost:8000/api/dizimos?idCliente=${idCliente}`;
      const response = await api.get(apiUrl);
      setDizimos(response.data);
      setFilteredDizimos(response.data); // Inicialmente, mostrar todos os dízimos
    } catch (error) {
      console.error("Erro ao buscar dízimos:", error);
    }
  };

  // Usar o useEffect para chamar a API quando o componente for montado
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
            navigate(`/relatorio/dizimos?dataInicial=${dataInicial}&dataFinal=${dataFinal}`);
          }
        });
      };

  // Cálculo dos índices para a paginação
  const indexOfLastDizimo = currentPage * dizimosPerPage;
  const indexOfFirstDizimo = indexOfLastDizimo - dizimosPerPage;
  const currentDizimos = filteredDizimos.slice(indexOfFirstDizimo, indexOfLastDizimo);

  useEffect(() => {
      fetchPerfilFuncao().then(fetchedData => {
        setData(fetchedData); // Atualiza o estado com os dados
      });
    }, []); // Executa apenas uma vez ao montar o componente
  
    if (data === null) {
      return []; // Retorna um array vazio enquanto os dados estão sendo carregados
    }
    
  const permissaoCadastroDizimo = data.find(permissao => permissao.idFuncao === 16)?.permissao; // Listagem de células
  

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Lista de Dízimos</h2>
      </div>
      {permissaoCadastroDizimo == 1 && (
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-success" onClick={handleNewDizimo}><IconPlus/> Novo registro</button>
        <button className="btn btn-primary" onClick={handleReport}><IconClipboard/> Gerar relatório</button>
      </div>
      )}

      {/* Tabela de Dízimos */}
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
                  <Typography variant="body2">{new Date(dizimo.dataCulto).toLocaleDateString('pt-BR', { timeZone: 'UTC' })} </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">{dizimo.turnoCulto === 0 ? 'Manhã' : 'Noite'}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">{dizimo.valorArrecadado}</Typography>
                </TableCell>
                {perfil > 3 && (
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
                  </Box>
                </TableCell>
                )}
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

      {/* Componente de Paginação */}
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
