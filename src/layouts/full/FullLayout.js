import React, { useState, useEffect } from "react";
import { styled, Container, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
}));


const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  paddingBottom: '60px',
  flexDirection: 'column',
  zIndex: 1,
  backgroundColor: 'transparent',
}));


const FullLayout = () => {

  const navigate = useNavigate();
  useEffect(() => {
    const checkLoginTime = () => {
        const loginTime = localStorage.getItem('loginTime'); // Hora do login
        const currentTime = Date.now(); // Hora atual em milissegundos
        
        if (loginTime) {
            const timeDifference = currentTime - parseInt(loginTime, 10); // Diferença em milissegundos
            const thirtySeconds = 3 * 60 * 60 * 1000; // 3 horas em milissegundos

            if (timeDifference > thirtySeconds) {
                // Se passou mais de 30 segundos, limpar o localStorage
                localStorage.clear();
                navigate('/auth/login'); // Redireciona para a página de login
            }
        }
    };

    checkLoginTime();

    // Adiciona o listener para limpar localStorage ao fechar a aba/janela
    const handleUnload = () => {
        localStorage.setItem('loginTime', Date.now()); // Armazena a hora atual
    };

    window.addEventListener('unload', handleUnload);

    // Remove o listener ao desmontar o componente
    return () => {
        window.removeEventListener('unload', handleUnload);
    };
}, [navigate]);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  return (
    <MainWrapper
      className='mainwrapper'
    >
      {/* ------------------------------------------- */}
      {/* Sidebar */}
      {/* ------------------------------------------- */}
      <Sidebar isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)} />
      {/* ------------------------------------------- */}
      {/* Main Wrapper */}
      {/* ------------------------------------------- */}
      <PageWrapper
        className="page-wrapper"
      >
        {/* ------------------------------------------- */}
        {/* Header */}
        {/* ------------------------------------------- */}
        <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
        {/* ------------------------------------------- */}
        {/* PageContent */}
        {/* ------------------------------------------- */}
        <Container sx={{
          paddingTop: "20px",
          maxWidth: '1200px',
        }}
        >
          {/* ------------------------------------------- */}
          {/* Page Route */}
          {/* ------------------------------------------- */}
          <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
            <Outlet />
          </Box>
          {/* ------------------------------------------- */}
          {/* End Page */}
          {/* ------------------------------------------- */}
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default FullLayout;
