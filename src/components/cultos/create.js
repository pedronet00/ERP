import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../../axiosConfig';
import { Typography, Box, TextField, MenuItem, Button, Alert } from '@mui/material';
import Swal from 'sweetalert2';

const CriarCulto = () => {
  const [searchParams] = useSearchParams();
  const idCulto = searchParams.get('idCulto');
  const [dataCulto, setDataCulto] = useState('');
  const [turnoCulto, setTurnoCulto] = useState('');
  const [localCulto, setLocalCulto] = useState('');
  const [locais, setLocais] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchCulto = async () => {
    try {
      const response = await api.get(`http://localhost:8000/api/culto/${idCulto}`);
      const { data } = response;
      setDataCulto(data.dataCulto);
      setTurnoCulto(data.turnoCulto.toString());
      setLocalCulto(data.localCulto); // Assumindo que a API retorna este campo
    } catch (error) {
      console.error(error);
      setErrorMessage('Erro ao carregar os dados do culto.');
    }
  };

  const fetchLocais = async () => {
    try {
      const idCliente = localStorage.getItem('idCliente');
      if (!idCliente) {
        setErrorMessage('ID do cliente não encontrado no localStorage.');
        return;
      }
      const response = await api.get(`http://localhost:8000/api/locais?idCliente=${idCliente}`);
      setLocais(response.data || []);
    } catch (error) {
      console.error("Erro ao buscar locais:", error);
      setErrorMessage('Erro ao carregar locais.');
    }
  };

  useEffect(() => {
    if (idCulto) {
      fetchCulto();
    }
    fetchLocais();
  }, [idCulto]);

  const handleSaveCulto = async (e) => {
    e.preventDefault();
    const idCliente = localStorage.getItem('idCliente');
    if (!idCliente) {
      setErrorMessage('ID do cliente não encontrado no localStorage.');
      return;
    }
    const payload = {
      dataCulto,
      turnoCulto: parseInt(turnoCulto, 10),
      idCliente: parseInt(idCliente, 10),
      localCulto: localCulto,
    };
    try {
      if (idCulto) {
        await api.put(`http://localhost:8000/api/culto`, payload);
        Swal.fire({
          title: 'Sucesso!',
          text: 'Culto editado com sucesso!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          window.location.href = '/dashboard/cultos';
        });
      } else {
        await api.post('http://localhost:8000/api/culto', payload);
        Swal.fire({
          title: 'Sucesso!',
          text: 'Culto criado com sucesso!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          window.location.href = '/dashboard/cultos';
        });
      }
      setSuccessMessage('Operação realizada com sucesso!');
      setErrorMessage('');
      setDataCulto('');
      setTurnoCulto('');
      setLocalCulto('');
    } catch (error) {
      Swal.fire({
        title: 'Erro!',
        text: 'Erro ao salvar o culto. Tente novamente.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      setErrorMessage('Erro ao salvar o culto. Tente novamente.');
      setSuccessMessage('');
      console.error(error);
    }
  };

  return (
    <Box className="container mt-4">
      <Typography variant="h5" gutterBottom>
        {idCulto ? 'Editar Culto' : 'Criar Culto'}
      </Typography>

      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <form onSubmit={handleSaveCulto}>
        <Box mt={2}>
          <TextField
            fullWidth
            required
            label="Data do Culto"
            type="date"
            value={dataCulto}
            onChange={(e) => setDataCulto(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Box>

        <Box mt={2}>
          <TextField
            fullWidth
            required
            select
            label="Turno do Culto"
            value={turnoCulto}
            onChange={(e) => setTurnoCulto(e.target.value)}
          >
            <MenuItem value="0">Manhã</MenuItem>
            <MenuItem value="1">Noite</MenuItem>
          </TextField>
        </Box>

        <Box mt={2}>
          <TextField
            fullWidth
            required
            select
            label="Local do Culto"
            value={localCulto}
            onChange={(e) => setLocalCulto(e.target.value)}
          >
            {locais.map((local) => (
              <MenuItem key={local.id} value={local.id}>
                {local.nomeLocal}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary">
            {idCulto ? 'Salvar Alterações' : 'Criar Culto'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CriarCulto;
