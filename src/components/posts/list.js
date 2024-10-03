import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconX, IconEdit, IconPlus, IconClipboard } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate


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

      <table className="table table-light table-hover" style={{marginTop: '2%'}}>
        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Data de Criação</th>
            <th>Data de Publicação</th>
            <th>Tipo do Post</th>
            <th>Status do Post</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {posts.length > 0 ? (
            posts.map((post) => (
              <tr key={post.id}>
                <td>{post.tituloPost}</td>
                <td>{post.autor.name}</td>
                <td>{post.created_at}</td>
                <td>{post.dataPost}</td>
                <td>{post.tipo.tipoPost}</td>
                <td>{post.statusPost === 1 ? 'Ativo' : 'Inativo'}</td>
                <td><IconX/><IconEdit/></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Nenhum departamento encontrado</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PostList;
