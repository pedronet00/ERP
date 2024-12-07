import React, { useState, useEffect } from 'react';
import api from '../../axiosConfig';
import Swal from 'sweetalert2';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';

const CadastrarLivro = () => {
  const { livroId } = useParams(); // Obtenha o ID do livro da URL, se estiver editando
  const [nomeLivro, setNomeLivro] = useState('');
  const [autorLivro, setAutorLivro] = useState('');
  const [urlLivro, setUrlLivro] = useState(null); // Para armazenar o arquivo
  const navigate = useNavigate();
  const idCliente = localStorage.getItem('idCliente');

  // Função para buscar os detalhes do livro se estiver editando
  useEffect(() => {
    const fetchLivro = async () => {
      if (livroId) {
        try {
          const response = await api.get(`http://localhost:8000/api/livros/${livroId}`);
          const livro = response.data.livro; // Acesse os dados do livro corretamente
          
          // Defina os estados com os dados do livro
          setNomeLivro(livro.nomeLivro);
          setAutorLivro(livro.autorLivro);
          // Não define urlLivro aqui porque é um arquivo
        } catch (error) {
          console.error("Erro ao buscar detalhes do livro:", error);
          Swal.fire(
            'Erro!',
            'Não foi possível buscar os detalhes do livro.',
            'error'
          );
        }
      }
    };

    fetchLivro();
  }, [livroId]);

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Obtém o arquivo
    if (file) {
      setUrlLivro(file); // Armazena o arquivo
      const fileNameWithoutExtension = file.name.split('.').slice(0, -1).join('.'); // Obtém o nome do arquivo sem a extensão
      setNomeLivro(fileNameWithoutExtension); // Define o nome do livro com o nome do arquivo
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const livroData = new FormData(); // Usando FormData para enviar o arquivo
    livroData.append('nomeLivro', nomeLivro);
    livroData.append('autorLivro', autorLivro);
    livroData.append('urlLivro', urlLivro); // O arquivo PDF
    livroData.append('idCliente', idCliente); // Id cliente

    try {
      if (livroId) {
        // Se livroId estiver presente, atualize o livro
        await api.put(`http://localhost:8000/api/livros/${livroId}`, livroData);
        Swal.fire(
          'Livro Atualizado!',
          'O livro foi atualizado com sucesso.',
          'success'
        );
      } else {
        // Se não houver livroId, crie um novo livro
        await api.post(`http://localhost:8000/api/livros`, livroData);
        Swal.fire(
          'Livro Criado!',
          'O livro foi criado com sucesso.',
          'success'
        );
      }

      // Limpa os campos após o sucesso
      setNomeLivro('');
      setAutorLivro('');
      setUrlLivro(null); // Reseta o arquivo
      navigate('/livros'); // Navegue de volta para a lista de livros
    } catch (error) {
      if (error.response && error.response.data.error) {
        Swal.fire(
          'Erro!',
          error.response.data.error,
          'error'
        );
      } else {
        Swal.fire(
          'Erro!',
          'Houve um problema ao criar ou atualizar o livro.',
          'error'
        );
      }
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Volta para a tela anterior
  };

  return (
    <Container maxWidth="sm">
      <div className="d-flex justify-content-between mb-3" style={{ marginTop: '2%' }}>
        <button className="btn btn-secondary" onClick={handleGoBack}><IconArrowLeft /> Voltar</button>
      </div>
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          {livroId ? 'Editar Livro' : 'Cadastrar Novo Livro'}
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Nome do Livro é preenchido automaticamente pelo nome do arquivo */}

          <TextField
            label="Autor do Livro"
            variant="outlined"
            fullWidth
            margin="normal"
            value={autorLivro}
            onChange={(e) => setAutorLivro(e.target.value)}
            required
          />

          <TextField
            label="Arquivo PDF do Livro"
            variant="outlined"
            fullWidth
            margin="normal"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange} // Captura o arquivo e define o nome do livro
            required
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            {livroId ? 'Atualizar Livro' : 'Cadastrar Livro'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CadastrarLivro;
