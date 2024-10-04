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

  const handleNewUser = () => {
    navigate('/missoes/create');
  };

  return (
    <div style={{ maxWidth: '100%', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Recursos da Primeira Igreja Batista de Presidente Prudente
      </Typography>

      <div className="d-flex justify-content-between mb-3" style={{marginTop: '2%'}}>
        <button className="btn btn-success" onClick={handleNewUser}><IconClipboard /> Gerar Relatório</button>
        <button className="btn btn-primary" onClick={handleNewUser}><IconPlus /> Novo Recurso</button>
      </div>

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

      {activeTab === 2 && (
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
                            <Typography variant="body2">Copos plásticos 100 unidades</Typography>
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
                            <Typography variant="body2">Calhamaço folhas A4</Typography>
                            </TableCell>
                            <TableCell>
                            <Typography variant="body2">100</Typography>
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
                            <Typography variant="body2">Canetas BIC</Typography>
                            </TableCell>
                            <TableCell>
                            <Typography variant="body2">70</Typography>
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

      {activeTab === 3 && (
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
