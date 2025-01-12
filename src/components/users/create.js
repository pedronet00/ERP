import React, { useState, useEffect } from 'react';
import api from '../../axiosConfig';
import Swal from 'sweetalert2';
import { TextField, Button, Container, Typography, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';

// Função para gerar senha aleatória de 24 caracteres
const generateRandomPassword = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
  let password = '';
  for (let i = 0; i < 24; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
};

const CreateUser = ({ onUserCreated }) => {
  const { userId } = useParams(); 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(generateRandomPassword()); // Define a senha aleatória automaticamente
  const [perfil, setPerfil] = useState('');
  const [dataNascimentoUsuario, setDataNascimentoUsuario] = useState('');
  const [imgUsuario, setImgUsuario] = useState(null); // Alterado para armazenar a imagem
  const [perfis, setPerfis] = useState([]);
  const idCliente = localStorage.getItem('idCliente');
  const [oldPassword, setOldPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerfis = async () => {
      try {
        const apiUrl = `http://localhost:8000/api/perfis?idCliente=${idCliente}`; 
        const response = await api.get(apiUrl);
        setPerfis(response.data);
      } catch (error) {
        console.error("Erro ao buscar perfis:", error);
      }
    };

    fetchPerfis();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        try {
          const response = await api.get(`http://localhost:8000/api/user/${userId}?idCliente=${idCliente}`);
          const user = response.data.user;
  
          setName(user.name);
          setEmail(user.email);
          setPerfil(user.perfil);
          setDataNascimentoUsuario(user.dataNascimentoUsuario);
          setImgUsuario(user.imgUsuario);
          setOldPassword(user.password);
        } catch (error) {
          Swal.fire('Erro!', 'Não foi possível buscar os detalhes do usuário.', 'error')
            .then(() => {
                navigate(-1);
            });
        }
      }
    };
  
    fetchUser();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Criando o FormData para enviar a imagem e os dados do usuário
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password || oldPassword); // Usando a senha aleatória ou a antiga
    formData.append('perfil', perfil);
    formData.append('dataNascimentoUsuario', dataNascimentoUsuario);
    formData.append('idCliente', idCliente);

    // Se uma imagem foi selecionada, adicione ao FormData
    if (imgUsuario instanceof File) {
      formData.append('imgUsuario', imgUsuario);
    } else {
      formData.append('imgUsuario', imgUsuario); // Caso já tenha a URL
    }

    try {
      if (userId) {
        await api.put(`http://localhost:8000/api/user/${userId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Necessário para enviar arquivos
          },
        }).then(() => {
          Swal.fire(
            'Usuário atualizado!',
            'O usuário foi atualizado com sucesso.',
            'success'
          );
        });
        navigate('/dashboard/users');
      } else {
        await api.post(`http://localhost:8000/api/user`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then(() => {
          Swal.fire(
            'Usuário criado!',
            'O usuário foi criado com sucesso.',
            'success'
          );
        });
        onUserCreated(); 
        navigate('/dashboard/users');
      }
    } catch (error) {
      if (error.response && error.response.data.error) {
        Swal.fire(
          'Erro!',
          error.response.data.error,
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
            inputProps={{ maxLength: 45 }}
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            inputProps={{ maxLength: 40 }}
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {/* Removido o campo de senha */}
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="perfil-label">Perfil</InputLabel>
            <Select
              labelId="perfil-label"
              id="perfil"
              value={perfil}
              onChange={(e) => setPerfil(e.target.value)}
              label="Perfil"
            >
              <MenuItem value="">
                <em>Selecione um perfil</em>
              </MenuItem>
              {perfis.map((perfil) => (
                <MenuItem key={perfil.id} value={perfil.id}>
                  {perfil.nomePerfil}
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
          {/* Campo para upload de imagem */}
          <TextField
            type="file"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setImgUsuario(e.target.files[0])} // Armazenar o arquivo selecionado
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
