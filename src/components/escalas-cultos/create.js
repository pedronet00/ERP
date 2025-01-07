import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../../axiosConfig';
import { Box, Typography, TextField, MenuItem, Button } from '@mui/material';
import { IconArrowLeft } from '@tabler/icons-react';
import Swal from 'sweetalert2';

const CriarEscalaCulto = () => {
  const [searchParams] = useSearchParams();
  const idCulto = searchParams.get('idCulto'); // Obtém o idCulto da URL
  const idEscala = searchParams.get('idEscala'); // Verifica se existe idEscala na URL
  const [funcoesCulto, setFuncoesCulto] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [idFuncaoCulto, setIdFuncaoCulto] = useState('');
  const [idPessoa, setIdPessoa] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const idCliente = localStorage.getItem('idCliente'); // Obtém o idCliente do localStorage

  // Carregar funções de culto e usuários
  useEffect(() => {
    const fetchFuncoesCulto = async () => {
      try {
        const response = await api.get('http://localhost:8000/api/funcoes-culto');
        setFuncoesCulto(response.data);
      } catch (err) {
        setError('Erro ao carregar funções de culto.');
      }
    };

    const fetchUsuarios = async () => {
      try {
        if (!idCliente) {
          throw new Error('ID do cliente não encontrado no localStorage.');
        }
        const response = await api.get(`http://localhost:8000/api/user?idCliente=${idCliente}`);
        setUsuarios(response.data);
      } catch (err) {
        setError('Erro ao carregar usuários.');
      }
    };

    fetchFuncoesCulto();
    fetchUsuarios();

    if (idEscala) {
      // Carregar dados da escala para edição
      const fetchEscala = async () => {
        try {
          const response = await api.get(`http://localhost:8000/api/escala-culto/${idEscala}`);
          const escala = response.data[0]; // A API retorna um array
          setIdFuncaoCulto(escala.idFuncaoCulto);
          setIdPessoa(escala.idPessoa);
        } catch (err) {
          setError('Erro ao carregar dados da escala.');
        }
      };
      fetchEscala();
    }
  }, [idCliente, idEscala]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
  
    try {
  
      const data = {
        idCulto: parseInt(idCulto),
        idFuncaoCulto: parseInt(idFuncaoCulto),
        idPessoa: parseInt(idPessoa),
        idCliente: parseInt(idCliente),
      };

      if (idEscala) {
        // Se estiver editando, usa PUT
        await api.put(`http://localhost:8000/api/escalas-cultos`, data);
        Swal.fire({
          title: 'Sucesso!',
          text: 'Escala editada com sucesso.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate(`/dashboard/escalas-cultos?idCulto=${idCulto}`); // Redireciona após edição
        });
      } else {
        // Se for criação, usa POST
        await api.post('http://localhost:8000/api/escalas-cultos', data);
        Swal.fire({
          title: 'Sucesso!',
          text: 'Escala criada com sucesso.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate(`/dashboard/escalas-cultos?idCulto=${idCulto}`);
        });
      }

      // Resetar os campos após a operação
      setIdFuncaoCulto('');
      setIdPessoa('');
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'Erro ao criar/editar escala.';
      Swal.fire({
        title: 'Erro!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'OK',
      });
      setError(errorMessage); // Exibe a mensagem de erro na tela
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Box p={4}>
      <div className="d-flex justify-content-between mb-3" style={{ marginTop: '2%' }}>
        <button className="btn btn-secondary" onClick={handleGoBack}><IconArrowLeft /> Voltar</button>
      </div>
      <Typography variant="h5" gutterBottom>
        {idEscala ? 'Editar Escala de Culto' : 'Criar Escala de Culto'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={3}>
          <TextField
            select
            label="Função no Culto"
            fullWidth
            variant="outlined"
            value={idFuncaoCulto}
            onChange={(e) => setIdFuncaoCulto(e.target.value)}
          >
            {funcoesCulto.map((funcao) => (
              <MenuItem key={funcao.id} value={funcao.id}>
                {funcao.nomeFuncao}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box mb={3}>
          <TextField
            select
            label="Usuário"
            fullWidth
            variant="outlined"
            value={idPessoa}
            onChange={(e) => setIdPessoa(e.target.value)}
          >
            {usuarios.map((usuario) => (
              <MenuItem key={usuario.id} value={usuario.id}>
                {usuario.name}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        
        <Button type="submit" variant="contained" color="primary">
          {idEscala ? 'Editar Escala' : 'Criar Escala'}
        </Button>
      </form>
    </Box>
  );
};

export default CriarEscalaCulto;
