import axios from 'axios';

const fetchPermissoes = async () => {
  const perfilId = localStorage.getItem('perfil');
  if (!perfilId) throw new Error('Perfil não definido');

  try {
    const response = await axios.get(`http://localhost:8000/api/perfis-funcoes/${perfilId}`);
    return response.data; // Retorna a lista de funções liberadas
  } catch (error) {
    console.error('Erro ao carregar permissões:', error);
    throw error;
  }
};

export default fetchPermissoes;
