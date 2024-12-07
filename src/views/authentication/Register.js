import React, { useState } from 'react';
import { Grid, Box, Card, Typography, Stack, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';

const Register = () => {
  // State para os campos do formulário
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    razaoSocialCliente: '',
  });

  // Função para capturar os dados dos inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  

  // Função para lidar com o registro do cliente
  const handleRegister = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      console.log("FORM DATA: " + JSON.stringify(formData));


      if (response.ok) {
        // Registro bem-sucedido
        Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: 'Cliente registrado com sucesso!',
        });
      } else {
        // Algum erro ocorreu
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: data.message || 'Ocorreu um erro ao registrar o cliente.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Erro na conexão com o servidor.',
      });
    }
  };

  return (
    <PageContainer title="Register" description="this is Register page">
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
                <Typography variant='h3'>Registre-se no ERP Aliance</Typography>
              </Box>

              <Box component="form" onSubmit={handleRegister} sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Razão Social"
                  name="razaoSocialCliente"
                  value={formData.razaoSocialCliente}
                  onChange={handleInputChange}
                  required
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="E-mail"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Senha"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Registrar
                </Button>
              </Box>

              <Stack direction="row" justifyContent="center" spacing={1} mt={3}>
                <Typography color="textSecondary" variant="h6" fontWeight="400">
                  Já tem uma conta?
                </Typography>
                <Typography
                  component={Link}
                  to="/auth/login"
                  fontWeight="500"
                  sx={{
                    textDecoration: 'none',
                    color: 'primary.main',
                  }}
                >
                  Entrar
                </Typography>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Register;
