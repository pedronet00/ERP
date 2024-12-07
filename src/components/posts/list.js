import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { IconX, IconEdit, IconCheck, IconPlus, IconClipboard } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import {
  Typography, Box, Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip
} from '@mui/material';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate(); // Inicializar o navegador
  const idCliente = localStorage.getItem('idCliente');

  // Função para buscar posts da API
  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/post?idCliente=${idCliente}`);
      setPosts(response.data);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
    }
  };

  // Função para desativar o post
  const handleDeactivatePost = async (postId) => {
    try {
      await axios.patch(`http://localhost:8000/api/post/${postId}/desativar`);
      fetchPosts(); // Recarregar a lista de posts após a atualização
      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Post desativado com sucesso!',
      });
    } catch (error) {
      console.error("Erro ao desativar o post:", error);
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Erro ao desativar post!',
      });
    }
  };

  // Função para ativar o post
  const handleActivatePost = async (postId) => {
    try {
      await axios.patch(`http://localhost:8000/api/post/${postId}/ativar`);
      fetchPosts(); // Recarregar a lista de posts após a atualização
      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Post ativado com sucesso!',
      });
    } catch (error) {
      console.error("Erro ao ativar o post:", error);
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Erro ao ativar post!',
      });
    }
  };

  // Função para ir para a página de criação/edição de post
  const handleNewUser = () => {
    navigate('/dashboard/posts/create');
  };

  // Usar o useEffect para chamar a API quando o componente for montado
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Lista de Posts</h2>
      </div>

      <div className="d-flex justify-content-between">
        <button className="btn btn-success" onClick={handleNewUser}><IconPlus/>Novo Post</button>
        {/* <button className="btn btn-primary" onClick={handleNewUser}><IconClipboard/> Gerar Relatório</button> */}
      </div>

      <Table sx={{ marginTop: '2%' }}>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Título
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Autor
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Data de Criação
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Data de Publicação
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Tipo do Post
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Status do Post
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
          {posts.length > 0 ? (
            posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>
                  <Typography variant="body2">{post.tituloPost}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{post.autor.name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{post.created_at}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{post.dataPost}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{post.tipo.tipoPost}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {post.statusPost === 1 ? 'Ativo' : 'Inativo'}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Box display="flex" flexDirection="column" gap={1}>
                    {post.statusPost === 1 ? (
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeactivatePost(post.id)}
                        startIcon={<IconX />}
                        size="small"
                      >
                        Desativar
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleActivatePost(post.id)}
                        startIcon={<IconCheck />}
                        size="small"
                      >
                        Ativar
                      </Button>
                    )}

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate(`/dashboard/posts/create/${post.id}`)}
                      startIcon={<IconEdit />}
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
              <TableCell colSpan={7} align="center">
                <Typography variant="body2">Nenhum post encontrado</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PostList;
