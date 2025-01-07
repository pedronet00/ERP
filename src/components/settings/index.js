import React, { useState, useEffect } from 'react'; // Importar useEffect
import { Typography, Box, Button, Tabs, Tab, AppBar } from '@mui/material';
import Swal from 'sweetalert2';
import api from '../../axiosConfig'; // Importar configuração da API

const Settings = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [funcoesPerfil, setFuncoesPerfil] = useState([]);
  const [nomePerfil, setNomePerfil] = useState('');

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Buscar nome do perfil
  const fetchPerfilName = async () => {
    try {
      const response = await api.get('http://localhost:8000/api/perfis/1');
      setNomePerfil(response.data[0].nomePerfil);
    } catch (error) {
      console.error('Erro ao buscar nome do perfil:', error);
    }
  };

  // Função para buscar as funções do perfil
  const fetchPerfilFuncoes = async () => {
    try {
      const perfilId = localStorage.getItem('perfil'); // Obter ID do perfil do localStorage
      const response = await api.get(`http://localhost:8000/api/perfis-funcoes/${perfilId}`);
      setFuncoesPerfil(response.data); // Atualiza o estado com os dados da API
    } catch (error) {
      console.error('Erro ao buscar funções do perfil:', error);
    }
  };

  // Ativar ou desativar função
  const handleToggleFuncao = async (idPerfil, idFuncao, permissaoAtual) => {
    const endpoint = permissaoAtual === 1 
      ? `http://localhost:8000/api/perfis-funcoes/${idPerfil}/${idFuncao}/desativar`
      : `http://localhost:8000/api/perfis-funcoes/${idPerfil}/${idFuncao}/ativar`;

    try {
      await api.patch(endpoint); // Chama o endpoint apropriado
      fetchPerfilFuncoes(); // Atualiza a lista de funções após a alteração
      Swal.fire({
        title: 'Função Atualizada!',
        text: `Função ${permissaoAtual === 1 ? 'desativada' : 'ativada'} com sucesso. Saia e entre do sistema para que as mudanças tenham efeito.`,
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      console.error('Erro ao alternar estado da função:', error);
      Swal.fire({
        title: 'Erro',
        text: 'Houve um problema ao alterar o estado da função.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  useEffect(() => {
    if (activeTab === 0) {
      fetchPerfilName();
      fetchPerfilFuncoes();
    }
  }, [activeTab]);

  return (
    <div style={{ maxWidth: '100%', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Configurações
      </Typography>

      <AppBar position="static" color="default">
        <Tabs value={activeTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary" variant="fullWidth">
          <Tab label="Perfil" />
          <Tab label="Idioma" />
          <Tab label="Tema" />
          <Tab label="Notificações" />
          <Tab label="Níveis de usuário" />
        </Tabs>
      </AppBar>

      {activeTab === 0 && (
        <Box mt={3}>
          <Typography variant="h6">Funções e Permissões</Typography>
          {nomePerfil && (
            <Typography variant="subtitle1" gutterBottom>
              Perfil: <b>{nomePerfil}</b>
            </Typography>
          )}
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Gerencie as permissões para cada função associada ao perfil.
          </Typography>
          {funcoesPerfil.length > 0 ? (
            funcoesPerfil.map((item) => (
              <Box key={item.id} display="flex" alignItems="center" justifyContent="space-between" mb={2} p={2} border={1} borderRadius="8px">
                <Box>
                  <Typography variant="body1"><b>{item.funcao.nome}</b></Typography>
                  <Typography variant="body2" color="textSecondary">{item.funcao.descricao}</Typography>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    color={item.permissao === 1 ? 'error' : 'success'}
                    onClick={() => handleToggleFuncao(item.idPerfil, item.funcao.id, item.permissao)}
                  >
                    {item.permissao === 1 ? 'Desativar' : 'Ativar'}
                  </Button>
                </Box>
              </Box>
            ))
          ) : (
            <Typography variant="body2">Nenhuma função encontrada.</Typography>
          )}
        </Box>
      )}

      <hr />
    </div>
  );
};

export default Settings;
