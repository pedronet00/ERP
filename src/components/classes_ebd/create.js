import React, { useState, useEffect } from 'react';
import api from '../../axiosConfig';
import Swal from 'sweetalert2';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const CriarClasseAula = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [nomeClasse, setNomeClasse] = useState('');
  const [quantidadeMembros, setQuantidadeMembros] = useState('');
  const idCliente = localStorage.getItem('idCliente');

  // Parse query string to get id
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id'); // Get id from query string

  // Fetch class details if editing
  useEffect(() => {
    const fetchClasse = async () => {
      if (id) {
        try {
          const response = await api.get(`http://localhost:8000/api/classesEBD/${id}`);
          const classe = response.data;

          // Set the state with the fetched data
          setNomeClasse(classe.nomeClasse);
          setQuantidadeMembros(classe.quantidadeMembros.toString());
        } catch (error) {
          console.error('Erro ao buscar detalhes da classe:', error);
          Swal.fire(
            'Erro!',
            'Não foi possível buscar os detalhes da classe.',
            'error'
          );
        }
      }
    };

    fetchClasse();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const classeData = {
      nomeClasse,
      quantidadeMembros: parseInt(quantidadeMembros), // Convert to integer
      idCliente
    };

    try {
      if (id) {
        // Update class if id is present
        await api.put(`http://localhost:8000/api/classesEBD/${id}`, classeData);
        Swal.fire(
          'Classe Atualizada!',
          'A classe foi atualizada com sucesso.',
          'success'
        );
      } else {
        // Create a new class if no id
        await api.post('http://localhost:8000/api/classesEBD', classeData);
        Swal.fire(
          'Classe Criada!',
          'A classe foi criada com sucesso.',
          'success'
        );
      }

      // Clear fields after success
      setNomeClasse('');
      setQuantidadeMembros('');
      navigate('/dashboard/classesEBD'); // Navigate back to the classes list
    } catch (error) {
      if (error.response && error.response.data.error) {
        Swal.fire(
          'Erro!',
          error.response.data.error,
          'error'
        );
      } else {
        Swal.fire(
          'Erro!',
          'Houve um problema ao criar ou atualizar a classe.',
          'error'
        );
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          {id ? 'Editar Classe de Aula' : 'Criar Nova Classe de Aula'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nome da Classe"
            variant="outlined"
            fullWidth
            margin="normal"
            value={nomeClasse}
            onChange={(e) => setNomeClasse(e.target.value)}
            required
          />

          <TextField
            label="Quantidade de Membros"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            value={quantidadeMembros}
            onChange={(e) => setQuantidadeMembros(e.target.value)}
            required
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            {id ? 'Atualizar Classe' : 'Criar Classe'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CriarClasseAula;
