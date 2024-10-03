import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children, requiredLevel }) => {
  const isAuthenticated = !!localStorage.getItem('email');
  const nivelUsuario = parseInt(localStorage.getItem('nivelUsuario'), 10);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || (requiredLevel && nivelUsuario < requiredLevel)) {
      navigate('/auth/login');
    }
  }, [isAuthenticated, navigate, requiredLevel, nivelUsuario]);

  return isAuthenticated && (!requiredLevel || nivelUsuario >= requiredLevel) ? children : null;
};

export default PrivateRoute;
