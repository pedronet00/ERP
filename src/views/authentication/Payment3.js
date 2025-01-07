import React, { useState } from 'react';
import { Grid, Box, Card, Typography, TextField, Button, Stack, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import Swal from 'sweetalert2';
import { IconCheck } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import api from '../../axiosConfig';

const Payment = ({ selectedPlano }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });
  const navigate = useNavigate();
  const plano = localStorage.getItem('plano_nome');
  const valor = localStorage.getItem('plano_valor');

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handlePayment = async (event) => {
    event.preventDefault();
  
    try {
      // Obtém o token armazenado no localStorage
      const sessionToken = localStorage.getItem('session_token');
      console.log("token: " + sessionToken)
      
      if (!sessionToken) {
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Token de sessão não encontrado. Por favor, faça login novamente.',
        });
        return;
      }
  
      // Envia os dados do pagamento para o backend
      const response = await fetch('http://localhost:8000/api/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken}`, // Envia o token no cabeçalho Authorization
        },
        body: JSON.stringify({
          payment_method: paymentMethod,
          nome_plano: plano, // Nome do plano selecionado
          valor_plano: valor, // Valor do plano selecionado (em reais)
          session_token: sessionToken,
        }),
      });
  
      // Verifica se a resposta foi bem-sucedida
      const data = await response.json();
      console.log("Resposta do backend:", data); // Para debug
  
      if (response.ok) {
        // Se o pagamento foi processado com sucesso, redireciona para o Stripe ou exibe o sucesso
        
          Swal.fire({
            icon: 'success',
            title: 'Pagamento realizado com sucesso!',
            text: `Plano ${plano} foi ativado.`,
          });

          navigate('/login'); 
  
      } else {
        // Se a resposta não for bem-sucedida
        Swal.fire({
          icon: 'error',
          title: 'Erro ao processar pagamento!',
          text: data.error || 'Tente novamente mais tarde.',
        });
      }
    } catch (err) {
      // Caso ocorra algum erro de comunicação com o backend
      console.error("Erro de comunicação:", err); // Para debug
      Swal.fire({
        icon: 'error',
        title: 'Erro de comunicação!',
        text: 'Tente novamente mais tarde.',
      });
    }
  };
  
  

  const handleBack = () => {
    navigate('/cadastro');  // Redireciona para /cadastrop
  };

  return (
    <PageContainer title="Pagamento" description="Esta é a página de pagamento">
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
        <Grid container spacing={4} sx={{ height: '100vh' }} justifyContent="center" alignItems="center">
          {/* Seção ao lado: Benefícios do ERP */}
          <Grid item xs={12} md={6} lg={5}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                Bem-vindo ao ERP Aliance!
              </Typography>
              <Typography variant="h6" color="textSecondary">
                Gerencie sua igreja de forma simples e eficiente com nosso sistema exclusivo.
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
          </Grid>

          {/* Seção de pagamento */}
          <Grid item xs={12} md={6} lg={6}>
            <Card elevation={9} sx={{ p: 4, width: '100%'}}>
              <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
                <Typography variant="h3" fontWeight="bold" ml={2}>
                  Aliance | ERP para Igrejas
                </Typography>
              </Box>

              {/* Detalhes do Plano */}
              <Typography variant="h5" fontWeight="bold" mb={2}>
                Plano Selecionado: {plano}
              </Typography>
              <Typography variant="body1" mb={2}>
                <strong>Valor Mensal:</strong> R$ {valor}
              </Typography>

              {/* Método de pagamento */}
              <Typography variant="h6" mb={2}>
                Escolha o método de pagamento:
              </Typography>

              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  color={paymentMethod === 'card' ? 'primary' : 'grey'}
                  onClick={() => setPaymentMethod('card')}
                  sx={{ width: '100%' }}
                >
                  Cartão de Crédito
                </Button>
                {/* <Button
                  variant="contained"
                  color={paymentMethod === 'pix' ? 'primary' : 'grey'}
                  onClick={() => setPaymentMethod('pix')}
                  sx={{ width: '100%' }}
                >
                  PIX
                </Button> */}
              </Stack>

              {paymentMethod === 'card' && (
                <Box mt={3}>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Número do Cartão"
                    name="cardNumber"
                    value={cardDetails.cardNumber}
                    onChange={handleCardInputChange}
                    required
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Nome no Cartão"
                    name="cardName"
                    value={cardDetails.cardName}
                    onChange={handleCardInputChange}
                    required
                  />
                  <Stack direction="row" spacing={2} mt={1}>
                    <TextField
                      fullWidth
                      label="Validade"
                      name="expiry"
                      value={cardDetails.expiry}
                      onChange={handleCardInputChange}
                      required
                    />
                    <TextField
                      fullWidth
                      label="CVV"
                      name="cvv"
                      value={cardDetails.cvv}
                      onChange={handleCardInputChange}
                      required
                    />
                  </Stack>
                </Box>
              )}

              {/* {paymentMethod === 'pix' && (
                <Box mt={3} textAlign="center">
                  <Typography variant="body1" mb={2}>
                    Escaneie o QR Code para realizar o pagamento:
                  </Typography>
                  <Box
                    sx={{
                      width: '200px',
                      height: '200px',
                      backgroundColor: '#e0e0e0',
                      margin: '0 auto',
                    }}
                  >
                    QR Code aqui
                  </Box>
                </Box>
              )} */}

              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handlePayment}
              >
                Finalizar Pagamento
              </Button>

              {/* Botão de Voltar */}
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                sx={{ mt: 2 }}
                onClick={handleBack}
              >
                Voltar
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Payment;
