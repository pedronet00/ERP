import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Box, Card, Stack, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Importando o Swal para alertas

// components
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });

      console.log(response.data); // Aqui você pode usar a resposta conforme necessário

      localStorage.setItem('idCliente', response.data.idCliente);
      localStorage.setItem('razaoSocial', response.data.razaoSocial);
      localStorage.setItem('nivelUsuario', response.data.nivelUsuario);
      Swal.fire({
        icon: 'success',
        title: 'Login realizado com sucesso!',
        text: `Redirecionando para dashboard...`,
        timer: 2000,
        showConfirmButton: false,
    });
      navigate('/');

    } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao fazer login!',
          text: 'Email ou senha incorretos.',
        });
      setError(err.response.data.message || 'Erro ao fazer login');
    }
  };

  return (
    <PageContainer title="Login" description="this is Login page">
      <Box
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
        <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>

              {/* Formulário de Login */}
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Email"
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Senha"
                  type="password"
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {error && (
                  <Typography color="error" variant="body2" align="center">
                    {error}
                  </Typography>
                )}
                <Button fullWidth variant="contained" color="primary" type="submit">
                  Login
                </Button>
              </form>

              {/* Subtexto e Citação */}
              <Typography variant="subtitle1" textAlign="center" color="textSecondary" mb={1}>
                Sistema Gerenciador da Primeira Igreja Batista de Presidente Prudente
              </Typography>
              <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
                <Typography color="textSecondary" variant="h6" fontWeight="500" textAlign="center">
                  <i>
                    "Porque dele, por Ele e para Ele são todas as coisas. Glórias, pois, à Ele
                    eternamente. Amém!"
                  </i>
                  <br /> Ro 11:36
                </Typography>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Login;
