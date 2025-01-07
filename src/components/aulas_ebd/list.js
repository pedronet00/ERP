import React, { useState, useEffect } from 'react';
import api from '../../axiosConfig';
import { IconEdit, IconPlus, IconClipboard } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  Typography, Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
  Pagination,
} from '@mui/material';

const EBDAulasList = () => {
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
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

  // Função para formatar a data no formato DD/MM/YYYY
  const formatarData = (data) => {
    const dateObj = new Date(`${data}T00:00:00Z`); // Adiciona 'Z' para evitar problemas de fuso horário
    const dia = String(dateObj.getUTCDate()).padStart(2, '0');
    const mes = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
    const ano = dateObj.getUTCFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  // Função para buscar aulas da API
  const fetchClasses = async () => {
    try {
      const idCliente = localStorage.getItem('idCliente');
      const apiUrl = `http://localhost:8000/api/aulaEBD?idCliente=${idCliente}`;
      const response = await api.get(apiUrl);
      setClasses(response.data);
      setFilteredClasses(response.data); // Inicialmente, mostrar todas as aulas
    } catch (error) {
      console.error("Erro ao buscar aulas:", error);
      Swal.fire("Erro!", "Ocorreu um erro ao buscar as aulas de EBD.", "error");
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  // Função para filtrar aulas
  const filterClasses = () => {
    const filtered = classes.filter(classItem =>
      classItem.dataAula.startsWith(searchDate) || searchDate === ''
    );
    setFilteredClasses(filtered);
  };

  useEffect(() => {
    filterClasses();
  }, [searchDate, classes]);

  // Função para mudar a página
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Filtrar as aulas para a página atual
  const paginatedClasses = filteredClasses.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleNewClass = () => {
    navigate('/dashboard/aulasEBD/create');
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
        navigate(`/relatorio/ebd?dataInicial=${dataInicial}&dataFinal=${dataFinal}`);
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
            
      const permissaoCadastroAulaEbd = data.find(permissao => permissao.idFuncao === 6)?.permissao; // Listagem de células
  

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Lista de Aulas de EBD</h2>
      </div>

      {/* Filtro */}
      <Box mb={3}>
        <TextField
          label="Pesquisar Data da Aula (YYYY-MM-DD)"
          variant="outlined"
          size='small'
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
      </Box>

      {permissaoCadastroAulaEbd == 1 && (
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-success" onClick={handleNewClass}><IconPlus/>Nova aula</button>
        <button className="btn btn-primary" onClick={handleReport}><IconClipboard/> Gerar Relatório</button>
      </div>
      )}

      {/* Tabela de Aulas */}
      <Table sx={{ marginTop: '2%' }}>
        <TableHead>
          <TableRow>
            <TableCell align="center"><Typography variant="subtitle2" fontWeight={600}>Data da Aula</Typography></TableCell>
            <TableCell align="center"><Typography variant="subtitle2" fontWeight={600}>Classe</Typography></TableCell>
            <TableCell align="center"><Typography variant="subtitle2" fontWeight={600}>Professor</Typography></TableCell>
            <TableCell align="center"><Typography variant="subtitle2" fontWeight={600}>Presentes</Typography></TableCell>
            <TableCell align="center"><Typography variant="subtitle2" fontWeight={600}>Lição</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedClasses.length > 0 ? (
            paginatedClasses.map((classItem) => (
              <TableRow key={classItem.id}>
                <TableCell align="center"><Typography variant="body2">{formatarData(classItem.dataAula)}</Typography></TableCell>
                <TableCell align="center"><Typography variant="body2">{classItem.classe.nomeClasse}</Typography></TableCell>
                <TableCell align="center"><Typography variant="body2">{classItem.professor.name}</Typography></TableCell>
                <TableCell align="center"><Typography variant="body2">{classItem.quantidadePresentes}</Typography></TableCell>
                <TableCell align="center"><Typography variant="body2">{classItem.numeroAula}</Typography></TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <Typography variant="body1">Nenhuma aula encontrada</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Paginação */}
      <Box display="flex" justifyContent="center" marginTop={2}>
        <Pagination
          count={Math.ceil(filteredClasses.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
    </div>
  );
};

export default EBDAulasList;
