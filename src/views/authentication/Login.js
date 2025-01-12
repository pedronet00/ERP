import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Box, Card, Stack, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../../components/landing_page/navbar';

// components
import PageContainer from 'src/components/container/PageContainer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const hasReloaded = localStorage.getItem('hasReloadedLoginPage');

    if (!hasReloaded) {
      localStorage.clear();
      localStorage.setItem('hasReloadedLoginPage', 'true');
      window.location.reload();
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });

      // Salvar os dados no localStorage
      localStorage.setItem('idCliente', response.data.idCliente);
      localStorage.setItem('razaoSocial', response.data.razaoSocial);
      localStorage.setItem('perfil', response.data.perfil);
      localStorage.setItem('idUsuario', response.data.idUsuario);
      localStorage.setItem('nome', response.data.nome);
      localStorage.setItem('imgUsuario', 'http://localhost:8000/storage/' + response.data.imgUsuario);
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
      const errorMessage = err.response?.data?.message || 'Erro ao fazer login';
      Swal.fire({
        icon: 'error',
        title: 'Erro ao fazer login!',
        text: errorMessage,
      });
      setError(errorMessage);
    }
  };

  return (
    <div>
      <Navbar backgroundColor='#1e3b8b' />
      <PageContainer title="Login" description="this is Login page">
        <Box sx={{}}>
          <Grid container sx={{ height: '90vh' }}>
            <Grid item xs={12} lg={12} display="flex" justifyContent="center" alignItems="center">
              <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}>
                <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
                  <Typography variant="h3" fontWeight="bold" ml={2}>
                    Aliance | ERP para Igrejas
                  </Typography>
                </Box>

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

                <Stack direction="row" justifyContent="space-between" mb={3}>
                  <Typography variant="body2" color="textSecondary">
                    <Link to="/forgot-password" style={{ textDecoration: 'none', color: '#393f81' }}>
                      Esqueci minha senha
                    </Link>
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Não tem uma conta?{' '}
                    <Link to="/cadastro" style={{ textDecoration: 'none', color: '#393f81' }}>
                      Registre-se aqui
                    </Link>
                  </Typography>
                </Stack>

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
    </div>
  );
};

export default Login;
