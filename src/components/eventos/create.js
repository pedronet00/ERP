import React, { useState } from 'react';
import {
  Container,
  Box,
  Button,
  TextField,
  Typography,
  Select,
  InputLabel,
  FormControl,
  MenuItem
} from '@mui/material';
import {IconArrowLeft} from '@tabler/icons-react'; // Importe seu ícone de voltar
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CadastrarEvento = () => {
  const navigate = useNavigate(); // Usado para a navegação ao clicar no botão Voltar
  const [formData, setFormData] = useState({
    nomeEvento: '',
    descricaoEvento: '',
    localEvento: '',
    dataEvento: '',
    prioridadeEvento: '',
    orcamentoEvento: '',
  });

  const prioridades = [
    { value: 1, label: 'Baixa' },
    { value: 2, label: 'Média' },
    { value: 3, label: 'Alta' },
    { value: 4, label: 'Crítica' },
  ];

  const handleGoBack = () => {
    navigate(-1); // Navega para a página anterior
  };

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Função para enviar os dados do formulário para a API
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://apoleon.com.br/api-estagio/public/api/eventos',
        formData
      );
      console.log('Evento cadastrado com sucesso:', response.data);
      // Limpa o formulário após o sucesso
      setFormData({
        nomeEvento: '',
        descricaoEvento: '',
        localEvento: '',
        dataEvento: '',
        prioridadeEvento: '',
        orcamentoEvento: '',
      });
    } catch (error) {
      console.error('Erro ao cadastrar o evento:', error);
    }
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
          Cadastrar Evento
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nome do Evento"
            variant="outlined"
            fullWidth
            margin="normal"
            name="nomeEvento"
            value={formData.nomeEvento}
            onChange={handleChange}
            required
          />

          <TextField
            label="Descrição do Evento"
            variant="outlined"
            fullWidth
            multiline
            rows={5}
            margin="normal"
            name="descricaoEvento"
            value={formData.descricaoEvento}
            onChange={handleChange}
            required
          />

          <TextField
            label="Local do Evento"
            variant="outlined"
            fullWidth
            margin="normal"
            name="localEvento"
            value={formData.localEvento}
            onChange={handleChange}
            required
          />

          <TextField
            label="Data do Evento"
            variant="outlined"
            fullWidth
            margin="normal"
            type="date"
            name="dataEvento"
            value={formData.dataEvento}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />

            <FormControl fullWidth margin="normal" required>
                <InputLabel>Prioridade do Evento</InputLabel>
                <Select
                    label="Prioridade do Evento"
                    name="prioridadeEvento"
                    value={formData.prioridadeEvento}
                    onChange={handleChange}
                >
                    {prioridades.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                    ))}
                </Select>
            </FormControl>


          <TextField
            label="Orçamento do Evento"
            variant="outlined"
            fullWidth
            margin="normal"
            name="orcamentoEvento"
            type="number"
            value={formData.orcamentoEvento}
            onChange={handleChange}
            required
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Cadastrar Evento
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CadastrarEvento;
