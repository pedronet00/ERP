import React, { useState, useEffect } from 'react'; // Importar useEffect
import { Typography, Box, Select, MenuItem, Button, FormControl, Tabs, Tab, AppBar, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import Swal from 'sweetalert2';
import Menuitems from '../../layouts/full/sidebar/MenuItems'; 
import { basedarkTheme, baselightTheme } from '../../theme/DefaultColors';
import { ThemeProvider } from '@mui/material/styles';

const Settings = () => {
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState(() => {
    // Tenta obter o tema do localStorage, se não existir, retorna 'light'
    return localStorage.getItem('theme') || 'light';
  });
  const [notifications, setNotifications] = useState('enabled');
  const [activeTab, setActiveTab] = useState(0);
  const [menuAccess, setMenuAccess] = useState(Menuitems);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSaveSettings = () => {
    // Salva o tema no localStorage ao clicar em "Salvar Configurações"
    localStorage.setItem('theme', theme);
    
    Swal.fire({
      title: 'Configurações Salvas!',
      text: 'As suas configurações foram salvas com sucesso.',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {
      // Atualiza a página após o alerta ser fechado
      window.location.reload();
    });
  };

  const handleMenuAccessChange = (id, level) => {
    const updatedMenu = menuAccess.map((item) => {
      if (item.id === id) {
        const newAllowedLevels = item.allowedLevels.includes(level)
          ? item.allowedLevels.filter((lvl) => lvl !== level)
          : [...item.allowedLevels, level];
        return { ...item, allowedLevels: newAllowedLevels };
      }
      return item;
    });
    setMenuAccess(updatedMenu);
  };

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

      {activeTab === 1 && (
        <Box mt={3}>
          <Typography variant="h6">Idioma</Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Escolha o idioma preferido para o sistema.
          </Typography>
          <FormControl fullWidth>
            <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
              <MenuItem value="en">Inglês</MenuItem>
              <MenuItem value="pt">Português</MenuItem>
              <MenuItem value="es">Espanhol</MenuItem>
            </Select>
          </FormControl>
        </Box>
      )}

      {activeTab === 2 && (
        <Box mt={3}>
          <Typography variant="h6">Tema</Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Selecione o tema de cores que deseja usar.
          </Typography>
          <FormControl fullWidth>
            <Select value={theme} onChange={(e) => setTheme(e.target.value)}>
              <MenuItem value="light">Claro</MenuItem>
              <MenuItem value="dark">Escuro</MenuItem>
            </Select>
          </FormControl>
        </Box>
      )}

      {activeTab === 3 && (
        <Box mt={3}>
          <Typography variant="h6">Notificações</Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Ativar ou desativar notificações por e-mail.
          </Typography>
          <FormControl fullWidth>
            <Select value={notifications} onChange={(e) => setNotifications(e.target.value)}>
              <MenuItem value="enabled">Ativadas</MenuItem>
              <MenuItem value="disabled">Desativadas</MenuItem>
            </Select>
          </FormControl>
        </Box>
      )}

      {activeTab === 4 && (
        <Box mt={3}>
          <Typography variant="h6">Configurações de Acesso ao Menu</Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Defina quais níveis de usuário podem acessar cada item do menu.
          </Typography>
          {menuAccess.map((item) =>
            item.navlabel ? (
              <Typography key={item.subheader} variant="h4" gutterBottom>
                <hr />
                <b>{item.subheader}:</b>
              </Typography>
            ) : (
              <Box key={item.id} mb={2}>
                <Typography variant="body1"><b>{item.title}</b></Typography>
                <FormGroup row>
                  {[1, 2, 3, 4].map((level) => (
                    <FormControlLabel
                      key={level}
                      control={
                        <Checkbox
                          checked={item.allowedLevels.includes(level)}
                          onChange={() => handleMenuAccessChange(item.id, level)}
                        />
                      }
                      label={`Nível ${level}`}
                    />
                  ))}
                </FormGroup>
              </Box>
            )
          )}
        </Box>
      )}

      <hr />

      <Box textAlign="center" mt={4}>
        <Button variant="contained" color="primary" onClick={handleSaveSettings}>
          Salvar Configurações
        </Button>
      </Box>
    </div>
  );
};

export default Settings;
