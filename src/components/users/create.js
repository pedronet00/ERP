import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { TextField, Button, Container, Typography, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';

const CreateUser = ({ onUserCreated }) => {
  const { userId } = useParams(); // Obtenha o ID do usuário da URL
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nivelUsuario, setNivelUsuario] = useState('');
  const [dataNascimentoUsuario, setDataNascimentoUsuario] = useState('');
  const [imgUsuario, setImgUsuario] = useState('');
  const [niveisUsuarios, setNiveisUsuarios] = useState([]);
  const idCliente = localStorage.getItem('idCliente'); 


  const [oldPassword, setOldPassword] = useState(''); // Armazena a senha antiga
  const navigate = useNavigate();

  



  // Função para buscar níveis de usuários
  useEffect(() => {
    const fetchNiveisUsuarios = async () => {
      try {
      const apiUrl = `http://localhost:8000/api/nivelUsuario?idCliente=${idCliente}`; // URL com idCliente como parâmetro
      const response = await axios.get(apiUrl);
        setNiveisUsuarios(response.data);
      } catch (error) {
        console.error("Erro ao buscar níveis de usuários:", error);
      }
    };

    fetchNiveisUsuarios();
  }, []);

  // Função para buscar os detalhes do usuário se estiver editando
  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:8000/api/user/${userId}`);
          const user = response.data.user; // Acesse a propriedade user
  
          // Agora acesse as propriedades corretamente
          setName(user.name);
          setEmail(user.email);
          setNivelUsuario(user.nivelUsuario);
          setDataNascimentoUsuario(user.dataNascimentoUsuario);
          setImgUsuario(user.imgUsuario);
          setOldPassword(user.password); // Armazena a senha antiga
  
        } catch (error) {
          console.error("Erro ao buscar detalhes do usuário:", error);
        }
      }
    };
  
    fetchUser();
  }, [userId]);

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      password: password || oldPassword, // Use a senha antiga se a nova estiver em branco
      nivelUsuario,
      dataNascimentoUsuario,
      imgUsuario,
      idCliente
    };

    try {
      if (userId) {
        // Se userId estiver presente, atualize o usuário
        await axios.put(`http://localhost:8000/api/user/${userId}`, userData)
        .then(() => {
          Swal.fire(
            'Usuário atualizado!',
            'O usuário foi atualizado com sucesso.',
            'success'
          )});
      } else {
        // Se não houver userId, crie um novo usuário
        await axios.post(`http://localhost:8000/api/user`, userData)
        .then(() => {
          Swal.fire(
            'Usuário criado!',
            'O usuário foi criado com sucesso.',
            'success'
          )});
      }
      onUserCreated(); // Atualize a lista de usuários
      navigate('/users'); // Navegue de volta para a lista de usuários
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
            'Houve um problema ao criar ou atualizar o usuário.',
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
      <Box sx={{ marginTop: 4 }}>
        <div className="d-flex justify-content-between mb-3" style={{ marginTop: '2%' }}>
          <button className="btn btn-secondary" onClick={handleGoBack}><IconArrowLeft /> Voltar</button>
        </div>
        <Typography variant="h4" gutterBottom>
          {userId ? 'Editar Usuário' : 'Criar Novo Usuário'}
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
          inputProps={{
            maxLength: 45, // Define o limite de caracteres
          }}
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
            // Não é necessário 'required' aqui, pois a senha pode ser deixada em branco
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
            {userId ? 'Atualizar Usuário' : 'Criar Usuário'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CreateUser;
