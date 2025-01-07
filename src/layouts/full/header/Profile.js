import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';

import { IconSettings } from '@tabler/icons-react';

const imgUsuario = localStorage.getItem('imgUsuario'); 

// URL do ícone padrão
const defaultImg = "https://icones.pro/wp-content/uploads/2021/02/icone-utilisateur-gris.png";

// Função para verificar se a URL da imagem do usuário é válida
const isValidImageUrl = (url) => {
  return url && url !== 'undefined' && url.startsWith('http');
};

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={isValidImageUrl(imgUsuario) ? imgUsuario : defaultImg} // Verifica se a URL é válida
          alt="Imagem do Usuário"
          sx={{
            width: 50,
            height: 50,
          }}
        />
      </IconButton>

      {/* Menu */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '200px',
          },
        }}
      >
        {/* <MenuItem component={Link} to="/dashboard/configuracoes" onClick={handleClose2}>
          <ListItemIcon>
            <IconSettings width={20} />
          </ListItemIcon>
          <ListItemText primary="Configurações" />
        </MenuItem> */}

        <Box mt={1} py={1} px={2}>
          <Button to="/login" variant="outlined" color="primary" component={Link} fullWidth>
            Sair
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
