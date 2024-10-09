import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { TextField, Button, Container, Typography, Box, Autocomplete, FormControl, InputLabel, Select, MenuItem } from '@mui/material'; // Adicione Autocomplete
import { useNavigate, useParams } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';

const MissaoEdit = () => {
  const { missaoId } = useParams(); // Obtenha o ID da missão da URL
  const [nomeMissao, setNomeMissao] = useState('');
  const [quantidadeMembros, setQuantidadeMembros] = useState('');
  const [cidadeMissao, setCidadeMissao] = useState(''); // Campo para cidade
  const [pastorTitular, setPastorTitular] = useState('');
  const [cidades, setCidades] = useState([]); // Lista de cidades

  const [users, setUsers] = useState([]); // Lista de usuários
  const navigate = useNavigate();
  const idCliente = localStorage.getItem('idCliente');

  // Função para buscar os usuários
  const fetchUsers = async () => {
    try {
      const apiUrl = `http://localhost:8000/api/user?idCliente=${idCliente}`; // Monta a URL com o idCliente como parâmetro
      const response = await axios.get(apiUrl);
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

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
    fetchUsers(); // Chama a função para buscar usuários
  }, [missaoId]);

  // Função para buscar cidades ao digitar
  const fetchCidades = async (query) => {
    if (query.length < 3) return; // Buscar cidades apenas após 3 caracteres
    try {
      const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios`);
      const allCidades = response.data.map(cidade => cidade.nome);
      
      // Filtrar as cidades com base na query digitada
      const filteredCidades = allCidades.filter(cidade =>
        cidade.toLowerCase().startsWith(query.toLowerCase())
      );
      
      setCidades(filteredCidades);
    } catch (error) {
      console.error('Erro ao buscar cidades:', error);
    }
  };

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

          {/* Autocomplete para cidades */}
          <Autocomplete
            freeSolo
            options={cidades}
            inputValue={cidadeMissao}
            onInputChange={(event, newInputValue) => {
              setCidadeMissao(newInputValue);
              fetchCidades(newInputValue); // Buscar cidades ao digitar
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Cidade da missão"
                variant="outlined"
                fullWidth
                margin="normal"
                required
              />
            )}
          />

            <FormControl fullWidth margin="normal" required>
              <InputLabel id="pastor-titular-label">Pastor Titular</InputLabel>
              <Select
                labelId="pastor-titular-label"
                value={pastorTitular}
                onChange={(e) => setPastorTitular(e.target.value)}
              >
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name} {/* Supondo que o usuário tenha um campo 'nome' */}
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
            {missaoId ? 'Atualizar Missão' : 'Criar Missão'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default MissaoEdit;
