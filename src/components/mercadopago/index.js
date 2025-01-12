import React, { useEffect } from 'react';

const MercadoPagoButton = () => {
  useEffect(() => {
    const loadScript = () => {
      if (window.$MPC_loaded !== true) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = `${document.location.protocol}//secure.mlstatic.com/mptools/render.js`;
        document.body.appendChild(script);
        window.$MPC_loaded = true;
      }
    };

    if (window.$MPC_loaded !== true) {
      window.addEventListener('load', loadScript);
    } else {
      loadScript();
    }

    // Cleanup listener
    return () => {
      window.removeEventListener('load', loadScript);
    };
  }, []);

  // Event listener for modal close message
  useEffect(() => {
    const messageHandler = (event) => {
      // Handle the event message from the modal here
      console.log(`Received message: ${event.data} preapproval_id`);
    };

    window.addEventListener('message', messageHandler);

    // Cleanup listener
    return () => {
      window.removeEventListener('message', messageHandler);
    };
  }, []);

  return (
    <a 
      href="https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=2c938084943f2b0c019442f8ed1501bd" 
      name="MP-payButton" 
      className='blue-ar-l-rn-none'
    >
      Suscribirme
    </a>
  );
};

export default MercadoPagoButton;
