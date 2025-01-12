import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const SuccessCheckout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [stripeCustomerId, setStripeCustomerId] = useState('');

  useEffect(() => {
    // Acessa o stripe_customer_id da URL (supondo que seja passado na URL)
    const params = new URLSearchParams(location.search);
    const customerId = params.get('stripe_customer_id');

    if (customerId) {
      setStripeCustomerId(customerId);
      cancelCheckout(customerId);
    }
  }, [location]);

  const cancelCheckout = async (stripeCustomerId) => {
    if (!stripeCustomerId) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Cliente não encontrado.',
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/success-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stripe_customer_id: stripeCustomerId }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Tudo pronto!',
          text: 'Agora é hora de começar a administrar a sua igreja.',
        }).then(() => {
          navigate('/login'); // Redireciona para a página inicial
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: data.error || 'Erro ao ter o sucesso do checkout.',
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

  return null; // Não renderiza nada, apenas faz o processo em segundo plano
};

export default SuccessCheckout;
