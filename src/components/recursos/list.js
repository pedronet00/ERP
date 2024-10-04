import React, { useState, useEffect } from 'react'; 
import { Typography, Box, Tabs, Tab, AppBar, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import Swal from 'sweetalert2';
import axios from 'axios';

const RecursosList = () => {
  const [activeTab, setActiveTab] = useState(''); // Inicia com uma aba vazia
  const [categoriaRecursoList, setCategoriaRecursoList] = useState([]);
  const [categoriaRecurso, setCategoriaRecurso] = useState('');
  const [recursosList, setRecursosList] = useState([]); // Lista de recursos

  // Função para buscar categorias de recursos
  const fetchCategoriaRecurso = async () => {
    try {
      const response = await axios.get('https://apoleon.com.br/api-estagio/public/api/categoriaRecurso');
      setCategoriaRecursoList(response.data);

      if (response.data.length > 0) {
        setActiveTab(response.data[0].categoriaRecurso); // Define a primeira categoria como ativa
      }
    } catch (error) {
      console.error("Erro ao buscar categorias de recursos:", error);
    }
  };

  // Função para buscar recursos
  const fetchRecursos = async () => {
    try {
      const response = await axios.get('https://apoleon.com.br/api-estagio/public/api/recurso');
      setRecursosList(response.data); // Armazena os recursos obtidos
    } catch (error) {
      console.error("Erro ao buscar recursos:", error);
    }
  };

  useEffect(() => {
    fetchCategoriaRecurso();
    fetchRecursos();
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleNewCategory = (e) => {
    e.preventDefault();

    const novaCategoriaRecursoObject = {
      categoriaRecurso,
    };

    axios.post('https://apoleon.com.br/api-estagio/public/api/categoriaRecurso', novaCategoriaRecursoObject)
      .then(() => {
        Swal.fire(
          'Categoria criada!',
          'A categoria foi criada com sucesso.',
          'success'
        );
        setCategoriaRecurso(''); // Limpa os campos
        fetchCategoriaRecurso(); // Atualiza a lista de categorias
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.error || 'Houve um problema ao criar a categoria de recurso.';
        Swal.fire('Erro!', errorMessage, 'error');
      });
  };

  return (
    <div style={{ maxWidth: '100%', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Recursos da Primeira Igreja Batista de Presidente Prudente
      </Typography>

      <AppBar position="static" style={{ marginTop: '2%' }} color="default">
        <Tabs value={activeTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary" variant="fullWidth">
          {categoriaRecursoList.map((categoria) => (
            <Tab key={categoria.categoriaRecurso} label={categoria.categoriaRecurso} value={categoria.categoriaRecurso} />
          ))}
            <Tab key="novaCategoria" label="Nova +" value="novaCategoria" style={{ backgroundColor: "#0d6efd", color: "white" }} />

        </Tabs>
      </AppBar>

      {/* Renderiza a tabela se a aba ativa for uma categoria existente */}
      {categoriaRecursoList.map((categoria) => (
        activeTab === categoria.categoriaRecurso && (
          <Box key={categoria.categoriaRecurso} mt={3}>
            <Table sx={{ marginTop: '2%' }}>
              <TableHead>
                <TableRow>
                  <TableCell><Typography variant="subtitle2" fontWeight={600}>Nome</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2" fontWeight={600}>Tipo</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2" fontWeight={600}>Quantidade</Typography></TableCell>
                  <TableCell align="right"><Typography variant="subtitle2" fontWeight={600}>Ações</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Filtra e exibe os recursos que pertencem à categoria da aba ativa */}
                {recursosList
                  .filter((recurso) => recurso.categoriaRecurso === categoria.id) // Filtra pelo nome da categoria
                  .map((recurso) => (
                    <TableRow key={recurso.id}>
                      <TableCell><Typography variant="body2">{recurso.nomeRecurso}</Typography></TableCell>
                      <TableCell><Typography variant="body2">{recurso.tipo.tipoRecurso}</Typography></TableCell>
                      <TableCell><Typography variant="body2">{recurso.quantidadeRecurso}</Typography></TableCell>
                      <TableCell align="right">
                        <IconMinus />
                        <IconPlus />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Box>
        )
      ))}

      {/* Renderiza o formulário de nova categoria se a aba ativa for "novaCategoria" */}
      {activeTab === "novaCategoria" && (
        <div className="container" style={{ marginTop: '2%' }}>
          <h4>Criar nova Categoria de Recurso</h4>
          <form onSubmit={handleNewCategory}>
            <div className="mb-3">
              <label htmlFor="categoriaRecurso" className="form-label">Nome da Categoria</label>
              <input
                type="text"
                className="form-control"
                id="categoriaRecurso"
                value={categoriaRecurso}
                onChange={(e) => setCategoriaRecurso(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Criar Categoria</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default RecursosList;
