import React, { useState, useEffect } from 'react'; 
import { Typography, Box, Tabs, Tab, AppBar, Table, TableBody, TableCell, TableHead, TableRow, IconButton } from '@mui/material';
import { IconMinus, IconPlus, IconTrash, IconClipboard } from '@tabler/icons-react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RecursosList = () => {
  const [activeTab, setActiveTab] = useState('');
  const [categoriaRecursoList, setCategoriaRecursoList] = useState([]);
  const [categoriaRecurso, setCategoriaRecurso] = useState('');
  const [recursosList, setRecursosList] = useState([]);
  const navigate = useNavigate();
  const idCliente = localStorage.getItem('idCliente'); 
  const nivelUsuario = localStorage.getItem('nivelUsuario');
  const fetchCategoriaRecurso = async () => {
    try {
        const apiUrl = `http://localhost:8000/api/categoriaRecurso?idCliente=${idCliente}`; // Monta a URL com o idCliente como parâmetro
        const response = await axios.get(apiUrl);
      setCategoriaRecursoList(response.data);
    } catch (error) {
      console.error("Erro ao buscar categorias de recursos:", error);
    }
  };

  const fetchRecursos = async () => {
    try {
        const apiUrl = `http://localhost:8000/api/recurso?idCliente=${idCliente}`; // Monta a URL com o idCliente como parâmetro
        const response = await axios.get(apiUrl);
      setRecursosList(response.data);
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
    const novaCategoriaRecursoObject = { categoriaRecurso, idCliente };

    axios.post('http://localhost:8000/api/categoriaRecurso', novaCategoriaRecursoObject)
      .then(() => {
        Swal.fire('Categoria criada!', 'A categoria foi criada com sucesso.', 'success');
        setCategoriaRecurso('');
        fetchCategoriaRecurso();
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.error || 'Houve um problema ao criar a categoria de recurso.';
        Swal.fire('Erro!', errorMessage, 'error');
      });
  };

  const handleNewUser = () => {
    navigate('/recursos/create');
  };

  const handleReport = () => {
    navigate('/relatorio/recursos');
  };

  // Função para incrementar a quantidade do recurso
  const handleIncrease = async (recurso) => {
    try {
      await axios.patch(`http://localhost:8000/api/recurso/${recurso.id}/aumentarQuantidade`);
      fetchRecursos(); // Recarregar a lista de recursos
    } catch (error) {
      Swal.fire('Erro!', 'Houve um problema ao aumentar a quantidade do recurso.', 'error');
    }
  };

  // Função para decrementar a quantidade do recurso
  const handleDecrease = async (recurso) => {
    if (recurso.quantidadeRecurso > 0) {
      try {
        await axios.patch(`http://localhost:8000/api/recurso/${recurso.id}/diminuirQuantidade`);
        fetchRecursos(); // Recarregar a lista de recursos
      } catch (error) {
        Swal.fire('Erro!', 'Houve um problema ao diminuir a quantidade do recurso.', 'error');
      }
    }
  };

  return (
    <div style={{ maxWidth: '100%', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Recursos da Primeira Igreja Batista de Presidente Prudente
      </Typography>

      {nivelUsuario > 1 && (
      <div className="d-flex justify-content-between mb-3" style={{ marginTop: '2%' }}>
        <button className="btn btn-success" onClick={handleReport}><IconClipboard /> Gerar Relatório</button>
        <button className="btn btn-primary" onClick={handleNewUser}><IconPlus /> Novo recurso</button>
      </div>
      )}

      <AppBar position="static" style={{ marginTop: '2%' }} color="default">
        <Tabs value={activeTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary" variant="fullWidth">
          {categoriaRecursoList.map((categoria) => (
            <Tab key={categoria.categoriaRecurso} label={categoria.categoriaRecurso} value={categoria.categoriaRecurso} />
          ))}
          <Tab key="novaCategoria" label="Nova +" value="novaCategoria" style={{ backgroundColor: "#0d6efd", color: "white" }} />
        </Tabs>
      </AppBar>

      {categoriaRecursoList.map((categoria) => (
        activeTab === categoria.categoriaRecurso && (
          <Box key={categoria.categoriaRecurso} mt={3}>
            <Table sx={{ marginTop: '2%' }}>
              <TableHead>
                <TableRow>
                  <TableCell><Typography variant="subtitle2" fontWeight={600}>Nome</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2" fontWeight={600}>Tipo</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2" fontWeight={600}>Quantidade</Typography></TableCell>
                  {nivelUsuario > 1 && (
                  <TableCell align="right"><Typography variant="subtitle2" fontWeight={600}>Ações</Typography></TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {recursosList
                  .filter((recurso) => recurso.categoriaRecurso === categoria.id)
                  .map((recurso) => (
                    <TableRow key={recurso.id}>
                      <TableCell><Typography variant="body2">{recurso.nomeRecurso}</Typography></TableCell>
                      <TableCell><Typography variant="body2">{recurso.tipo.tipoRecurso}</Typography></TableCell>
                      <TableCell><Typography variant="body2">{recurso.quantidadeRecurso}</Typography></TableCell>
                      {nivelUsuario > 1 && (
                      <TableCell align="right">
                        <IconButton onClick={() => handleDecrease(recurso)}><IconMinus /></IconButton>
                        <IconButton onClick={() => handleIncrease(recurso)}><IconPlus /></IconButton>
                        <IconButton><IconTrash style={{ color: "#ff4c4c" }} /></IconButton>
                      </TableCell>
                      )}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Box>
        )
      ))}

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
