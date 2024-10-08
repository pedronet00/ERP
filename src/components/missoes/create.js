import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';

const MissaoEdit = () => {
  const { missaoId } = useParams(); // Obtenha o ID da missão da URL
  const [nomeMissao, setNomeMissao] = useState('');
  const [quantidadeMembros, setQuantidadeMembros] = useState('');
  const [cidadeMissao, setCidadeMissao] = useState('');
  const [pastorTitular, setPastorTitular] = useState('');
  const navigate = useNavigate();
  const idCliente = localStorage.getItem('idCliente'); 

  // Função para buscar os detalhes da missão se estiver editando
  useEffect(() => {
    const fetchMissao = async () => {
      if (missaoId) {
        try {
          const response = await axios.get(`http://localhost:8000/api/missoes/${missaoId}`);
          const missao = response.data.missao; // Acesse os dados da missão
          
          // Defina os estados com os dados da missão
          setNomeMissao(missao.nomeMissao);
          setQuantidadeMembros(missao.quantidadeMembros);
          setCidadeMissao(missao.cidadeMissao);
          setPastorTitular(missao.pastorTitular);
        } catch (error) {
          console.error("Erro ao buscar detalhes da missão:", error);
        }
      }
    };

    fetchMissao();
  }, [missaoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const missaoData = {
      nomeMissao,
      quantidadeMembros,
      cidadeMissao,
      pastorTitular,
      idCliente
    };

    try {
      if (missaoId) {
        // Se missaoId estiver presente, atualize a missão
        await axios.put(`http://localhost:8000/api/missoes/${missaoId}`, missaoData);
        Swal.fire(
          'Missão Atualizada!',
          'A missão foi atualizada com sucesso.',
          'success'
        );
      } else {
        // Se não houver missaoId, crie uma nova missão
        await axios.post('http://localhost:8000/api/missoes', missaoData);
        Swal.fire(
          'Missão Criada!',
          'A missão foi criada com sucesso.',
          'success'
        );
      }

      // Limpa os campos após o sucesso
      setNomeMissao('');
      setQuantidadeMembros('');
      setCidadeMissao('');
      setPastorTitular('');
      navigate('/missoes'); // Navegue de volta para a lista de missões
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
          'Houve um problema ao criar ou atualizar a missão.',
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
          {missaoId ? 'Editar Missão' : 'Criar Nova Missão'}
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
            {missaoId ? 'Atualizar Missão' : 'Criar Missão'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default MissaoEdit;
