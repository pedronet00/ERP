import React, { useEffect, useState } from 'react';
import PageContainer from 'src/components/container/PageContainer';
import { Grid, Box, Card, Typography, TextField, Button, Stack, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { IconCheck } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const stripe_customer_id = localStorage.getItem('stripe_customer_id');

const plano_nome = localStorage.getItem('plano_nome');

let plano_id_stripe = ''; 

if (plano_nome === "Básico") {
  plano_id_stripe = 'prod_RUSjhtnI1e2VM8';
} else if (plano_nome === "Padrão") {
  plano_id_stripe = 'prod_RUlgIzdkIMg4m2';
} else if (plano_nome === "Premium") {
  plano_id_stripe = 'prod_RUlhWe1JP8RfMu';
}


const SavePaymentMethod = () => {
  const [stripe, setStripe] = useState(null);
  const [cardElement, setCardElement] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (window.Stripe) {
      const stripeInstance = window.Stripe('pk_test_51Qb5k0JzC0nP78mHeAR19t5OKAmw6wzaeaPRMkYIvpODMAlLUb9WRDb8zxP30eqG7URLM6QBzxb2h9IESN7TYF36009aBIO0fY'); // Substitua pela sua chave pública
      setStripe(stripeInstance);
      const elements = stripeInstance.elements();
      const card = elements.create('card', {
        style: {
          base: {
            fontSize: '16px',
            color: '#424770',
            '::placeholder': { color: '#aab7c4' },
          },
          invalid: { color: '#9e2146' },
        },
      });
      card.mount('#card-element');
      setCardElement(card);
    }
  }, []);

  const handleSavePaymentMethod = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (!stripe || !cardElement) {
      setMessage('Stripe não foi carregado corretamente.');
      setLoading(false);
      return;
    }

    try {
      // Cria o método de pagamento
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: e.target.name.value,
          email: e.target.email.value,
        },
      });

      if (error) {
        setMessage(`Erro ao criar método de pagamento: ${error.message}`);
        setLoading(false);
        return;
      }

      // Envia o método de pagamento ao backend
      const response = await fetch('http://localhost:8000/api/attach-payment-method', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          payment_method_id: paymentMethod.id,
          stripe_customer_id: stripe_customer_id, // ID do cliente no Stripe
        }),
      });

      const result = await response.json();
      if (result.success) {
        // Método de pagamento salvo com sucesso, agora inicia a assinatura
        setMessage('Método de pagamento salvo. Iniciando assinatura...');
        await startSubscription();
      } else {
        setMessage(`Erro ao salvar método de pagamento: ${result.error}`);
      }
    } catch (err) {
      setMessage(`Erro ao conectar com o servidor: ${err.message}`);
    }

    setLoading(false);
  };

  const startSubscription = async () => {
    try {
      const subscriptionResponse = await fetch('http://localhost:8000/api/start-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stripe_customer_id: stripe_customer_id,
          product_id: plano_id_stripe, // ID do produto mockado
        }),
      });

      const subscriptionResult = await subscriptionResponse.json();
      if (subscriptionResult.success) {
        setMessage('Assinatura iniciada com sucesso!');
        navigate('/login');
      } else {
        setMessage(`Erro ao iniciar assinatura: ${subscriptionResult.error}`);
      }
    } catch (err) {
      setMessage(`Erro ao conectar para iniciar assinatura: ${err.message}`);
    }
  };

  return (
    <PageContainer title="Pagamento" description="Esta é a página de pagamento">
      <Box
        sx={{
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
            <Card elevation={1} sx={{ p: 4, width: '100%'}}>
              <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
      <h2>Salvar Método de Pagamento e Iniciar Assinatura</h2>
      <form onSubmit={handleSavePaymentMethod}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="name">Nome no Cartão:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nome completo"
            required
            style={{
              display: 'block',
              width: '100%',
              padding: '10px',
              marginTop: '5px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="E-mail para cobrança"
            required
            style={{
              display: 'block',
              width: '100%',
              padding: '10px',
              marginTop: '5px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>
        <div id="card-element" style={{ marginBottom: '1rem', border: '1px solid #ccc', padding: '10px', borderRadius: '4px' }}>
          {/* O Stripe.js monta o CardElement aqui */}
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px 20px',
            background: '#6772E5',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Salvando e Iniciando Assinatura...' : 'Salvar e Assinar'}
        </button>
      </form>
      {message && <p style={{ marginTop: '1rem', color: message.includes('Erro') ? 'red' : 'green' }}>{message}</p>}
    </div>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default SavePaymentMethod;