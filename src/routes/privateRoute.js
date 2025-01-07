import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PermissoesContext from './PermissionsContext';

const PrivateRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const isAuthenticated = !!localStorage.getItem('idCliente');
  const navigate = useNavigate();

  useEffect(() => {
    const verificarPermissao = () => {
      if (!isAuthenticated) {
        navigate('/auth/login');
        return;
      }

      setIsAuthorized(true);
    };

    verificarPermissao();
  }, [isAuthenticated, navigate,]);

  if (!isAuthorized) {
    return null; // Ou um spinner de carregamento
  }

  return children;
};

export default PrivateRoute;
