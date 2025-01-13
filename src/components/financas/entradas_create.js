import React, { useState } from 'react';
import api from '../../axiosConfig';
import Swal from 'sweetalert2';
import { IconArrowLeft } from '@tabler/icons-react';
import { Container, Typography, Box, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router';

const CadastrarEntrada = () => {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');
  const [categoria, setCategoria] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const idCliente = localStorage.getItem('idCliente');
    const novaEntrada = {
      descricao,
      valor,
      data,
      categoria,
      idCliente
    };

    try {
      await api.post('http://localhost:8000/api/entradas', novaEntrada);
      Swal.fire('Sucesso!', 'Entrada financeira cadastrada com sucesso.', 'success');
      setDescricao('');
      setValor('');
      setData('');
      setCategoria('');

      navigate('/dashboard/financas');

    } catch (error) {
      console.error('Erro ao cadastrar entrada:', error);
      Swal.fire('Erro!', 'Ocorreu um erro ao cadastrar a entrada.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  }

  return (
    <Container maxWidth="sm">
      <div className="d-flex justify-content-between mb-3" style={{ marginTop: '2%' }}>
              <button className="btn btn-secondary" onClick={handleGoBack}>
                <IconArrowLeft /> Voltar
              </button>
            </div>
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>Cadastrar Entrada</Typography>
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
              <MenuItem value="2">Oferta</MenuItem>
              <MenuItem value="3">Doação</MenuItem>
              <MenuItem value="4">Outros</MenuItem>
            </Select>
          </FormControl>
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
              {loading ? 'Cadastrando...' : 'Cadastrar Entrada'}
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default CadastrarEntrada;
