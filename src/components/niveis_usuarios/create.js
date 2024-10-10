import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';

const CriarNivelUsuario = () => {
  const { nivelUsuarioId } = useParams(); // Obtenha o ID do tipo de recurso da URL, se estiver editando
  const [nivelUsuario, setNivelUsuario] = useState('');
  const navigate = useNavigate();
  const idCliente = localStorage.getItem('idCliente'); // Supondo que o ID do cliente seja necessário

  // Função para buscar os detalhes do tipo de recurso se estiver editando
  useEffect(() => {
    const fetchNivelUsuario = async () => {
      if (nivelUsuarioId) {
        try {
          const response = await axios.get(`http://localhost:8000/api/nivelUsuario/${nivelUsuarioId}`);
          const nivelUsuarioData = response.data.nivelUsuario; // Acesse os dados do tipo de recurso corretamente
          
          // Defina os estados com os dados do tipo de recurso
          setNivelUsuario(nivelUsuarioData);
        } catch (error) {
          console.error("Erro ao buscar detalhes do nível de usuário:", error);
          Swal.fire(
            'Erro!',
            'Não foi possível buscar os detalhes do nível de usuário.',
            'error'
          );
        }
      }
    };

    fetchNivelUsuario();
  }, [nivelUsuarioId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nivelUsuarioData = {
      nivelUsuario,
      idCliente
    };

    try {
      if (nivelUsuarioId) {
        // Se nivelUsuarioId estiver presente, atualize o tipo de recurso
        await axios.put(`http://localhost:8000/api/nivelUsuario/${nivelUsuarioId}`, nivelUsuarioData);
        Swal.fire(
          'Nível de usuário atualizado!',
          'O nível de usuário foi atualizado com sucesso.',
          'success'
        );
      } else {
        // Se não houver nivelUsuarioId, crie um novo tipo de recurso
        await axios.post(`http://localhost:8000/api/nivelUsuario`, nivelUsuarioData);
        Swal.fire(
          'Nível de usuário criado!',
          'O nível de usuário foi criado com sucesso.',
          'success'
        );
      }

      // Limpa o campo após o sucesso
      setNivelUsuario('');
      navigate('/nivelUsuario'); // Navegue de volta para a lista de tipos de recursos
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
          'Houve um problema ao criar ou atualizar o nível de usuário.',
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
          {nivelUsuarioId ? 'Editar Nível de Usuário' : 'Criar Novo Nível de Usuário'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nível de Usuário"
            variant="outlined"
            fullWidth
            margin="normal"
            value={nivelUsuario}
            onChange={(e) => setNivelUsuario(e.target.value)}
            required
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            {nivelUsuarioId ? 'Atualizar Nível de Usuário' : 'Criar Nível de Usuário'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CriarNivelUsuario;
