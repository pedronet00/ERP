import React, { useState, useEffect } from 'react'; 
import api from '../../axiosConfig';
import Swal from 'sweetalert2';
import { IconX, IconEdit, IconPlus, IconClipboard, IconCheck, IconDotsVertical } from '@tabler/icons-react';
import { Container, Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, TextField, Select, MenuItem, InputLabel, FormControl, Chip, Button, IconButton, Menu } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Financas = () => {
  const [entradas, setEntradas] = useState([]);
  const [saidas, setSaidas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterCategoria, setFilterCategoria] = useState('');
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const idCliente = localStorage.getItem('idCliente');  
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

  useEffect(() => {
    const fetchFinancas = async () => {
      try {
        const entradasResponse = await api.get(`http://localhost:8000/api/entradas?idCliente=${idCliente}`);
        const saidasResponse = await api.get(`http://localhost:8000/api/saidas?idCliente=${idCliente}`);
        setEntradas(entradasResponse.data);
        setSaidas(saidasResponse.data);
      } catch (error) {
        console.error("Erro ao buscar entradas e saídas:", error);
        Swal.fire('Erro!', 'Não foi possível buscar os dados financeiros.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchFinancas();
  }, [idCliente]);

  const handleSearch = () => {
    return {
      entradas: entradas.filter(entrada => 
        entrada.descricao.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterDate === '' || entrada.data === filterDate) &&
        (filterCategoria === '' || entrada.categoria_id === parseInt(filterCategoria))
      ),
      saidas: saidas.filter(saida => 
        saida.descricao.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterDate === '' || saida.data === filterDate) &&
        (filterCategoria === '' || saida.categoria_id === parseInt(filterCategoria))
      )
    };
  };

  const filteredData = handleSearch();

  const handleNewEntrada = () => {
    navigate('/dashboard/entradas/create');
  };

  const handleNewSaida = () => {
    navigate('/dashboard/saidas/create');
  };

  const handleReport = () => {
    navigate('/relatorio/financas');
  };

  const handleMenuClick = (event, item) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  const handleDelete = async (type, id) => {
    handleMenuClose();
    const result = await Swal.fire({
      title: 'Tem certeza?',
      text: "Você não poderá reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!'
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`http://localhost:8000/api/${type}/${id}`);
        Swal.fire('Excluído!', 'O registro foi excluído.', 'success');
        setEntradas(entradas.filter(entrada => entrada.id !== id));
        setSaidas(saidas.filter(saida => saida.id !== id));
      } catch (error) {
        Swal.fire('Erro!', 'Não foi possível excluir o registro.', 'error');
      }
    }
  };

  const groupByMonth = (data) => {
    return data.reduce((acc, item) => {
      const [ano, mes] = item.data.split('-'); // Extrair ano e mês da data
      const monthYear = `${new Date(ano, mes - 1).toLocaleString('pt-BR', { month: 'long' })} ${ano}`; // Formatar o mês e ano
  
      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }
      acc[monthYear].push(item);
      return acc;
    }, {});
  };
  

  const groupedEntradas = groupByMonth(filteredData.entradas);
  const groupedSaidas = groupByMonth(filteredData.saidas);

  useEffect(() => {
    fetchPerfilFuncao().then(fetchedData => {
      setData(fetchedData); // Atualiza o estado com os dados
    });
  }, []); // Executa apenas uma vez ao montar o componente

  if (data === null) {
    return []; // Retorna um array vazio enquanto os dados estão sendo carregados
  }
  
  const permissaoCadastroEntradas = data.find(permissao => permissao.idFuncao === 13)?.permissao; // Listagem de células
  const permissaoCadastroSaidas = data.find(permissao => permissao.idFuncao === 14)?.permissao; // Listagem de células

  return (
    <Container maxWidth="lg">
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>Finanças da Igreja</Typography>

        <Box mb={3} display="flex" gap={2}>
          <TextField
            label="Pesquisar Descrição"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <TextField
            label="Filtrar por Data"
            type="date"
            variant="outlined"
            size="small"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <FormControl variant="outlined" sx={{ minWidth: 150 }}>
            <InputLabel>Categoria</InputLabel>
            <Select
              value={filterCategoria}
              onChange={(e) => setFilterCategoria(e.target.value)}
              label="Categoria"
              size="small"
            >
              <MenuItem value="">Todas</MenuItem>
              <MenuItem value="1">Dízimo</MenuItem>
              <MenuItem value="2">Oferta</MenuItem>
              <MenuItem value="3">Salários</MenuItem>
              <MenuItem value="4">Manutenção</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {permissaoCadastroEntradas == 1 && (
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-success" onClick={handleNewEntrada}><IconPlus/>Nova entrada</button>
          <button className="btn btn-primary" onClick={handleReport}><IconClipboard/> Gerar Relatório</button>
        </div>
        )}

        {loading ? (
          <Typography variant="body1">Carregando...</Typography>
        ) : (
          <>
            {Object.keys(groupedEntradas).map(month => (
              <div key={month}>
                <Typography variant="h6" gutterBottom style={{'backgroundColor': 'lightgreen','padding': '1%', 'color': 'white'}}>
                  Entradas de {month}
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Descrição</TableCell>
                      <TableCell>Data</TableCell>
                      <TableCell>Categoria</TableCell>
                      <TableCell>Valor</TableCell>
                      <TableCell>Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {groupedEntradas[month].length > 0 ? (
                      groupedEntradas[month].map((entrada) => (
                        <TableRow key={entrada.id}>
                          <TableCell>{entrada.descricao}</TableCell>
                          <TableCell>{entrada.data.split('-').reverse().join('/')}</TableCell>
                          <TableCell>
                            <Chip label={entrada.categoria === 1 ? 'Dízimo' : entrada.categoria === 2 ? 'Oferta' : entrada.categoria === 3 ? 'Doação' : 'Outros'}/>
                          </TableCell>
                          <TableCell>R$ {entrada.valor}</TableCell>
                          <TableCell>
                            <IconButton onClick={(event) => handleMenuClick(event, { type: 'entradas', id: entrada.id })}>
                              <IconDotsVertical />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} align="center">Nenhuma entrada encontrada</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            ))}
            {permissaoCadastroSaidas == 1 && (
            <button className="btn btn-danger" onClick={handleNewSaida}><IconPlus/>Nova saída</button>
            )}
            {Object.keys(groupedSaidas).map(month => (
              <div key={month}>
                <Typography variant="h6" gutterBottom sx={{ marginTop: 4 }} style={{'backgroundColor': '#f58d8d','padding': '1%', 'color': 'white'}}>
                  Saídas de {month}
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Descrição</TableCell>
                      <TableCell>Data</TableCell>
                      <TableCell>Categoria</TableCell>
                      <TableCell>Valor</TableCell>
                      <TableCell>Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {groupedSaidas[month].length > 0 ? (
                      groupedSaidas[month].map((saida) => (
                        <TableRow key={saida.id}>
                          <TableCell>{saida.descricao}</TableCell>
                          <TableCell>{saida.data.split('-').reverse().join('/')}</TableCell>
                          <TableCell>
                            <Chip label={saida.categoria=== 1 ? 'Salários' : saida.categoria === 2 ? 'Manutenção' : saida.categoria === 3 ? 'Materiais' : 'Outros'}  />
                          </TableCell>
                          <TableCell>R$ {saida.valor}</TableCell>
                          <TableCell>
                            <IconButton onClick={(event) => handleMenuClick(event, { type: 'saidas', id: saida.id })}>
                              <IconDotsVertical />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} align="center">Nenhuma saída encontrada</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            ))}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => handleDelete(selectedItem.type, selectedItem.id)}>Excluir</MenuItem>
            </Menu>
          </>
        )}
      </Box>
    </Container>
  );
};

export default Financas;
