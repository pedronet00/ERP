import React, { createContext, useState, useEffect } from 'react';
import fetchPermissoes from './permissions';

const PermissoesContext = createContext([]);

export const PermissoesProvider = ({ children }) => {
  const [permissoes, setPermissoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarPermissoes = async () => {
      try {
        const perfilId = localStorage.getItem('perfil');
        if (!perfilId) {
          setLoading(false);
          return;
        }
        const data = await fetchPermissoes();
        setPermissoes(data);
      } catch (error) {
        console.error('Erro ao carregar permissões:', error);
      } finally {
        setLoading(false);
      }
    };

    carregarPermissoes();
  }, []);


  return (
    <PermissoesContext.Provider value={permissoes}>
      {children}
    </PermissoesContext.Provider>
  );
};

export default PermissoesContext;
