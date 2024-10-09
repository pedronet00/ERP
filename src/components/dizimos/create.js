import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';

const CadastroDizimo = () => {
  const [dataCulto, setDataCulto] = useState('');
  const [turnoCulto, setTurnoCulto] = useState(0); // 0 ou 1
  const [valorArrecadado, setValorArrecadado] = useState('');
  const navigate = useNavigate();
  const idCliente = localStorage.getItem('idCliente'); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dizimoData = {
      dataCulto,
      turnoCulto,
      valorArrecadado,
      idCliente
    };

    try {
      await axios.post('https://apoleon.com.br/api-estagio/public/api/dizimos', dizimoData);
      Swal.fire(
        'Dízimo Cadastrado!',
        'O dízimo foi cadastrado com sucesso.',
        'success'
      );

      // Limpa os campos após o sucesso
      setDataCulto('');
      setTurnoCulto(0);
      setValorArrecadado('');
      navigate('/dizimos'); // Navegue de volta para a lista de dízimos
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
          'Houve um problema ao cadastrar o dízimo.',
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
          Cadastrar Dízimo
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Data do Culto"
            variant="outlined"
            type="date"
            fullWidth
            margin="normal"
            value={dataCulto}
            onChange={(e) => setDataCulto(e.target.value)}
            required
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            label="Turno do Culto (0 ou 1)"
            variant="outlined"
            type="number"
            fullWidth
            margin="normal"
            value={turnoCulto}
            onChange={(e) => setTurnoCulto(e.target.value)}
            required
            inputProps={{ min: 0, max: 1 }}
          />

          <TextField
            label="Valor Arrecadado"
            variant="outlined"
            type="number"
            fullWidth
            margin="normal"
            value={valorArrecadado}
            onChange={(e) => setValorArrecadado(e.target.value)}
            required
            inputProps={{ min: 0, step: '0.01' }}
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Cadastrar Dízimo
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CadastroDizimo;
