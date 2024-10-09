import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';

const CriarTipoRecurso = () => {
  const { tipoRecursoId } = useParams(); // Obtenha o ID do tipo de recurso da URL, se estiver editando
  const [tipoRecurso, setTipoRecurso] = useState('');
  const navigate = useNavigate();
  const idCliente = localStorage.getItem('idCliente'); // Supondo que o ID do cliente seja necessário

  // Função para buscar os detalhes do tipo de recurso se estiver editando
  useEffect(() => {
    const fetchTipoRecurso = async () => {
      if (tipoRecursoId) {
        try {
          const response = await axios.get(`http://localhost:8000/api/tipoRecurso/${tipoRecursoId}`);
          const tipoRecursoData = response.data.tipoRecurso; // Acesse os dados do tipo de recurso corretamente
          
          // Defina os estados com os dados do tipo de recurso
          setTipoRecurso(tipoRecursoData.tipoRecurso);
        } catch (error) {
          console.error("Erro ao buscar detalhes do tipo de recurso:", error);
          Swal.fire(
            'Erro!',
            'Não foi possível buscar os detalhes do tipo de recurso.',
            'error'
          );
        }
      }
    };

    fetchTipoRecurso();
  }, [tipoRecursoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tipoRecursoData = {
      tipoRecurso,
      idCliente
    };

    try {
      if (tipoRecursoId) {
        // Se tipoRecursoId estiver presente, atualize o tipo de recurso
        await axios.put(`http://localhost:8000/api/tipoRecurso/${tipoRecursoId}`, tipoRecursoData);
        Swal.fire(
          'Tipo de Recurso Atualizado!',
          'O tipo de recurso foi atualizado com sucesso.',
          'success'
        );
      } else {
        // Se não houver tipoRecursoId, crie um novo tipo de recurso
        await axios.post(`http://localhost:8000/api/tipoRecurso`, tipoRecursoData);
        Swal.fire(
          'Tipo de Recurso Criado!',
          'O tipo de recurso foi criado com sucesso.',
          'success'
        );
      }

      // Limpa o campo após o sucesso
      setTipoRecurso('');
      navigate('/tiposRecursos'); // Navegue de volta para a lista de tipos de recursos
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
          'Houve um problema ao criar ou atualizar o tipo de recurso.',
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
          {tipoRecursoId ? 'Editar Tipo de Recurso' : 'Criar Novo Tipo de Recurso'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Tipo de Recurso"
            variant="outlined"
            fullWidth
            margin="normal"
            value={tipoRecurso}
            onChange={(e) => setTipoRecurso(e.target.value)}
            required
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            {tipoRecursoId ? 'Atualizar Tipo de Recurso' : 'Criar Tipo de Recurso'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CriarTipoRecurso;
