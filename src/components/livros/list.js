import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Container, Typography, Box, Card, CardContent, Button } from '@mui/material';
import { IconMinus, IconPlus, IconTrash, IconClipboard } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const ListaLivros = () => {
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const idCliente = localStorage.getItem('idCliente');
  const razaoSocial = localStorage.getItem('razaoSocial');

  useEffect(() => {
    const fetchLivros = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/livros?idCliente=${idCliente}`);
        setLivros(response.data);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
        Swal.fire(
          'Erro!',
          'Não foi possível buscar os livros.',
          'error'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLivros();
  }, []);

  const handleDownload = async (livroId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/livros/${livroId}/download`, {
        responseType: 'blob', // Importante para downloads
      });
      
      // Criar um link temporário para o download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `livro_${livroId}.pdf`); // Nome do arquivo
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Erro ao baixar o PDF:", error);
      Swal.fire(
        'Erro!',
        'Não foi possível baixar o PDF.',
        'error'
      );
    }
  };

  const handleNewUser = () => {
    navigate('/recursos/create');
  };

  const handleReport = () => {
    navigate('/relatorio/recursos');
  };

  return (
    <Container maxWidth="lg">
      {/* Banner */}
      <Box 
        sx={{
          backgroundImage: 'url("https://i.pinimg.com/originals/b8/00/87/b800878ec9ca72ed7f4ebe64e4aa1832.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '200px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          marginBottom: 4
        }}
      >
        <Typography variant="h3" component="h1" textAlign="center">
          Acervo Virtual da Primeira Igreja Batista de Presidente Prudente
        </Typography>
      </Box>
      
      <Box sx={{ marginTop: 4 }}>
        <div className="d-flex justify-content-between mb-3" style={{ marginTop: '2%' }}>
            <button className="btn btn-success" onClick={handleReport}><IconClipboard /> Gerar Relatório</button>
            <button className="btn btn-primary" onClick={handleNewUser}><IconPlus /> Novo livro</button>
        </div>
        {loading ? (
          <Typography variant="body1">Carregando...</Typography>
        ) : (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {livros.length > 0 ? (
              livros.map((livro) => (
                <Card key={livro.id} sx={{ width: 300, height: 450 }}>
                  <CardContent>
                    <Typography variant="h6">{livro.nomeLivro}</Typography>
                    <Typography variant="subtitle1">{livro.autorLivro}</Typography>

                    {/* Usando <object> para exibir a capa do PDF */}
                    <object
                      data={`http://localhost:8000/storage/livros/${livro.urlLivro}`} // URL do PDF
                      type="application/pdf"
                      width="100%"
                      height="300px"
                      style={{ marginTop: '16px' }}
                    >
                      <p>Seu navegador não suporta PDFs. Baixe o PDF <a href={`http://localhost:8000/storage/livros/${livro.urlLivro}`}>aqui</a>.</p>
                    </object>
                    
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleDownload(livro.id)} // Chama a função de download
                    >
                      Baixar PDF
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography variant="body1">Nenhum livro encontrado.</Typography>
            )}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ListaLivros;
