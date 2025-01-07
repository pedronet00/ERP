import React, { useState, useEffect } from 'react';
import api from '../../axiosConfig';
import { IconX, IconEdit, IconPlus, IconClipboard, IconCheck } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  Typography, Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Button,
  Pagination, // Importa o componente de Paginação
} from '@mui/material';

const MissoesList = () => {
  const [missoes, setMissoes] = useState([]);
  const [filteredMissoes, setFilteredMissoes] = useState([]);
  const [filterNome, setFilterNome] = useState('');
  const [filterCidade, setFilterCidade] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Estado da página atual
  const [usersPerPage] = useState(5); // Número de missões por página
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


  const fetchMissoes = async () => {
    try {
      const idCliente = localStorage.getItem('idCliente');
      const apiUrl = `http://localhost:8000/api/missoes?idCliente=${idCliente}`;
      const response = await api.get(apiUrl);
      setMissoes(response.data);
      setFilteredMissoes(response.data);
    } catch (error) {
      console.error('Erro ao buscar missões:', error);
    }
  };

  useEffect(() => {
    fetchMissoes();
  }, []);

  useEffect(() => {
    const filtered = missoes.filter((missao) =>
      missao.nomeMissao.toLowerCase().startsWith(filterNome.toLowerCase()) &&
      missao.cidadeMissao.toLowerCase().startsWith(filterCidade.toLowerCase())
    );
    setFilteredMissoes(filtered);
  }, [filterNome, filterCidade, missoes]);

  const handleNewUser = () => {
    navigate('/dashboard/missoes/create');
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
          navigate(`/relatorio/missoes?dataInicial=${dataInicial}&dataFinal=${dataFinal}`);
        }
      });
    };

  const ativarMissao = async (id) => {
    const result = await Swal.fire({
      title: "Tem certeza?",
      text: "Deseja ativar esta missão?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, ativar."
    });
  
    if (result.isConfirmed) {
      try {
        await api.patch(`http://localhost:8000/api/missoes/${id}/ativar`); // Corrigido para incluir 'http://'
        fetchMissoes();
        Swal.fire({
          title: "Ativada!",
          text: "A missão foi ativada com sucesso.",
          icon: "success"
        });
      } catch (error) {
        console.error("Erro ao ativar a missão:", error);
        Swal.fire({
          title: "Erro!",
          text: "Ocorreu um erro ao ativar a missão.",
          icon: "error"
        });
      }
    }
  };
  
  const desativarMissao = async (id) => {
    const result = await Swal.fire({
      title: "Tem certeza?",
      text: "Deseja desativar esta missão?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, desativar."
    });
  
    if (result.isConfirmed) {
      try {
        await api.patch(`http://localhost:8000/api/missoes/${id}/desativar`); // Corrigido para incluir 'http://'
        fetchMissoes();
        Swal.fire({
          title: "Desativada!",
          text: "A missão foi desativada com sucesso.",
          icon: "success"
        });
      } catch (error) {
        console.error("Erro ao desativar a missão:", error);
        Swal.fire({
          title: "Erro!",
          text: "Ocorreu um erro ao desativar a missão.",
          icon: "error"
        });
      }
    }
  };

  // Cálculos para paginação
  const indexOfLastMission = currentPage * usersPerPage;
  const indexOfFirstMission = indexOfLastMission - usersPerPage;
  const currentMissoes = filteredMissoes.slice(indexOfFirstMission, indexOfLastMission);

  useEffect(() => {
          fetchPerfilFuncao().then(fetchedData => {
            setData(fetchedData); // Atualiza o estado com os dados
          });
        }, []); // Executa apenas uma vez ao montar o componente
      
        if (data === null) {
          return []; // Retorna um array vazio enquanto os dados estão sendo carregados
        }
        
  const permissaoCadastroMissoes = data.find(permissao => permissao.idFuncao === 4)?.permissao; // Listagem de células
  const permissaoAtivarDesativarMissao = data.find(permissao => permissao.idFuncao === 69)?.permissao; // Listagem de células
  const permissaoEditarMissao = data.find(permissao => permissao.idFuncao === 53)?.permissao; // Listagem de células
  

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Lista de Missões</h2>
      </div>

      <Box mb={3} display="flex" gap={2}>
        <TextField
          label="Filtrar por Nome"
          variant="outlined"
          size="small"
          value={filterNome}
          onChange={(e) => setFilterNome(e.target.value)}
        />
        <TextField
          label="Filtrar por Cidade"
          variant="outlined"
          size="small"
          value={filterCidade}
          onChange={(e) => setFilterCidade(e.target.value)}
        />
      </Box>

      {permissaoCadastroMissoes == 1 && (
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-success" onClick={handleNewUser}><IconPlus /> Nova Missão</button>
        <button className="btn btn-primary" onClick={handleReport}><IconClipboard /> Gerar Relatório</button>
      </div>
      )}

      <Table sx={{ marginTop: '2%' }}>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography align="center" variant="subtitle2" fontWeight={600}>
                Nome
              </Typography>
            </TableCell>
            <TableCell>
              <Typography align="center" variant="subtitle2" fontWeight={600}>
                Cidade
              </Typography>
            </TableCell>
            <TableCell>
              <Typography align="center" variant="subtitle2" fontWeight={600}>
                Membros
              </Typography>
            </TableCell>
            <TableCell>
              <Typography align="center" variant="subtitle2" fontWeight={600}>
                Pastor titular
              </Typography>
            </TableCell>
            {perfil > 2 && (
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Ações
              </Typography>
            </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {currentMissoes.length > 0 ? (
            currentMissoes.map((missao) => (
              <TableRow key={missao.id}>
                <TableCell>
                  <Typography align="center" variant="body2">{missao.nomeMissao}</Typography>
                </TableCell>
                <TableCell>
                  <Typography align="center" variant="body2">{missao.cidadeMissao}</Typography>
                </TableCell>
                <TableCell>
                  <Typography align="center" variant="body2">{missao.quantidadeMembros}</Typography>
                </TableCell>
                <TableCell>
                  <Typography align="center" variant="body2">{missao.pastor_titular.name}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Box display="flex" flexDirection="column" gap={1}>
                    {permissaoAtivarDesativarMissao == 1 && (
                    missao.statusMissao == 1 ? (
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => desativarMissao(missao.id)}
                        startIcon={<IconX />}
                        size="small"
                      >
                        Desativar
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => ativarMissao(missao.id)}
                        startIcon={<IconCheck />}
                        size="small"
                      >
                        Ativar
                      </Button>
                    )
                  )}
                  
                    {permissaoEditarMissao == 1 && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate(`/dashboard/missoes/create/${missao.id}`)}
                      startIcon={<IconEdit />}
                      size="small"
                    >
                      Editar
                    </Button>
                    )}
                  </Box>
                </TableCell>

              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <Typography variant="body2">Nenhuma missão encontrada</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Componente de Paginação */}
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={Math.ceil(filteredMissoes.length / usersPerPage)}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          color="primary"
        />
      </Box>
    </div>
  );
};

export default MissoesList;
