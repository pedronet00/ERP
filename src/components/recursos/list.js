import React, { useState, useEffect } from 'react'; // Importar useEffect
import { Typography, Box, Select, MenuItem, Button, FormControl, Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField, Tabs, Tab, AppBar, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { IconMinus, IconEdit, IconPlus, IconClipboard } from '@tabler/icons-react';
import Swal from 'sweetalert2';

const RecursosList = () => {
  
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSaveSettings = () => {
    
    
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
        Recursos da Primeira Igreja Batista de Presidente Prudente
      </Typography>

      <AppBar position="static" style={{marginTop: '2%'}} color="default">
        <Tabs value={activeTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary" variant="fullWidth">
          <Tab label="Comida" />
          <Tab label="Ensino" />
          <Tab label="Escritório" />
          <Tab label="Limpeza" />
          <Tab label="Móveis" />
          <Tab label="Promoção" />
          <Tab label="Tecnologia" />
          <Tab label="Outros" />
        </Tabs>
      </AppBar>

      {activeTab === 0 && (
        <Box mt={3}>
            <Table sx={{ marginTop: '2%' }}>
                <TableHead>
                    <TableRow>
                        <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                            ID
                        </Typography>
                        </TableCell>
                        <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                            Nome
                        </Typography>
                        </TableCell>
                        <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                            Tipo
                        </Typography>
                        </TableCell>
                        <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                            Quantidade
                        </Typography>
                        </TableCell>
                        <TableCell align="right">
                        <Typography variant="subtitle2" fontWeight={600}>
                            Ações
                        </Typography>
                        </TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow key='1'>
                            <TableCell>
                            <Typography variant="body2">1</Typography>
                            </TableCell>
                            <TableCell>
                            <Typography variant="body2">Arroz Branco 5kg</Typography>
                            </TableCell>
                            <TableCell>
                            <Typography variant="body2">Não perecível</Typography>
                            </TableCell>
                            <TableCell>
                            <Typography variant="body2">20</Typography>
                            </TableCell>
                            <TableCell align="right">
                            <IconMinus />
                            <IconPlus />
                            </TableCell>
                        </TableRow>
                </TableBody>
            </Table>
        </Box>
      )}

       {activeTab === 1 && (
        <Box mt={3}>
          <Table sx={{ marginTop: '2%' }}>
                <TableHead>
                    <TableRow>
                        <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                            ID
                        </Typography>
                        </TableCell>
                        <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                            Nome
                        </Typography>
                        </TableCell>
                        <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                            Tipo
                        </Typography>
                        </TableCell>
                        <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                            Quantidade
                        </Typography>
                        </TableCell>
                        <TableCell align="right">
                        <Typography variant="subtitle2" fontWeight={600}>
                            Ações
                        </Typography>
                        </TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow key='1'>
                            <TableCell>
                            <Typography variant="body2">1</Typography>
                            </TableCell>
                            <TableCell>
                            <Typography variant="body2">Revista Nova Vida em Cristo I</Typography>
                            </TableCell>
                            <TableCell>
                            <Typography variant="body2">Revista</Typography>
                            </TableCell>
                            <TableCell>
                            <Typography variant="body2">40</Typography>
                            </TableCell>
                            <TableCell align="right">
                            <IconMinus />
                            <IconPlus />
                            </TableCell>
                        </TableRow>
                        <TableRow key='2'>
                            <TableCell>
                            <Typography variant="body2">2</Typography>
                            </TableCell>
                            <TableCell>
                            <Typography variant="body2">Revista Nova Vida em Cristo II</Typography>
                            </TableCell>
                            <TableCell>
                            <Typography variant="body2">Revista</Typography>
                            </TableCell>
                            <TableCell>
                            <Typography variant="body2">20</Typography>
                            </TableCell>
                            <TableCell align="right">
                            <IconMinus />
                            <IconPlus />
                            </TableCell>
                        </TableRow>
                        <TableRow key='3'>
                            <TableCell>
                            <Typography variant="body2">3</Typography>
                            </TableCell>
                            <TableCell>
                            <Typography variant="body2">Comentário expositivo evangelho segundo Lucas</Typography>
                            </TableCell> 
                            <TableCell>
                            <Typography variant="body2">Livro</Typography>
                            </TableCell>
                            <TableCell>
                            <Typography variant="body2">1</Typography>
                            </TableCell>
                            <TableCell align="right">
                            <IconMinus />
                            <IconPlus />
                            </TableCell>
                        </TableRow>
                </TableBody>
            </Table>
        </Box>
      )}

      {/* {activeTab === 3 && (
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
      )}} */}

      <hr />

      <Box textAlign="center" mt={4}>
        <Button variant="contained" color="primary" onClick={handleSaveSettings}>
          Salvar
        </Button>
      </Box>
    </div>
  );
};

export default RecursosList;
