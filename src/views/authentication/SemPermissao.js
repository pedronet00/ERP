import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ErrorImg from 'src/assets/images/backgrounds/404-error-idea.gif';

const Error = () => (
  <Box
    display="flex"
    flexDirection="column"
    height="70vh"
    textAlign="center"
    justifyContent="center"
  >
    <Container maxWidth="md">
      <img src={ErrorImg} alt="404" style={{ width: '100%', maxWidth: '500px' }} />
      <Typography align="center" variant="h1" mb={4}>
        Ops!
      </Typography>
      <Typography align="center" variant="h4" mb={4}>
        Você não tem permissão para acessar essa página. Se você acha que isso é um erro, considere falar com um administrador da sua igreja.
      </Typography>
      <Button color="primary" variant="contained" component={Link} to="/dashboard" disableElevation>
        Voltar
      </Button>
    </Container>
  </Box>
);

export default Error;
