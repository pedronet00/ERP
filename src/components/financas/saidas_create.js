import React, { useState } from 'react';
import api from '../../axiosConfig';
import Swal from 'sweetalert2';
import { Container, Typography, Box, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const CadastrarSaida = () => {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');
  const [categoria, setCategoria] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const idCliente = localStorage.getItem('idCliente');
    const novaSaida = {
      descricao,
      valor,
      data,
      categoria,
      idCliente
    };

    try {
      await api.post('http://localhost:8000/api/saidas', novaSaida);
      Swal.fire('Sucesso!', 'Saída financeira cadastrada com sucesso.', 'success');
      setDescricao('');
      setValor('');
      setData('');
      setCategoria('');
    } catch (error) {
      console.error('Erro ao cadastrar saída:', error);
      Swal.fire('Erro!', 'Ocorreu um erro ao cadastrar a saída.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>Cadastrar Saída</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Descrição"
            fullWidth
            variant="outlined"
            margin="normal"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
          <TextField
            label="Valor"
            fullWidth
            variant="outlined"
            margin="normal"
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
          />
          <TextField
            label="Data"
            fullWidth
            variant="outlined"
            margin="normal"
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Categoria</InputLabel>
            <Select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              required
            >
              <MenuItem value="1">Salários</MenuItem>
              <MenuItem value="2">Manutenção</MenuItem>
              <MenuItem value="3">Compra de Material</MenuItem>
              <MenuItem value="4">Outros</MenuItem>
            </Select>
          </FormControl>
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
              {loading ? 'Cadastrando...' : 'Cadastrar Saída'}
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default CadastrarSaida;
