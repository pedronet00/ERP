import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children, requiredLevel }) => {
  const isAuthenticated = !!localStorage.getItem('idCliente');
  const navigate = useNavigate();

  const nivelUsuario = parseInt(localStorage.getItem('nivelUsuario'), 10);

  useEffect(() => {
    if (!nivelUsuario || nivelUsuario < requiredLevel || !isAuthenticated) {
      navigate('/auth/login');
      
    }
  }, [isAuthenticated, navigate, ]);

  return isAuthenticated ? children : null;
};

export default PrivateRoute;
