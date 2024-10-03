import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import Router from './routes/Router';
import { useEffect, useState } from 'react';
import { baselightTheme, basedarkTheme } from "./theme/DefaultColors";

function App() {
  const routing = useRoutes(Router);
  
  // Estado para gerenciar o tema
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : 'light';
  });

  


  // Define o tema atual com base na escolha do usuário
  const currentTheme = theme === 'dark' ? basedarkTheme : baselightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      {routing}
    </ThemeProvider>
  );
}

export default App;
