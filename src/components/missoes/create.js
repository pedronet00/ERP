import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const MissaoCreate = () => {
  const [nomeMissao, setNomeMissao] = useState('');
  const [quantidadeMembros, setQuantidadeMembros] = useState('');
  const [cidadeMissao, setCidadeMissao] = useState('');
  const [pastorTitular, setPastorTitular] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const novaMissao = {
      nomeMissao,
      quantidadeMembros,
      cidadeMissao,
      pastorTitular
    };

    axios.post('https://apoleon.com.br/api-estagio/public/api/missoes', novaMissao)
      .then(() => {
        Swal.fire(
          'Missão criada!',
          'A missão foi criada com sucesso.',
          'success'
        );
        // Limpa os campos após o sucesso
        setNomeMissao('');
        setQuantidadeMembros('');
        setCidadeMissao('');
        setPastorTitular('');
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
            'Houve um problema ao criar a missão.',
            'error'
          );
        }
      });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Criar Nova Missão
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nome da missão"
            variant="outlined"
            fullWidth
            margin="normal"
            value={nomeMissao}
            onChange={(e) => setNomeMissao(e.target.value)}
            required
          />
          
          <TextField
            label="Quantidade de membros"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={quantidadeMembros}
            onChange={(e) => setQuantidadeMembros(e.target.value)}
            required
          />

          <TextField
            label="Cidade da missão"
            variant="outlined"
            fullWidth
            margin="normal"
            value={cidadeMissao}
            onChange={(e) => setCidadeMissao(e.target.value)}
            required
          />

          <TextField
            label="Pastor titular (ID)"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={pastorTitular}
            onChange={(e) => setPastorTitular(e.target.value)}
            required
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Criar Missão
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default MissaoCreate;
