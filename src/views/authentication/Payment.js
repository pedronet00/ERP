import React, { useEffect } from 'react';
import { Grid, Box, Card, Typography, Button } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

const SavePaymentMethod = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.async = true;
    script.onload = () => {
      const mp = new window.MercadoPago('TEST-4ee54dff-a2a3-4120-9ffa-5609b0b8eb4f'); // Substitua pela sua chave pública

      mp.cardForm({
        amount: '100.00', // Substitua pelo valor da transação
        autoMount: true,
        form: {
          id: 'form-checkout',
          cardholderName: {
            id: 'form-checkout__cardholderName',
            placeholder: 'Nome no cartão',
          },
          cardholderEmail: {
            id: 'form-checkout__cardholderEmail',
            placeholder: 'Email',
          },
          cardNumber: {
            id: 'form-checkout__cardNumber',
            placeholder: 'Número do cartão',
          },
          cardExpirationMonth: {
            id: 'form-checkout__cardExpirationMonth',
            placeholder: 'MM',
          },
          cardExpirationYear: {
            id: 'form-checkout__cardExpirationYear',
            placeholder: 'AA',
          },
          securityCode: {
            id: 'form-checkout__securityCode',
            placeholder: 'CVV',
          },
          installments: {
            id: 'form-checkout__installments',
            placeholder: 'Parcelas',
          },
          identificationType: {
            id: 'form-checkout__identificationType',
            placeholder: 'Tipo de documento',
          },
          identificationNumber: {
            id: 'form-checkout__identificationNumber',
            placeholder: 'Número do documento',
          },
          issuer: {
            id: 'form-checkout__issuer',
            placeholder: 'Emissor',
          },
        },
        callbacks: {
          onFormMounted: error => {
            if (error) return console.error('Form Mounted handling error: ', error);
            console.log('Form mounted');
          },
          onSubmit: event => {
            event.preventDefault();

            const {
              token,
              issuer_id,
              payment_method_id,
              installments,
              identification_number,
              identification_type,
            } = mp.cardForm.getCardFormData();

            fetch('http://localhost:8000/api/payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                token,
                issuer_id,
                payment_method_id,
                installments,
                identification_number,
                identification_type,
                transaction_amount: '100.00', // Substitua pelo valor da transação
              }),
            }).then(response => {
              return response.json();
            }).then(result => {
              console.log(result);
              if (result.success) {
                alert('Pagamento realizado com sucesso!');
              } else {
                alert('Erro ao processar o pagamento: ' + result.message);
              }
            });
          },
          onFetching: (resource) => {
            console.log('Fetching resource: ', resource);
            // Exibir um loader enquanto o pagamento está sendo processado
          }
        }
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <PageContainer title="Pagamento" description="Insira detalhes do cartão">
      <Box>
        <Grid container spacing={4} sx={{ height: '100vh' }} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={6} lg={5}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                Insira seus dados de pagamento
              </Typography>
              <Typography variant="h6" color="textSecondary">
                Gerencie sua assinatura com segurança.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Card elevation={1} sx={{ p: 4, width: '100%' }}>
              <form id="form-checkout">
                <input type="text" id="form-checkout__cardholderName" />
                <input type="email" id="form-checkout__cardholderEmail" />
                <input type="text" id="form-checkout__cardNumber" />
                <input type="text" id="form-checkout__cardExpirationMonth" />
                <input type="text" id="form-checkout__cardExpirationYear" />
                <input type="text" id="form-checkout__securityCode" />
                <select id="form-checkout__installments"></select>
                <input type="text" id="form-checkout__identificationType" />
                <input type="text" id="form-checkout__identificationNumber" />
                <input type="text" id="form-checkout__issuer" />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                  Confirmar Pagamento
                </Button>
              </form>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default SavePaymentMethod;
