import React, { useState, useEffect } from 'react';
import api from '../../axiosConfig';
import { IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';

const ListaTiposPosts = () => {
  const [tiposPosts, setTiposPosts] = useState([]);
  const navigate = useNavigate();

  // Função para buscar tipos de posts da API
  const fetchTiposPosts = async () => {
    try {
      const response = await api.get('http://localhost:8000/api/tipoPost/');
      setTiposPosts(response.data); // Guardar os tipos de posts obtidos na state
    } catch (error) {
      console.error('Erro ao buscar tipos de posts:', error);
    }
  };

  // Usar o useEffect para chamar a API quando o componente for montado
  useEffect(() => {
    fetchTiposPosts();
  }, []);

  const handleNewTipoPost = () => {
    navigate('/dashboard/tipoPost/create'); // Navega para a tela de criação de tipo de post
  };

  const handleEditTipoPost = (tipoPostId) => {
    navigate(`/dashboard/tipoPost/create/${tipoPostId}`); // Navega para a tela de edição do tipo de post
  };

  return (
    <div className="container mt-4">
      <h2>Lista de Tipos de Posts</h2>
      <div className="d-flex justify-content-between mb-3">
        <Button
          variant="contained"
          color="primary"
          onClick={handleNewTipoPost}
          startIcon={<IconPlus />}
        >
          Novo Tipo de Post
        </Button>
      </div>
      {/* Tabela de Tipos de Posts */}
      <Table sx={{ marginTop: '2%' }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Nome do Tipo de Post
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Data de Criação
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Ações
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tiposPosts.length > 0 ? (
            tiposPosts.map((tipoPost) => (
              <TableRow key={tipoPost.id}>
                <TableCell align="center">
                  <Typography variant="body2">{tipoPost.TipoPost}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">
                    {new Date(tipoPost.created_at).toLocaleDateString('pt-BR')}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Box display="flex" justifyContent="center" gap={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditTipoPost(tipoPost.id)}
                      size="small"
                    >
                      Editar
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center">
                <Typography variant="body2">Nenhum tipo de post encontrado</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListaTiposPosts;
