import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconX, IconEdit, IconPlus, IconClipboard } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import {
    Typography, Box,
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

  // Função para buscar departamentos da API
  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://apoleon.com.br/api-estagio/public/api/post');
      setPosts(response.data);
    } catch (error) {
      console.error("Erro ao buscar departamentos:", error);
    }
  };

  // Usar o useEffect para chamar a API quando o componente for montado
  useEffect(() => {
    fetchPosts();
  }, []);

  const handleNewUser = () => {
    navigate('/departament/create');
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Lista de Posts</h2>
      </div>

      <div className="d-flex justify-content-between">
        <button className="btn btn-success" onClick={handleNewUser}><IconClipboard/> Gerar Relatório</button>
        <button className="btn btn-primary" onClick={handleNewUser}><IconPlus/>Novo Post</button>
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
          <TableCell align="right">
            <IconX />
            <IconEdit />
          </TableCell>
        </TableRow>
      ))
    ) : (
      <TableRow>
        <TableCell colSpan={7} align="center">
          <Typography variant="body2">Nenhum departamento encontrado</Typography>
        </TableCell>
      </TableRow>
    )}
  </TableBody>
</Table>

    </div>
  );
};

export default PostList;
