import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, MenuItem, Typography } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import Swal from 'sweetalert2';
import api from '../../axiosConfig';
import { useParams, useNavigate } from 'react-router-dom';

const CriarPost = () => {
  const [tituloPost, setTituloPost] = useState('');
  const [subtituloPost, setSubtituloPost] = useState('');
  const [dataPost, setDataPost] = useState('');
  const [textoPost, setTextoPost] = useState('');
  const [imgPost, setImgPost] = useState('');
  const [tipoPost, setTipoPost] = useState('');
  const [tiposPost, setTiposPost] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const idCliente = localStorage.getItem('idCliente');
  const idUsuario = localStorage.getItem('idUsuario');

  // Buscar tipos de post
  const fetchTiposPost = async () => {
    try {
      const response = await api.get('http://localhost:8000/api/tipoPost');
      setTiposPost(response.data);
    } catch (error) {
      console.error('Erro ao buscar tipos de post:', error);
    }
  };

  // Buscar dados do post para edição
  const fetchPostData = async () => {
    try {
      const response = await api.get(`http://localhost:8000/api/post/${id}`);
      const postData = response.data;
      setTituloPost(postData.tituloPost);
      setSubtituloPost(postData.subtituloPost);
      setDataPost(postData.dataPost);
      setTextoPost(postData.textoPost);
      setImgPost(postData.imgPost);
      setTipoPost(postData.tipoPost);
    } catch (error) {
      console.error('Erro ao carregar dados do post:', error);
    }
  };

  useEffect(() => {
    fetchTiposPost();
    if (id) fetchPostData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      tituloPost,
      subtituloPost,
      autorPost: idUsuario,
      dataPost,
      textoPost,
      imgPost,
      tipoPost,
      idCliente
    };

    try {
      if (id) {
        // Envia a requisição PUT para atualização
        await api.put(`/post/${id}`, data);
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'Post atualizado com sucesso!',
        });
        navigate('/dashboard/posts'); // Navegue de volta para a lista de departamentos
      } else {
        // Envia a requisição POST para criação
        await api.post('/post', data);
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'Post criado com sucesso!',
        });
        navigate('/dashboard/posts'); // Navegue de volta para a lista de departamentos

      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Houve um problema ao salvar o post. Por favor, tente novamente.',
      });
      console.error('Erro ao salvar o post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">{id ? 'Editar Post' : 'Criar Novo Post'}</Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Título"
            value={tituloPost}
            onChange={(e) => setTituloPost(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Subtítulo"
            value={subtituloPost}
            onChange={(e) => setSubtituloPost(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Data do Post"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={dataPost}
            onChange={(e) => setDataPost(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            select
            fullWidth
            label="Tipo do Post"
            value={tipoPost}
            onChange={(e) => setTipoPost(e.target.value)}
          >
            {tiposPost.map((tipo) => (
              <MenuItem key={tipo.id} value={tipo.id}>
                {tipo.TipoPost}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">Texto do Post</Typography>
          <Editor
            apiKey="23s5fxru271x3f20z5xabb87ftvrvnbu1n0cm0jd3qhe4tri"
            value={textoPost}
            onEditorChange={(content) => setTextoPost(content)}
            init={{
              height: 400,
              menubar: false,
              plugins: 'link image code',
              toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright | code',
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Imagem do Post"
            type="text"
            value={imgPost}
            onChange={(e) => setImgPost(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            {id ? 'Atualizar Post' : 'Criar Post'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CriarPost;
