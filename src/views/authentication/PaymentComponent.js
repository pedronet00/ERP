import React, { useEffect } from 'react';

const PaymentComponent = () => {
  useEffect(() => {
    const mp = new window.MercadoPago('TEST-4ee54dff-a2a3-4120-9ffa-5609b0b8eb4f', {
      locale: 'pt-BR',
    });

    const cardForm = mp.cardForm({
      amount: '100.00',
      autoMount: true,
      form: {
        id: 'payment-form',
        cardholderName: {
          id: 'form-cardholderName',
        },
        cardholderEmail: {
          id: 'form-cardholderEmail',
        },
        cardNumber: {
          id: 'form-cardNumber',
        },
        cardExpirationMonth: {
          id: 'form-cardExpirationMonth',
        },
        cardExpirationYear: {
          id: 'form-cardExpirationYear',
        },
        securityCode: {
          id: 'form-securityCode',
        },
        identificationType: {
          id: 'form-identificationType',
        },
        identificationNumber: {
          id: 'form-identificationNumber',
        },
        issuer: {
          id: 'form-issuer',
        },
      },
      callbacks: {
        onFormMounted: error => {
          if (error) console.warn('Form Mounted handling error: ', error)
        },
        onSubmit: event => {
          event.preventDefault();
          const {
            paymentMethodId: payment_method_id,
            issuerId: issuer_id,
            cardholderEmail: email,
            token,
            installments,
            identificationNumber,
            identificationType
          } = cardForm.getCardFormData();

          // Enviar os dados para o backend para criar a pre-approval
        },
        onFetching: (resource) => {
          // Mostra o carregamento
          console.log('Fetching resource: ', resource);
        }
      }
    });
  }, []);

  return (
    <form id="payment-form">
      <div>
        <input type="text" id="form-cardholderName" />
      </div>
      <div>
        <input type="email" id="form-cardholderEmail" />
      </div>
      <div>
        <input type="text" id="form-cardNumber" />
      </div>
      <div>
        <input type="text" id="form-cardExpirationMonth" />
        <input type="text" id="form-cardExpirationYear" />
      </div>
      <div>
        <input type="text" id="form-securityCode" />
      </div>
      <div>
        <input type="text" id="form-identificationType" />
        <input type="text" id="form-identificationNumber" />
      </div>
      <div>
        <button type="submit">Pagar</button>
      </div>
    </form>
  );
};

export default PaymentComponent;
