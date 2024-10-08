import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';

const CriarDepartamento = () => {
  const { departmentId } = useParams(); // Obtenha o ID do departamento da URL
  const [tituloDepartamento, setTituloDepartamento] = useState('');
  const [textoDepartamento, setTextoDepartamento] = useState('');
  const [imgDepartamento, setImgDepartamento] = useState('');
  const navigate = useNavigate();

  const getSubdomain = () => {
    const hostname = window.location.hostname;
    const subdomain = hostname.split('.')[0]; // Assumindo que o subdomínio é a primeira parte do hostname
    return subdomain;
  };

  
  const subdomain = getSubdomain();

  // Função para buscar os detalhes do departamento se estiver editando
  useEffect(() => {
    const fetchDepartment = async () => {
      if (departmentId) {
        try {
          const response = await axios.get(`http://${subdomain}.localhost:8000/api/departamentos/${departmentId}`);
          const departamento = response.data.departamento; // Acesse os dados do departamento corretamente
          
          // Defina os estados com os dados do departamento
          setTituloDepartamento(departamento.tituloDepartamento);
          setTextoDepartamento(departamento.textoDepartamento);
          setImgDepartamento(departamento.imgDepartamento);
        } catch (error) {
          console.error("Erro ao buscar detalhes do departamento:", error);
          Swal.fire(
            'Erro!',
            'Não foi possível buscar os detalhes do departamento.',
            'error'
          );
        }
      }
    };

    fetchDepartment();
  }, [departmentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const departamentoData = {
      tituloDepartamento,
      textoDepartamento,
      imgDepartamento,
    };

    try {
      if (departmentId) {
        // Se departmentId estiver presente, atualize o departamento
        await axios.put(`http://${subdomain}.localhost:8000/api/departamentos/${departmentId}`, departamentoData);
        Swal.fire(
          'Departamento Atualizado!',
          'O departamento foi atualizado com sucesso.',
          'success'
        );
      } else {
        // Se não houver departmentId, crie um novo departamento
        await axios.post(`http://${subdomain}.localhost:8000/api/departamentos`, departamentoData);
        Swal.fire(
          'Departamento Criado!',
          'O departamento foi criado com sucesso.',
          'success'
        );
      }

      // Limpa os campos após o sucesso
      setTituloDepartamento('');
      setTextoDepartamento('');
      setImgDepartamento('');
      navigate('/departaments'); // Navegue de volta para a lista de departamentos
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
          'Houve um problema ao criar ou atualizar o departamento.',
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
          {departmentId ? 'Editar Departamento' : 'Criar Novo Departamento'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Título do Departamento"
            variant="outlined"
            fullWidth
            margin="normal"
            value={tituloDepartamento}
            onChange={(e) => setTituloDepartamento(e.target.value)}
            required
          />

          <TextField
            label="Texto do Departamento"
            variant="outlined"
            fullWidth
            multiline
            rows={5}
            margin="normal"
            value={textoDepartamento}
            onChange={(e) => setTextoDepartamento(e.target.value)}
            required
          />

          <TextField
            label="Imagem URL do Departamento"
            variant="outlined"
            fullWidth
            margin="normal"
            value={imgDepartamento}
            onChange={(e) => setImgDepartamento(e.target.value)}
            required
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            {departmentId ? 'Atualizar Departamento' : 'Criar Departamento'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CriarDepartamento;
