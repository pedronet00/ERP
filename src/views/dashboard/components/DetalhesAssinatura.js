import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Typography } from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';

const SubscriptionDetails = () => {
  const [clienteData, setClienteData] = useState(null);
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const clienteId = localStorage.getItem('idCliente'); // ID do cliente (substitua conforme necessário)

  const fetchClienteData = async () => {
    try {
      // Obtém os dados do cliente, incluindo o stripe_customer_id
      const clienteResponse = await axios.get(`http://localhost:8000/api/clientes/${clienteId}`);
      setClienteData(clienteResponse.data);

      // Busca as informações da assinatura no Stripe usando o stripe_customer_id
      const stripeCustomerId = clienteResponse.data.stripe_customer_id;

      if (!stripeCustomerId) {
        throw new Error('Cliente não possui um Stripe Customer ID.');
      }

      const subscriptionResponse = await axios.get(
        `http://localhost:8000/api/stripe/subscription/${stripeCustomerId}`
      );

      setSubscriptionData(subscriptionResponse.data);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Erro ao carregar dados.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClienteData();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <DashboardCard title={`Assinatura de ${clienteData?.razaoSocialCliente}`}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography>
                    <span style={{ fontWeight: '600' }}>Status:</span>{' '}
                    {subscriptionData?.subscription?.status === 'active' ? 'Ativa' : 'Inativa'}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    <span style={{ fontWeight: '600' }}>Próximo pagamento:</span>{' '}
                    {subscriptionData?.subscription?.current_period_end
                    ? new Date(subscriptionData.subscription.current_period_end * 1000).toLocaleDateString()
                    : 'N/A'}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    <span style={{ fontWeight: '600' }}>Plano:</span>{' '}
                    {subscriptionData?.plan?.nickname || 'N/A'}
                </Typography>
            </Grid>
        </Grid>
    </DashboardCard>
  );
};

export default SubscriptionDetails;
