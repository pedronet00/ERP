import React, { useState, useEffect } from 'react';
import useMenuItems from './MenuItems'; // Hook personalizado
import { useLocation } from 'react-router';
import { Box, List } from '@mui/material';
import NavItem from './NavItem';
import NavGroup from './NavGroup/NavGroup';

const SidebarItems = () => {
  const { pathname } = useLocation();
  const pathDirect = pathname;

  const perfil = parseInt(localStorage.getItem('perfil'), 10); // Obter perfil
  const { Menuitems, loading } = useMenuItems(perfil); // Usar hook

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {Menuitems.map((item) => {
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;
          } else {
            return (
              <NavItem item={item} key={item.id} pathDirect={pathDirect} />
            );
          }
        })}
      </List>
    </Box>
  );
};

export default SidebarItems;
