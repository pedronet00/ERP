import React, { useState, useEffect } from 'react';
import api from '../../axiosConfig';
import Swal from 'sweetalert2';
import { TextField, Button, Container, Typography, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';

const CriarCelula = () => {
  const [nomeCelula, setNomeCelula] = useState('');
  const [responsavelCelula, setResponsavelCelula] = useState('');
  const [localizacaoCelula, setLocalizacaoCelula] = useState('');
  const [diaReuniao, setDiaReuniao] = useState('');
  const [responsaveis, setResponsaveis] = useState([]);
  const [locais, setLocais] = useState([]);
  const navigate = useNavigate();
  const idCliente = localStorage.getItem('idCliente'); // Supondo que o ID do cliente seja necessário

  // Buscar responsáveis
  useEffect(() => {
    const fetchResponsaveis = async () => {
      try {
        const response = await api.get(`http://localhost:8000/api/user?idCliente=${idCliente}`);
        setResponsaveis(response.data);
      } catch (error) {
        console.error("Erro ao buscar responsáveis:", error);
        Swal.fire('Erro!', 'Não foi possível buscar a lista de responsáveis.', 'error');
      }
    };

    const fetchLocais = async () => {
      try {
        const response = await api.get(`http://localhost:8000/api/locais?idCliente=${idCliente}`);
        setLocais(response.data);
      } catch (error) {
        console.error("Erro ao buscar locais:", error);
        Swal.fire('Erro!', 'Não foi possível buscar a lista de locais.', 'error');
      }
    };

    fetchResponsaveis();
    fetchLocais();
  }, [idCliente]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const celulaData = {
      nomeCelula,
      responsavelCelula,
      localizacaoCelula,
      idCliente,
      diaReuniao,
    };

    try {
      await api.post('http://localhost:8000/api/celulas', celulaData);
      Swal.fire('Célula Criada!', 'A célula foi criada com sucesso.', 'success');

      // Limpa os campos após o sucesso
      setNomeCelula('');
      setResponsavelCelula('');
      setLocalizacaoCelula('');
      setDiaReuniao('');

      navigate('/dashboard/celulas'); // Navegue de volta para a lista de células
    } catch (error) {
      if (error.response && error.response.data.error) {
        Swal.fire('Erro!', error.response.data.error, 'error');
      } else {
        Swal.fire('Erro!', 'Houve um problema ao criar a célula.', 'error');
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
          Criar Nova Célula
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nome da Célula"
            variant="outlined"
            fullWidth
            margin="normal"
            value={nomeCelula}
            onChange={(e) => setNomeCelula(e.target.value)}
            required
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Responsável</InputLabel>
            <Select
              value={responsavelCelula}
              onChange={(e) => setResponsavelCelula(e.target.value)}
              required
            >
              {responsaveis.map((responsavel) => (
                <MenuItem key={responsavel.id} value={responsavel.id}>
                  {responsavel.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Localização</InputLabel>
            <Select
              value={localizacaoCelula}
              onChange={(e) => setLocalizacaoCelula(e.target.value)}
              required
            >
              {locais.map((local) => (
                <MenuItem key={local.id} value={local.id}>
                  {local.nomeLocal}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Dia da Reunião</InputLabel>
            <Select
              value={diaReuniao}
              onChange={(e) => setDiaReuniao(e.target.value)}
              required
            >
              <MenuItem value={1}>Segunda-feira</MenuItem>
              <MenuItem value={2}>Terça-feira</MenuItem>
              <MenuItem value={3}>Quarta-feira</MenuItem>
              <MenuItem value={4}>Quinta-feira</MenuItem>
              <MenuItem value={5}>Sexta-feira</MenuItem>
              <MenuItem value={6}>Sábado</MenuItem>
              <MenuItem value={7}>Domingo</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Criar Célula
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CriarCelula;
