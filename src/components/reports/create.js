import React, { useState } from 'react';
import { Container, Typography, Box, FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material';

const setores = [
  { id: 1, nome: 'Usuários' },
  { id: 2, nome: 'Departamentos' },
  { id: 3, nome: 'Missões' },
  { id: 4, nome: 'Recursos' },
  // Adicione mais setores conforme necessário
];

const GerarRelatorio = () => {
  const [setor, setSetor] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para gerar o relatório
    console.log('Setor:', setor);
    console.log('Data de Início:', dataInicio);
    console.log('Data de Fim:', dataFim);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Gerar Relatório
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="setor-label">Escolha o Setor</InputLabel>
            <Select
              labelId="setor-label"
              id="setor"
              value={setor}
              onChange={(e) => setSetor(e.target.value)}
              label="Escolha o Setor"
            >
              {setores.map((setor) => (
                <MenuItem key={setor.id} value={setor.id}>
                  {setor.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Data de Início"
            type="date"
            fullWidth
            margin="normal"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
            required
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            label="Data de Fim"
            type="date"
            fullWidth
            margin="normal"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
            required
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Gerar Relatório
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default GerarRelatorio;
