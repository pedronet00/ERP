import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Box, Card, Stack, Typography, TextField, Button, Icon } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

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

      localStorage.setItem('idCliente', response.data.idCliente);
      localStorage.setItem('razaoSocial', response.data.razaoSocial);
      localStorage.setItem('nivelUsuario', response.data.nivelUsuario);
      localStorage.setItem('idUsuario', response.data.idUsuario);
      localStorage.setItem('token', response.data.token);
      Swal.fire({
        icon: 'success',
        title: 'Login realizado com sucesso!',
        text: `Redirecionando para o dashboard...`,
        timer: 2000,
        showConfirmButton: false,
      });
      navigate('/dashboard');

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
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
        <Grid container sx={{ height: '100vh' }}>
          {/* Coluna da imagem */}
          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              background: 'url(https://c0.wallpaperflare.com/preview/542/2/496/people-woman-praise-worship.jpg) center/cover no-repeat',
              display: { xs: 'none', lg: 'block' }, // Oculta a imagem em telas pequenas
            }}
          />

          {/* Coluna do formulário */}
          <Grid
            item
            xs={12}
            lg={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}>
              <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
                <Typography variant="h3" fontWeight="bold" ml={2}>
                  Aliance | ERP para igrejas
                </Typography>
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
                <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mb: 2 }}>
                  Login
                </Button>
              </form>

              {/* Link para Esqueci minha senha e Registro */}
              <Stack direction="row" justifyContent="space-between" mb={3}>
                <Typography variant="body2" color="textSecondary">
                  <Link to="/forgot-password" style={{ textDecoration: 'none', color: '#393f81' }}>
                    Esqueci minha senha
                  </Link>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Não tem uma conta?{' '}
                  <Link to="/register" style={{ textDecoration: 'none', color: '#393f81' }}>
                    Registre-se aqui
                  </Link>
                </Typography>
              </Stack>

              {/* Subtexto */}
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
