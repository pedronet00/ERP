import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { IconX, IconEdit, IconPlus, IconClipboard, IconCheck } from '@tabler/icons-react';
import { Container, Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, TextField, Select, MenuItem, InputLabel, FormControl, Chip, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Financas = () => {
  const [entradas, setEntradas] = useState([]);
  const [saidas, setSaidas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterCategoria, setFilterCategoria] = useState('');
  const [loading, setLoading] = useState(true);
  const nivelUsuario = localStorage.getItem('nivelUsuario');
  const idCliente = localStorage.getItem('idCliente');  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFinancas = async () => {
      try {
        const entradasResponse = await axios.get(`http://localhost:8000/api/entradas?idCliente=${idCliente}`);
        const saidasResponse = await axios.get(`http://localhost:8000/api/saidas?idCliente=${idCliente}`);
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
    navigate('/entradas/create');
  };

  const handleNewSaida = () => {
    navigate('/saidas/create');
  };

  const handleReport = () => {
    navigate('/relatorio/financas');
  };

  // Função para agrupar entradas e saídas por mês
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
        {nivelUsuario > 2 && (
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-success" onClick={handleNewEntrada}><IconPlus/>Nova entrada</button>
          <button className="btn btn-primary" onClick={handleReport}><IconClipboard/> Gerar Relatório</button>
        </div>
        )}

        {loading ? (
          <Typography variant="body1">Carregando...</Typography>
        ) : (
          <>
            {/* Tabela de Entradas por Mês */}
            
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
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {groupedEntradas[month].length > 0 ? (
                      groupedEntradas[month].map((entrada) => (
                        <TableRow key={entrada.id}>
                          <TableCell>{entrada.descricao}</TableCell>
                          <TableCell>{entrada.data.split('-').reverse().join('/')}</TableCell>
                          <TableCell>
                            <Chip label={entrada.categoria === 1 ? 'Dízimo' : entrada.categoria === 2 ? 'Oferta' : 'Outros'} />
                          </TableCell>
                          <TableCell>R$ {entrada.valor}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} align="center">Nenhuma entrada encontrada</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            ))}
            {nivelUsuario > 2 && (
            <button className="btn btn-danger" onClick={handleNewSaida}><IconPlus/>Nova saída</button>
            )}
            {/* Tabela de Saídas por Mês */}
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
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} align="center">Nenhuma saída encontrada</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            ))}
          </>
        )}
      </Box>
    </Container>
  );
};

export default Financas;
