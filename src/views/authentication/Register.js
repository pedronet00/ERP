import React, { useState, useEffect } from 'react';
import {
  Grid,
  Box,
  Card,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/landing_page/navbar';
import PageContainer from 'src/components/container/PageContainer';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51Qb5k0JzC0nP78mHeAR19t5OKAmw6wzaeaPRMkYIvpODMAlLUb9WRDb8zxP30eqG7URLM6QBzxb2h9IESN7TYF36009aBIO0fY');

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    razaoSocialCliente: '',
    cnpj: '',
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

  const handleCnpjChange = (e) => {
    const cnpjValue = e.target.value.replace(/\D/g, '');
    setFormData({
      ...formData,
      cnpj: cnpjValue,
    });
  };

  const validateCnpj = (cnpj) => /^[0-9]{14}$/.test(cnpj);

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

    if (!validateCnpj(formData.cnpj)) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'CNPJ inválido.',
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.stripe_customer_id && data.plano) {
        Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: 'Cliente registrado com sucesso!',
        });

        // Iniciar o processo de checkout
        handleCheckout(data.stripe_customer_id, data.plano);
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

  const handleCheckout = async (stripeCustomerId, planoId) => {
    try {
      const response = await fetch('http://localhost:8000/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stripe_customer_id: stripeCustomerId,
          plano_id: planoId,
        }),
      });

      const data = await response.json();

      if (data.session_id) {
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
          sessionId: data.session_id,
        });

        if (error) {
          Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Erro ao redirecionar para o checkout.',
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: data.error || 'Erro ao criar a sessão de checkout.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Erro ao criar a sessão de checkout.' + error,
      });
    }
  };

  return (
    <div>
      <Navbar backgroundColor='#1e3b8b' />
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
                    label="CNPJ"
                    name="cnpj"
                    value={formData.cnpj}
                    onChange={handleCnpjChange}
                    required
                    inputProps={{ maxLength: 14 }}
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
                      value={formData.idPlano}
                      onChange={handleInputChange}
                      label="Plano"
                      name="idPlano"
                    >
                      {planos.map((plano) => (
                        <MenuItem key={plano.id} value={plano.id}>
                          {plano.nomePlano} - R$ {plano.valorPlano}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                    sx={{ mt: 2 }}
                  >
                    Registrar
                  </Button>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </PageContainer>
    </div>
  );
};

export default Register;
