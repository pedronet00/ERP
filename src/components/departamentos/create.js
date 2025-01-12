import React, { useState, useEffect } from 'react';
import api from '../../axiosConfig';
import Swal from 'sweetalert2';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';

const CriarDepartamento = () => {
  const { id } = useParams();
  const [tituloDepartamento, setTituloDepartamento] = useState('');
  const [textoDepartamento, setTextoDepartamento] = useState('');
  const [imgDepartamento, setImgDepartamento] = useState(null); // Armazena o arquivo selecionado
  const navigate = useNavigate();
  const idCliente = localStorage.getItem('idCliente');

useEffect(() => {
  const fetchDepartment = async () => {
    if (id && idCliente) { // Verifica se ambos id e idCliente existem
      try {
        // Passando idCliente como parâmetro de consulta
        const response = await api.get(`http://localhost:8000/api/departamentos/${id}?idCliente=${idCliente}`);
        const departamento = response.data.departamento;

        setTituloDepartamento(departamento.tituloDepartamento);
        setTextoDepartamento(departamento.textoDepartamento);
      } catch (error) {
        console.error('Erro ao buscar detalhes do departamento:', error);
        Swal.fire('Erro!', 'Não foi possível buscar os detalhes do departamento.', 'error')
  .then(() => {
      navigate(-1);
  });

      }
    }
  };

  fetchDepartment();
}, [id, idCliente]); // Adiciona idCliente no array de dependências


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('tituloDepartamento', tituloDepartamento);
    formData.append('textoDepartamento', textoDepartamento);
    if (imgDepartamento) {
      formData.append('imgDepartamento', imgDepartamento);
    }
    formData.append('idCliente', idCliente);

    try {
      if (id) {
        await api.put(`http://localhost:8000/api/departamentos/${id}`, formData);
        Swal.fire('Departamento Atualizado!', 'O departamento foi atualizado com sucesso.', 'success');
      } else {
        await api.post(`http://localhost:8000/api/departamentos`, formData);
        Swal.fire('Departamento Criado!', 'O departamento foi criado com sucesso.', 'success');
      }

      setTituloDepartamento('');
      setTextoDepartamento('');
      setImgDepartamento(null);
      navigate('/dashboard/departaments');
    } catch (error) {
      if (error.response && error.response.data.error) {
        Swal.fire('Erro!', error.response.data.error, 'error');
      } else {
        Swal.fire('Erro!', 'Houve um problema ao criar ou atualizar o departamento.', 'error');
      }
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImgDepartamento(file);
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
          {id ? 'Editar Departamento' : 'Criar Novo Departamento'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Título do Departamento"
            variant="outlined"
            inputProps={{ maxLength: 30 }}
            fullWidth
            margin="normal"
            value={tituloDepartamento}
            onChange={(e) => setTituloDepartamento(e.target.value)}
            required
          />

          <TextField
            label="Descrição do Departamento"
            variant="outlined"
            fullWidth
            multiline
            inputProps={{ maxLength: 50 }}
            margin="normal"
            value={textoDepartamento}
            onChange={(e) => setTextoDepartamento(e.target.value)}
            required
          />

          <Typography variant="subtitle1" sx={{ marginTop: 2, marginBottom: 1 }}>
            Imagem do Departamento
          </Typography>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required={!id} // Exigir imagem apenas para criação
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            {id ? 'Atualizar Departamento' : 'Criar Departamento'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CriarDepartamento;
