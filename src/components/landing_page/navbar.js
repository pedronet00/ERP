import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Container } from '@mui/material';
import { useNavigate } from 'react-router';
// import MenuIcon from '@mui/icons-material/Menu';

const Navbar = ({ backgroundColor = '#404e90', textColor = '#fff', hoverColor = '#6085fe' }) => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ backgroundColor: backgroundColor, boxShadow: 'none' }}>
      <Container>
        <Toolbar>
          {/* Logo */}
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: 'bold',
              color: textColor,
              cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
          >
            Aliance | ERP para igrejas
          </Typography>

          {/* Links de Navegação */}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Button
              href="/"
              color="inherit"
              sx={{
                margin: '0 10px',
                color: textColor,
                '&:hover': { color: hoverColor },
              }}
            >
              Início
            </Button>
            <Button
              href="/#features"
              color="inherit"
              sx={{
                margin: '0 10px',
                color: textColor,
                '&:hover': { color: hoverColor },
              }}
            >
              Funcionalidades
            </Button>
            <Button
              href="/#pricing"
              color="inherit"
              sx={{
                margin: '0 10px',
                color: textColor,
                '&:hover': { color: hoverColor },
              }}
            >
              Preços
            </Button>
            <Button
              href="/#contact"
              color="inherit"
              sx={{
                margin: '0 10px',
                color: textColor,
                '&:hover': { color: hoverColor },
              }}
            >
              Contato
            </Button>

            <Button
              href="/termos-e-condicoes"
              color="inherit"
              sx={{
                margin: '0 10px',
                color: textColor,
                '&:hover': { color: hoverColor },
              }}
            >
              Termos
            </Button>
          </Box>

          {/* Botão de ação principal */}
          <Button
            variant="contained"
            color="primary"
            sx={{
              marginLeft: 2,
            }}
            onClick={() => navigate('/login')}
          >
            Login
          </Button>

          {/* Menu Hamburger para dispositivos móveis */}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: 'block', md: 'none' }, marginLeft: 2 }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
