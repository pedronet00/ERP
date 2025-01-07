import { useEffect, useState } from 'react';

const useFetchPerfilFuncao = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerfilFuncao = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/perfis-funcoes/1', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar os dados');
        }

        const data = await response.json();
        setData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPerfilFuncao();
  }, []);

  return { data, error, loading };
};

export default useFetchPerfilFuncao;
