import React, { useState, useEffect } from 'react'; 
import { Typography, Box, Tabs, Tab, AppBar, Table, TableBody, TableCell, TableHead, TableRow, IconButton } from '@mui/material';
import { IconMinus, IconPlus, IconTrash, IconClipboard } from '@tabler/icons-react';
import Swal from 'sweetalert2';
import api from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';

const RecursosList = () => {
  const [activeTab, setActiveTab] = useState('');
  const [categoriaRecursoList, setCategoriaRecursoList] = useState([]);
  const [categoriaRecurso, setCategoriaRecurso] = useState('');
  const [recursosList, setRecursosList] = useState([]);
  const navigate = useNavigate();
  const idCliente = localStorage.getItem('idCliente'); 
  const nivelUsuario = localStorage.getItem('nivelUsuario');

  // Função para buscar as categorias de recursos
  const fetchCategoriaRecurso = async () => {
    try {
      const apiUrl = `http://localhost:8000/api/categoriaRecurso?idCliente=${idCliente}`;
      const response = await api.get(apiUrl);
      setCategoriaRecursoList(response.data);
    } catch (error) {
      console.error("Erro ao buscar categorias de recursos:", error);
    }
  };

  // Função para buscar os recursos
  const fetchRecursos = async () => {
    try {
      const apiUrl = `http://localhost:8000/api/recurso?idCliente=${idCliente}`;
      const response = await api.get(apiUrl);
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

    api.post('http://localhost:8000/api/categoriaRecurso', novaCategoriaRecursoObject)
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
    navigate('/dashboard/recursos/create');
  };

  const handleReport = () => {
    Swal.fire({
      title: 'Gerar Relatório',
      html: `
        <p>Insira a data inicial e final para a geração do relatório.</p>
        <p style="font-size: 12px;">*<b>Atenção:</b> não coloque períodos muito longos, pois isso acarretará na lentidão do processamento do relatório.</p>
        <input type="date" id="dataInicial" class="swal2-input" placeholder="Data Inicial">
        <input type="date" id="dataFinal" class="swal2-input" placeholder="Data Final">
      `,
      showCancelButton: true,
      confirmButtonText: 'Gerar Relatório',
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      preConfirm: () => {
        const dataInicial = document.getElementById('dataInicial').value;
        const dataFinal = document.getElementById('dataFinal').value;
        if (!dataInicial || !dataFinal) {
          Swal.showValidationMessage('Por favor, insira ambas as datas!');
          return false;
        }
        return { dataInicial, dataFinal };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const { dataInicial, dataFinal } = result.value;
        navigate(`/relatorio/recursos?dataInicial=${dataInicial}&dataFinal=${dataFinal}`);
      }
    });
  };

  const handleIncrease = async (recurso) => {
    try {
      await api.patch(`http://localhost:8000/api/recurso/${recurso.id}/aumentarQuantidade`);
      fetchRecursos();
    } catch (error) {
      Swal.fire('Erro!', 'Houve um problema ao aumentar a quantidade do recurso.', 'error');
    }
  };

  const handleDecrease = async (recurso) => {
    if (recurso.quantidadeRecurso > 0) {
      try {
        await api.patch(`http://localhost:8000/api/recurso/${recurso.id}/diminuirQuantidade`);
        fetchRecursos();
      } catch (error) {
        Swal.fire('Erro!', 'Houve um problema ao diminuir a quantidade do recurso.', 'error');
      }
    }
  };

  const handleDelete = (recursoId) => {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Deseja realmente excluir este recurso?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        api.delete(`http://localhost:8000/api/recurso/${recursoId}`)
          .then(() => {
            Swal.fire('Excluído!', 'O recurso foi excluído com sucesso.', 'success');
            fetchRecursos();
          })
          .catch((error) => {
            Swal.fire('Erro!', 'Houve um problema ao excluir o recurso.', 'error');
          });
      }
    });
  };

  return (
    <div style={{ maxWidth: '100%', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Recursos da Primeira Igreja Batista de Presidente Prudente
      </Typography>

      <div className="d-flex justify-content-between mb-3" style={{ marginTop: '2%' }}>
        <button className="btn btn-success" onClick={handleNewUser}><IconPlus /> Novo recurso</button>
        <button className="btn btn-primary" onClick={handleReport}><IconClipboard /> Gerar Relatório</button>
      </div>
      
      <Box sx={{ overflowX: 'auto' }}>
        <AppBar position="static" style={{ marginTop: '2%' }} color="default">
          <Tabs value={activeTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary" variant="scrollable">
            {categoriaRecursoList.map((categoria) => (
              <Tab key={categoria.categoriaRecurso} label={categoria.categoriaRecurso} value={categoria.categoriaRecurso} />
            ))}
            <Tab key="novaCategoria" label="Categoria +" value="novaCategoria" style={{ backgroundColor: "#0d6efd", color: "white" }} />
          </Tabs>
        </AppBar>
      </Box>

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
                {recursosList
                  .filter((recurso) => recurso.categoriaRecurso === categoria.id)
                  .map((recurso) => (
                    <TableRow key={recurso.id}>
                      <TableCell><Typography variant="body2">{recurso.nomeRecurso}</Typography></TableCell>
                      <TableCell><Typography variant="body2">{recurso.tipo.tipoRecurso}</Typography></TableCell>
                      <TableCell><Typography variant="body2">{recurso.quantidadeRecurso}</Typography></TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => handleDecrease(recurso)}><IconMinus /></IconButton>
                        <IconButton onClick={() => handleIncrease(recurso)}><IconPlus /></IconButton>
                        <IconButton onClick={() => handleDelete(recurso.id)}><IconTrash style={{ color: "#ff4c4c" }} /></IconButton>
                      </TableCell>
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
