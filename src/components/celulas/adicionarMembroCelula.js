import React, { useState, useEffect } from 'react';
import api from '../../axiosConfig';
import Swal from 'sweetalert2';
import { Button, Container, Typography, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';

const AdicionarPessoaCelula = () => {
  const [idPessoa, setIdPessoa] = useState('');
  const [pessoas, setPessoas] = useState([]);
  const navigate = useNavigate();
  const { idCelula } = useParams();  // Obtendo o id da célula pela URL
  const idCliente = localStorage.getItem('idCliente'); // Obtendo o idCliente do localStorage

  useEffect(() => {
    const fetchPessoas = async () => {
      try {
        const response = await api.get(`http://localhost:8000/api/user?idCliente=${idCliente}`);
        setPessoas(response.data);
      } catch (error) {
        console.error("Erro ao buscar pessoas:", error);
        Swal.fire('Erro!', 'Não foi possível buscar a lista de pessoas.', 'error');
      }
    };

    fetchPessoas();
  }, [idCliente]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!idCelula) {
      Swal.fire('Erro!', 'ID da célula não encontrado na URL.', 'error');
      return;
    }

    if (!idPessoa) {
      Swal.fire('Erro!', 'Selecione uma pessoa para adicionar à célula.', 'error');
      return;
    }

    const data = {
      idCelula,
      idPessoa,  // Usando idPessoa conforme solicitado
      idCliente, // Obtendo idCliente do localStorage
    };

    try {
      await api.post('http://localhost:8000/api/membrosCelulas', data);
      Swal.fire('Pessoa Adicionada!', 'A pessoa foi adicionada à célula com sucesso.', 'success');

      navigate(`/dashboard/membrosCelula/${idCelula}`);
    } catch (error) {
      if (error.response && error.response.data.error) {
        Swal.fire('Erro!', error.response.data.error, 'error');
      } else {
        Swal.fire('Erro!', 'Houve um problema ao adicionar a pessoa à célula.', 'error');
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
          Adicionar Pessoa à Célula
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Selecione a Pessoa</InputLabel>
            <Select
  value={idPessoa}
  onChange={(e) => setIdPessoa(e.target.value)}
  required
>
  {pessoas
    .filter((pessoa) => pessoa.usuarioAtivo === 1)  // Filtra as pessoas cujo usuarioAtivo é igual a 1
    .map((pessoa) => (
      <MenuItem key={pessoa.id} value={pessoa.id}>
        {pessoa.name}
      </MenuItem>
    ))}
</Select>

          </FormControl>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Adicionar Pessoa
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AdicionarPessoaCelula;
