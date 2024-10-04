import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';

const CreateUser = ({ onUserCreated }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nivelUsuario, setNivelUsuario] = useState('');
  const [dataNascimentoUsuario, setDataNascimentoUsuario] = useState('');
  const [imgUsuario, setImgUsuario] = useState('');
  const [niveisUsuarios, setNiveisUsuarios] = useState([]); // Para armazenar os níveis de usuários
  const navigate = useNavigate();

  // Função para buscar níveis de usuários
  useEffect(() => {
    const fetchNiveisUsuarios = async () => {
      try {
        const response = await axios.get('https://apoleon.com.br/api-estagio/public/api/nivelUsuario');
        setNiveisUsuarios(response.data); // Assumindo que os dados vêm como um array de níveis de usuários
      } catch (error) {
        console.error("Erro ao buscar níveis de usuários:", error);
      }
    };

    fetchNiveisUsuarios();
  }, []);

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      password,
      nivelUsuario,
      dataNascimentoUsuario,
      imgUsuario,
    };

    try {
      await axios.post('https://apoleon.com.br/api-estagio/public/api/user', newUser);
      alert('Usuário criado com sucesso!');
      onUserCreated(); // Chamando a função passada como props para atualizar a lista
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      alert('Erro ao criar usuário. Tente novamente.');
    }
  };

  const handleGoBack = () => {
      navigate(-1); // Volta para a tela anterior
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 4 }}>
      <div className="d-flex justify-content-between mb-3" style={{ marginTop: '2%' }}>
        <button className="btn btn-secondary" onClick={handleGoBack}><IconArrowLeft /> Voltar</button>
      </div>
        <Typography variant="h4" gutterBottom>
          Criar Novo Usuário
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nome"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <TextField
            label="Senha"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel id="nivelUsuario-label">Nível de Usuário</InputLabel>
            <Select
              labelId="nivelUsuario-label"
              id="nivelUsuario"
              value={nivelUsuario}
              onChange={(e) => setNivelUsuario(e.target.value)}
              label="Nível de Usuário"
            >
              <MenuItem value="">
                <em>Selecione um nível</em>
              </MenuItem>
              {niveisUsuarios.map((nivel) => (
                <MenuItem key={nivel.id} value={nivel.id}>
                  {nivel.nivelUsuario}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Data de Nascimento"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            fullWidth
            margin="normal"
            value={dataNascimentoUsuario}
            onChange={(e) => setDataNascimentoUsuario(e.target.value)}
            required
          />

          <TextField
            label="Imagem do Usuário (URL ou nome)"
            variant="outlined"
            fullWidth
            margin="normal"
            value={imgUsuario}
            onChange={(e) => setImgUsuario(e.target.value)}
            required
          />

          <Button variant="contained" color="primary" type="submit" fullWidth sx={{ marginTop: 2 }}>
            Criar Usuário
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CreateUser;
