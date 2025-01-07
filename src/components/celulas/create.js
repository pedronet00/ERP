import React, { useState, useEffect } from 'react';
import api from '../../axiosConfig';
import Swal from 'sweetalert2';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';

const CriarCelula = () => {
  const [nomeCelula, setNomeCelula] = useState('');
  const [responsavelCelula, setResponsavelCelula] = useState('');
  const [localizacaoCelula, setLocalizacaoCelula] = useState('');
  const [diaReuniao, setDiaReuniao] = useState('');
  const [imagemCelula, setImagemCelula] = useState(null);
  const [responsaveis, setResponsaveis] = useState([]);
  const [locais, setLocais] = useState([]);
  const [contentBlurred, setContentBlurred] = useState(false);
  const navigate = useNavigate();
  const idCliente = localStorage.getItem('idCliente');
  const [perfis, setPerfis] = useState([]);

  const funcao = 1;

  const fetchPerfil = async () => {
    try {
      const perfil = localStorage.getItem('perfil');
      const apiFuncoes = `http://localhost:8000/api/perfis-funcoes/${perfil}/${funcao}`;
      const response = await api.get(apiFuncoes);

      if (response.data.length > 0 && response.data[0].permissao === 0) {
        navigate('/auth/500');
        return;
      }

      setPerfis(response.data);
    } catch (error) {
      console.error('Erro ao buscar regras de perfil:', error);
    }
  };

  useEffect(() => {
    fetchPerfil();
  }, []);

  useEffect(() => {
    const fetchResponsaveis = async () => {
      try {
        const response = await api.get(`http://localhost:8000/api/user?idCliente=${idCliente}`);
        const ativos = response.data.filter((responsavel) => responsavel.usuarioAtivo === 1);
        setResponsaveis(ativos);
      } catch (error) {
        console.error('Erro ao buscar responsáveis:', error);
        Swal.fire('Erro!', 'Não foi possível buscar a lista de responsáveis.', 'error');
      }
    };

    const fetchLocais = async () => {
      try {
        const response = await api.get(`http://localhost:8000/api/locais?idCliente=${idCliente}`);
        const ativos = response.data.filter((local) => local.statusLocal === 1);
        setLocais(ativos);
      } catch (error) {
        console.error('Erro ao buscar locais:', error);
        Swal.fire('Erro!', 'Não foi possível buscar a lista de locais.', 'error');
      }
    };

    fetchPerfil();
    fetchResponsaveis();
    fetchLocais();
  }, [idCliente, navigate]);

  const handleImageChange = (e) => {
    setImagemCelula(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nomeCelula', nomeCelula);
    formData.append('responsavelCelula', responsavelCelula);
    formData.append('localizacaoCelula', localizacaoCelula);
    formData.append('idCliente', idCliente);
    formData.append('diaReuniao', diaReuniao);
    if (imagemCelula) {
      formData.append('imagemCelula', imagemCelula);
    }

    try {
      await api.post('http://localhost:8000/api/celulas', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Swal.fire('Célula Criada!', 'A célula foi criada com sucesso.', 'success');

      setNomeCelula('');
      setResponsavelCelula('');
      setLocalizacaoCelula('');
      setDiaReuniao('');
      setImagemCelula(null);

      navigate('/dashboard/celulas');
    } catch (error) {
      if (error.response && error.response.data.error) {
        Swal.fire('Erro!', error.response.data.error, 'error');
      } else {
        Swal.fire('Erro!', 'Houve um problema ao criar a célula.', 'error');
      }
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container maxWidth="sm">
      <div
        className={`d-flex justify-content-between mb-3 ${contentBlurred ? 'blurred' : ''}`}
        style={{ marginTop: '2%' }}
      >
        <button className="btn btn-secondary" onClick={handleGoBack} disabled={contentBlurred}>
          <IconArrowLeft /> Voltar
        </button>
      </div>
      <Box sx={{ marginTop: 4, filter: contentBlurred ? 'blur(5px)' : 'none' }}>
        <Typography variant="h4" gutterBottom>
          Criar Nova Célula
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nome da Célula"
            value={nomeCelula}
            onChange={(e) => setNomeCelula(e.target.value)}
            margin="normal"
            required
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Responsável</InputLabel>
            <Select
              value={responsavelCelula}
              onChange={(e) => setResponsavelCelula(e.target.value)}
            >
              {responsaveis.map((responsavel) => (
                <MenuItem key={responsavel.id} value={responsavel.id}>
                  {responsavel.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Localização</InputLabel>
            <Select
              value={localizacaoCelula}
              onChange={(e) => setLocalizacaoCelula(e.target.value)}
            >
              {locais.map((local) => (
                <MenuItem key={local.id} value={local.id}>
                  {local.nomeLocal}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Dia da Reunião</InputLabel>
            <Select
              value={diaReuniao}
              onChange={(e) => setDiaReuniao(e.target.value)}
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
            component="label"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Upload da Imagem
            <input type="file" hidden onChange={handleImageChange} />
          </Button>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 3 }}
          >
            Criar Célula
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CriarCelula;
