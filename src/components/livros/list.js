import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Container, Typography, Box, Card, CardContent, Button } from '@mui/material';

const ListaLivros = () => {
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);
  
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

  return (
    <Container maxWidth="lg">
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Acervo Virtual de {razaoSocial}
        </Typography>
        {loading ? (
          <Typography variant="body1">Carregando...</Typography>
        ) : (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {livros.length > 0 ? (
              livros.map((livro) => (
                <Card key={livro.id} sx={{ width: 300, height: 450,  }}>
                  <CardContent>
                    <Typography variant="h6">{livro.nomeLivro}</Typography>
                    <Typography variant="subtitle1">{livro.autorLivro}</Typography>

                    {/* Usando <object> para exibir a capa do PDF */}
                    <object
                      data={`http://localhost:8000/storage/livros/${livro.urlLivro}`} // URL do PDF
                      type="application/pdf"
                      width="100%"
                      height="300px"
                      style={{ marginTop: '16px',  }}
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
