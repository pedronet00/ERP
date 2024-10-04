import React, { useState, useEffect } from 'react'; 
import { Typography, Box, Tabs, Tab, AppBar, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import Swal from 'sweetalert2';
import axios from 'axios';

const RecursosList = () => {
  const [activeTab, setActiveTab] = useState(0); // Pode ser número ou string
  const [categoriaRecursoList, setCategoriaRecursoList] = useState([]);
  const [categoriaRecurso, setCategoriaRecurso] = useState('');

  const fetchCategoriaRecurso = async () => {
    try {
      const response = await axios.get('https://apoleon.com.br/api-estagio/public/api/categoriaRecurso');
      setCategoriaRecursoList(response.data);

      if (response.data.length > 0) {
        // Define a primeira categoria como ativa, com base no id
        setActiveTab(response.data[0].id);
      }
    } catch (error) {
      console.error("Erro ao buscar categorias de recursos:", error);
    }
  };

  useEffect(() => {
    fetchCategoriaRecurso();
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue); // Aqui ele pode ser "novaCategoria" ou o ID numérico
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
        // Limpa os campos após o sucesso
        setCategoriaRecurso('');
      })
      .catch((error) => {
        if (error.response && error.response.data.error) {
          Swal.fire(
            'Erro!',
            error.response.data.error,
            'error'
          );
        } else {
          Swal.fire(
            'Erro!',
            'Houve um problema ao criar a categoria de recurso.',
            'error'
          );
        }
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
            <Tab key={categoria.id} label={categoria.categoriaRecurso} value={categoria.id} />
          ))}
          {/* Alterar o value para "novaCategoria" como string */}
          <Tab key="novaCategoria" label="Nova +" value="novaCategoria" style={{ backgroundColor: "#0d6efd", color: "white" }} />
        </Tabs>
      </AppBar>

      {/* Renderizar a tabela se a aba ativa for uma categoria existente */}
      {categoriaRecursoList.map((categoria) => (
        activeTab === categoria.id && (
          <Box key={categoria.id} mt={3}>
            <Table sx={{ marginTop: '2%' }}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      ID
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Nome
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Tipo
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Quantidade
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
                {/* Adicione o conteúdo da tabela conforme necessário */}
                <TableRow key="1">
                  <TableCell>
                    <Typography variant="body2">1</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">Exemplo Recurso</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">Tipo Exemplo</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">10</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <IconMinus />
                    <IconPlus />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        )
      ))}

      {/* Renderizar o formulário de nova categoria se a aba ativa for "novaCategoria" */}
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

