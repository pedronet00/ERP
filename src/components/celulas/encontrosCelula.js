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
import { useNavigate, useParams } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';

const CriarEncontroCelula = () => {
  const [idPessoaEstudo, setIdPessoaEstudo] = useState('');
  const [idLocal, setIdLocal] = useState('');
  const [temaEstudo, setTemaEstudo] = useState('');
  const [dataEncontro, setDataEncontro] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [locais, setLocais] = useState([]);
  const navigate = useNavigate();
  const { idCelula } = useParams();
  const idCliente = localStorage.getItem('idCliente');

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await api.get(`http://localhost:8000/api/user?idCliente=${idCliente}`);
        setUsuarios(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        Swal.fire('Erro!', 'Não foi possível buscar a lista de usuários.', 'error');
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

    fetchUsuarios();
    fetchLocais();
  }, [idCliente]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!idCelula) {
      Swal.fire('Erro!', 'ID da célula não encontrado na URL.', 'error');
      return;
    }

    const data = {
      idCelula,
      idPessoaEstudo,
      idLocal,
      idCliente,
      temaEstudo,
      dataEncontro,
    };

    try {
      await api.post('http://localhost:8000/api/encontrosCelulas', data);
      Swal.fire('Encontro Criado!', 'O encontro foi criado com sucesso.', 'success');

      setIdPessoaEstudo('');
      setIdLocal('');
      setTemaEstudo('');
      setDataEncontro('');

      navigate(`/dashboard/celulas/${idCelula}/encontros`);
    } catch (error) {
      if (error.response && error.response.data.error) {
        Swal.fire('Erro!', error.response.data.error, 'error');
      } else {
        Swal.fire('Erro!', 'Houve um problema ao criar o encontro.', 'error');
      }
    }
  };

  const handleGoBack = () => {
    navigate(-1);
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
          Criar Encontro da Célula
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Responsável do Estudo</InputLabel>
            <Select
              value={idPessoaEstudo}
              onChange={(e) => setIdPessoaEstudo(e.target.value)}
              required
            >
              {usuarios.map((usuario) => (
                <MenuItem key={usuario.id} value={usuario.id}>
                  {usuario.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Local do Encontro</InputLabel>
            <Select
              value={idLocal}
              onChange={(e) => setIdLocal(e.target.value)}
              required
            >
              {locais.map((local) => (
                <MenuItem key={local.id} value={local.id}>
                  {local.nomeLocal}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Tema do Estudo"
            variant="outlined"
            fullWidth
            margin="normal"
            value={temaEstudo}
            onChange={(e) => setTemaEstudo(e.target.value)}
            required
          />

          <TextField
            label="Data do Encontro"
            type="date"
            variant="outlined"
            fullWidth
            margin="normal"
            value={dataEncontro}
            onChange={(e) => setDataEncontro(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Criar Encontro
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CriarEncontroCelula;
