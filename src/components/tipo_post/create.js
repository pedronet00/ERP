import React, { useState, useEffect } from 'react';
import api from '../../axiosConfig';
import Swal from 'sweetalert2';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';

const CriarTipoPost = () => {
  const { tipoPostId } = useParams(); // Obtenha o ID do tipo de post da URL, se estiver editando
  const [tipoPost, setTipoPost] = useState(''); // Estado inicial definido como string vazia
  const navigate = useNavigate();

  // Função para buscar os detalhes do tipo de post se estiver editando
  useEffect(() => {
    const fetchTipoPost = async () => {
      if (tipoPostId) {
        try {
          const response = await api.get(`http://localhost:8000/api/tipoPost/${tipoPostId}`);
          console.log('Response completa:', response);

          // Acessa o campo tipoPost
          const tipoPostData = response.data.tipoPost?.tipoPost || response.data.tipoPost?.TipoPost || '';
          console.log('tipoPost:', tipoPostData);

          setTipoPost(tipoPostData); // Define o estado com o valor correto
        } catch (error) {
          console.error('Erro ao buscar detalhes do tipo de post:', error);
          Swal.fire(
            'Erro!',
            'Não foi possível buscar os detalhes do tipo de post.',
            'error'
          );
        }
      }
    };

    fetchTipoPost();
  }, [tipoPostId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Certifique-se de usar "tipoPost" com t minúsculo na requisição
    const tipoPostData = {
      tipoPost: tipoPost,
    };

    try {
      if (tipoPostId) {
        // Atualizar tipo de post
        const response = await api.put(`http://localhost:8000/api/tipoPost/${tipoPostId}`, tipoPostData);
        Swal.fire(
          'Tipo de Post Atualizado!',
          response.data.message || 'O tipo de post foi atualizado com sucesso.',
          'success'
        );
      } else {
        // Criar novo tipo de post
        const response = await api.post(`http://localhost:8000/api/tipoPost`, tipoPostData);
        Swal.fire(
          'Tipo de Post Criado!',
          response.data.message || 'O tipo de post foi criado com sucesso.',
          'success'
        );
      }

      // Limpa o campo após o sucesso
      setTipoPost('');
      navigate('/dashboard/tipoPost'); // Navega de volta para a lista de tipos de posts
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
          'Houve um problema ao criar ou atualizar o tipo de post.',
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
        <button className="btn btn-secondary" onClick={handleGoBack}>
          <IconArrowLeft /> Voltar
        </button>
      </div>
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          {tipoPostId ? 'Editar Tipo de Post' : 'Criar Novo Tipo de Post'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Tipo de Post"
            variant="outlined"
            fullWidth
            margin="normal"
            value={tipoPost}
            onChange={(e) => setTipoPost(e.target.value)}
            required
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            {tipoPostId ? 'Atualizar Tipo de Post' : 'Criar Tipo de Post'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CriarTipoPost;
