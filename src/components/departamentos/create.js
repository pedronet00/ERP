import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';

const CriarDepartamento = () => {
  const [tituloDepartamento, setTituloDepartamento] = useState('');
  const [textoDepartamento, setTextoDepartamento] = useState('');
  const [imgDepartamento, setImgDepartamento] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const novoDepartamento = {
      tituloDepartamento,
      textoDepartamento,
      imgDepartamento,
    };

    axios.post('https://apoleon.com.br/api-estagio/public/api/departamentos', novoDepartamento)
      .then(() => {
        Swal.fire(
          'Departamento Criado!',
          'O departamento foi criado com sucesso.',
          'success'
        );
        // Limpa os campos após o sucesso
        setTituloDepartamento('');
        setTextoDepartamento('');
        setImgDepartamento('');
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
            'Houve um problema ao criar o departamento.',
            'error'
          );
        }
      });
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
          Criar Novo Departamento
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
            Criar Departamento
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CriarDepartamento;
