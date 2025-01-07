import React, { useState, useEffect } from 'react';
import {
  Grid,
  Box,
  Card,
  Typography,
  Stack,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { IconCheck } from '@tabler/icons-react';
import Swal from 'sweetalert2';
import PageContainer from 'src/components/container/PageContainer';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/landing_page/navbar';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    razaoSocialCliente: '',
    idPlano: '',
  });

  const [planos, setPlanos] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchPlanos = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/planos');
        const data = await response.json();
        setPlanos(data);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Erro ao carregar os planos.',
        });
      }
    };
    fetchPlanos();
  }, []);

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

      if (response.ok && data.session_token) {
        const selectedPlano = planos.find((plano) => plano.id === Number(formData.idPlano));

        if (selectedPlano) {
          localStorage.setItem('session_token', data.session_token);
          localStorage.setItem('plano_nome', selectedPlano.nomePlano);
          localStorage.setItem('plano_valor', selectedPlano.valorPlano);
          localStorage.setItem('stripe_customer_id', data.stripe_customer_id);
        }

        Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: 'Cliente registrado com sucesso!',
        });

        navigate('/pagamento');
      } else {
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
        text: 'Erro na conexão com o servidor.' + error,
      });
    }
  };

  return (
    <div>
      <Navbar backgroundColor='#1e3b8b'/>
      <PageContainer title="Cadastro - Aliance | ERP para igrejas" description="this is Register page">
        <Box
          sx={{
            position: 'relative',
            '&:before': {
              content: '""',
              position: 'absolute',
              height: '100%',
              width: '100%',
              opacity: '0.4',
            },
          }}
        >
          <Grid container spacing={4} justifyContent="center" sx={{ py: 8 }}>
            {/* Vantagens */}
            <Grid item xs={12} md={6} lg={5}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  Você está a um passo de aperfeiçoar a gestão da sua igreja!
                </Typography>
                <Typography variant="h6" color="textSecondary">
                  O Aliance te permite estar por dentro de tudo que acontece na instituição.
                </Typography>
              </Box>
              <List>
                {[
                  'Centralize todas as operações administrativas em um único lugar.',
                  'Controle financeiro eficiente para sua igreja.',
                  'Gestão de membros e eventos de forma prática.',
                  'Relatórios detalhados para tomada de decisão.',
                  'Acesso remoto a qualquer hora, de qualquer lugar.',
                ].map((benefit, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <IconCheck />
                    </ListItemIcon>
                    <ListItemText primary={benefit} />
                  </ListItem>
                ))}
              </List>

              {/* Spotify Embed */}
              {/* <Box sx={{ mt: 4 }}>
                <iframe
                  title="Spotify Player"
                  src="https://open.spotify.com/embed/track/2CGHs4oV800F94fKCzIUIt?si=30d0d5986fce4eda?utm_source=generator"
                  width="100%"
                  height="80"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                ></iframe>
              </Box> */}
            </Grid>

            {/* Formulário de Registro */}
            <Grid item xs={12} md={6} lg={5}>
              <Card elevation={9} sx={{ p: 4 }}>
                <Box textAlign="center" mb={3}>
                  <Typography variant="h4" fontWeight="bold">
                    Crie sua conta
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Escolha um plano e aproveite todos os recursos.
                  </Typography>
                </Box>
                <Box component="form" onSubmit={handleRegister}>
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
                    type="email"
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
                  <FormControl fullWidth margin="normal" required>
                    <InputLabel id="plano-label">Plano</InputLabel>
                    <Select
                      labelId="plano-label"
                      name="idPlano"
                      value={formData.idPlano}
                      onChange={handleInputChange}
                    >
                      {planos.map((plano) => (
                        <MenuItem key={plano.id} value={plano.id}>
                          {plano.nomePlano} - {plano.qtdeUsuarios} usuários - R$ {plano.valorPlano} / mês
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
                  <Typography color="textSecondary" variant="body2">
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
    </div>
  );
};

export default Register;
