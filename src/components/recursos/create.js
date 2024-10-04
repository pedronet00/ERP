import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { TextField, MenuItem, Button, Container, Typography, Box } from '@mui/material';

const RecursosCreate = () => {
  const [nomeRecurso, setNomeRecurso] = useState('');
  const [categoriaRecurso, setCategoriaRecurso] = useState(''); // Estado para a categoria selecionada
  const [tipoRecurso, setTipoRecurso] = useState(''); // Estado para o tipo selecionado
  const [quantidadeRecurso, setQuantidadeRecurso] = useState(''); // Estado para quantidade
  const [categoriaRecursoList, setCategoriaRecursoList] = useState([]);
  const [tipoRecursoList, setTipoRecursoList] = useState([]);

  // Listando categorias de recursos
  const fetchCategoriaRecurso = async () => {
    try {
      const response = await axios.get('https://apoleon.com.br/api-estagio/public/api/categoriaRecurso');
      setCategoriaRecursoList(response.data);
    } catch (error) {
      console.error("Erro ao buscar categorias de recursos:", error);
    }
  };

  // Listando tipos de recursos
  const fetchTipoRecurso = async () => {
    try {
      const response = await axios.get('https://apoleon.com.br/api-estagio/public/api/tipoRecurso');
      setTipoRecursoList(response.data);
    } catch (error) {
      console.error("Erro ao buscar tipos de recursos:", error);
    }
  };

  // Carregar categorias e tipos ao montar o componente
  useEffect(() => {
    fetchCategoriaRecurso();
    fetchTipoRecurso();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const novoRecurso = {
      nomeRecurso,
      categoriaRecurso,
      tipoRecurso,
      quantidadeRecurso,
    };

    axios.post('https://apoleon.com.br/api-estagio/public/api/recurso', novoRecurso)
      .then(() => {
        Swal.fire(
          'Recurso criado!',
          'O recurso foi criado com sucesso.',
          'success'
        );
        // Limpa os campos após o sucesso
        setNomeRecurso('');
        setCategoriaRecurso('');
        setTipoRecurso('');
        setQuantidadeRecurso('');
      })
      .catch((error) => {
        if (error.response && error.response.data.error) {
          Swal.fire(
            'Erro!',
            error.response.data.error,
            'error'
          );
        } else {
          Swal.fire(
            'Erro!',
            'Houve um problema ao criar o recurso.',
            'error'
          );
        }
      });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Criar novo recurso
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nome do recurso"
            variant="outlined"
            fullWidth
            margin="normal"
            value={nomeRecurso}
            onChange={(e) => setNomeRecurso(e.target.value)}
            required
          />

          <TextField
            select
            label="Categoria do recurso"
            variant="outlined"
            fullWidth
            margin="normal"
            value={categoriaRecurso}
            onChange={(e) => setCategoriaRecurso(e.target.value)}
            required
          >
            <MenuItem value="">
              <em>Selecione uma categoria</em>
            </MenuItem>
            {categoriaRecursoList.map((categoriaRecursoItem) => (
              <MenuItem key={categoriaRecursoItem.id} value={categoriaRecursoItem.id}>
                {categoriaRecursoItem.categoriaRecurso}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Tipo do recurso"
            variant="outlined"
            fullWidth
            margin="normal"
            value={tipoRecurso}
            onChange={(e) => setTipoRecurso(e.target.value)}
            required
          >
            <MenuItem value="">
              <em>Selecione um tipo</em>
            </MenuItem>
            {tipoRecursoList.map((tipoRecursoItem) => (
              <MenuItem key={tipoRecursoItem.id} value={tipoRecursoItem.id}>
                {tipoRecursoItem.tipoRecurso}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Quantidade"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={quantidadeRecurso}
            onChange={(e) => setQuantidadeRecurso(e.target.value)}
            required
          />

          <Button variant="contained" color="primary" type="submit" fullWidth sx={{ marginTop: 2 }}>
            Criar recurso
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default RecursosCreate;
