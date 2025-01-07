import React, { useState, useEffect } from 'react';
import api from '../../axiosConfig';
import { IconX, IconEdit, IconPlus, IconClipboard, IconCheck } from '@tabler/icons-react'; // IconCheck adicionado
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  Typography, Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Pagination  // Importação do componente de paginação
} from '@mui/material';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [page, setPage] = useState(1);  // Estado para controlar a página atual
  const [rowsPerPage] = useState(5);    // Quantidade de departamentos por página (5)
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



  // Função para buscar departamentos da API
  const fetchDepartments = async () => {
    try {
      const idCliente = localStorage.getItem('idCliente'); // Pega o idCliente do localStorage
      const apiUrl = `http://localhost:8000/api/departamentos?idCliente=${idCliente}`; // Monta a URL com o idCliente como parâmetro
      const response = await api.get(apiUrl); // Alterado para HTTP
      setDepartments(response.data);
      setFilteredDepartments(response.data); // Inicialmente, mostrar todos os departamentos
    } catch (error) {
      console.error("Erro ao buscar departamentos:", error);
    }
  };

  // Função para ativar departamento
  const handleActivateDepartment = async (departmentId) => {
    const result = await Swal.fire({
      title: "Tem certeza?",
      text: "Deseja ativar este departamento?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, ativar."
    });
  
    if (result.isConfirmed) {
      try {
        await api.patch(`http://localhost:8000/api/departamento/${departmentId}/ativar`); // Alterado para HTTP
        fetchDepartments();
        Swal.fire({
          title: "Ativado!",
          text: "O departamento foi ativado.",
          icon: "success"
        });
      } catch (error) {
        console.error("Erro ao ativar departamento:", error);
        Swal.fire({
          title: "Erro!",
          text: "Ocorreu um erro ao ativar o departamento.",
          icon: "error"
        });
      }
    }
  };
  
  const handleDeactivateDepartment = async (departmentId) => {
    const result = await Swal.fire({
      title: "Tem certeza?",
      text: "Deseja desativar este departamento?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, desativar."
    });
  
    if (result.isConfirmed) {
      try {
        await api.patch(`http://localhost:8000/api/departamento/${departmentId}/desativar`); // Alterado para HTTP
        fetchDepartments();
        Swal.fire({
          title: "Desativado!",
          text: "O departamento foi desativado.",
          icon: "success"
        });
      } catch (error) {
        console.error("Erro ao desativar departamento:", error);
        Swal.fire({
          title: "Erro!",
          text: "Ocorreu um erro ao desativar o departamento.",
          icon: "error"
        });
      }
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // Função para filtrar departamentos
  const filterDepartments = () => {
    const filtered = departments.filter(department => {
      const titleMatch = department.tituloDepartamento.toLowerCase().startsWith(searchTitle.toLowerCase());
      const statusMatch = filterStatus === '' || department.statusDepartamento === parseInt(filterStatus);
      return titleMatch && statusMatch;
    });
    setFilteredDepartments(filtered);
  };

  useEffect(() => {
    filterDepartments();
  }, [searchTitle, filterStatus, departments]);

  // Função para mudar a página
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Filtrar os departamentos para a página atual
  const paginatedDepartments = filteredDepartments.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleNewUser = () => {
    navigate('/dashboard/departament/create');
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
        navigate(`/relatorio/departamentos?dataInicial=${dataInicial}&dataFinal=${dataFinal}`);
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
  
const permissaoCadastroDepartamento = data.find(permissao => permissao.idFuncao === 2)?.permissao; // Listagem de células
const permissaoEdicaoDepartamento = data.find(permissao => permissao.idFuncao === 51)?.permissao; // Listagem de células
const permissaoDesativarAtivarDepartamento = data.find(permissao => permissao.idFuncao === 67)?.permissao; // Listagem de células


  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Lista de Departamentos</h2>
      </div>

      {/* Filtros */}
      <Box mb={3} display="flex" gap={2}>
        <TextField
          label="Pesquisar Título"
          variant="outlined"
          size='small'
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <FormControl variant="outlined" sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            label="Status"
            size='small'
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="1">Ativo</MenuItem>
            <MenuItem value="0">Inativo</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {permissaoCadastroDepartamento === 1 && (
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-success" onClick={handleNewUser}><IconPlus/>Novo Departamento</button>
        <button className="btn btn-primary" onClick={handleReport}><IconClipboard/> Gerar Relatório</button>
      </div>
      )}

      {/* Tabela de Departamentos */}
      <Table sx={{ marginTop: '2%' }}>
        <TableHead>
          <TableRow>
            
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Título
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Texto
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Status
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
          {paginatedDepartments.length > 0 ? (
            paginatedDepartments.map((department) => (
              
              <TableRow key={department.id}>
                <TableCell align="center">
                  <Typography variant="body2">{department.tituloDepartamento}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">{department.textoDepartamento}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">
                    {department.statusDepartamento === 1 ? 'Ativo' : 'Inativo'}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Box display="flex" flexDirection="column" gap={1}>
                  {permissaoDesativarAtivarDepartamento == 1 && (
                    department.statusDepartamento === 1 ? (
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeactivateDepartment(department.id)}
                        startIcon={<IconX />}
                        size="small"
                      >
                        Desativar
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleActivateDepartment(department.id)}
                        startIcon={<IconCheck />}
                        size="small"
                      >
                        Ativar
                      </Button>
                    )
                  )}

                  {permissaoEdicaoDepartamento == 1 && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate(`/dashboard/departament/create/${department.id}`)}
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
              <TableCell colSpan={5} align="center">
                <Typography variant="body1">Nenhum departamento encontrado</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Paginação */}
      <Box display="flex" justifyContent="center" marginTop={2}>
        <Pagination
          count={Math.ceil(filteredDepartments.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
    </div>
  );
};

export default DepartmentList;
