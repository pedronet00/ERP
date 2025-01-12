import React, { useState, useEffect } from 'react';
import api from '../../axiosConfig';
import Swal from 'sweetalert2';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';

const CriarLocal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [nomeLocal, setNomeLocal] = useState('');
  const idCliente = localStorage.getItem('idCliente');

  // Parse query string to get id
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id'); // Get id from query string

  // Função para buscar os detalhes do local se estiver editando
  useEffect(() => {
    const fetchLocal = async () => {
      if (id) {
        try {
          const response = await api.get(`http://localhost:8000/api/locais/${id}`);
          const local = response.data; // Acesse o local diretamente
          
          // Defina os estados com os dados do local
          setNomeLocal(local.nomeLocal);
        } catch (error) {
          console.error('Erro ao buscar detalhes do local:', error);
          Swal.fire(
            'Erro!',
            'Não foi possível buscar os detalhes do local.',
            'error'
          );
        }
      }
    };

    fetchLocal();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const localData = {
      nomeLocal,
      idCliente
    };

    try {
      if (id) {
        // Se id estiver presente, atualize o local
        await api.put(`http://localhost:8000/api/locais/${id}`, localData);
        Swal.fire(
          'Local Atualizado!',
          'O local foi atualizado com sucesso.',
          'success'
        );
      } else {
        // Se não houver id, crie um novo local
        await api.post(`http://localhost:8000/api/locais`, localData);
        Swal.fire(
          'Local Criado!',
          'O local foi criado com sucesso.',
          'success'
        );
      }

      // Limpa o campo após o sucesso
      setNomeLocal('');
      navigate('/dashboard/locais'); // Navegue de volta para a lista de locais
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
          'Houve um problema ao criar ou atualizar o local.',
          'error'
        );
      }
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Volta para a tela anterior
  };

  return (
    <Container maxWidth="sm">
      <div className="d-flex justify-content-between mb-3" style={{ marginTop: '2%' }}>
        <button className="btn btn-secondary" onClick={handleGoBack}><IconArrowLeft /> Voltar</button>
      </div>
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          {id ? 'Editar Local' : 'Criar Novo Local'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nome do Local"
            variant="outlined"
            fullWidth
            margin="normal"
            value={nomeLocal}
            onChange={(e) => setNomeLocal(e.target.value)}
            required
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            {id ? 'Atualizar Local' : 'Criar Local'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CriarLocal;
