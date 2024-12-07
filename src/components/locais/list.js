import React, { useState, useEffect } from 'react';
import api from '../../axiosConfig';
import { IconCheck, IconX, IconClipboard, IconPlus } from '@tabler/icons-react'; // Ícones
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';

const ListaLocais = () => {
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();

  // Função para buscar locais da API
  const fetchLocations = async () => {
    try {
      const idCliente = localStorage.getItem('idCliente'); // Pegando idCliente do localStorage
      const apiUrl = `http://localhost:8000/api/locais?idCliente=${idCliente}`; // URL com idCliente como parâmetro
      const response = await api.get(apiUrl);
      setLocations(response.data); // Guardar os locais obtidos na state
    } catch (error) {
      console.error("Erro ao buscar locais:", error);
    }
  };

  // Usar o useEffect para chamar a API quando o componente for montado
  useEffect(() => {
    fetchLocations();
  }, []);

  // Função para ativar local
  const handleActivateLocation = async (locationId) => {
    try {
      await api.patch(`http://localhost:8000/api/local/${locationId}/ativar`);
      fetchLocations(); // Atualizar a lista de locais após ativar
    } catch (error) {
      console.error("Erro ao ativar local:", error);
    }
  };

  // Função para desativar local
  const handleDeactivateLocation = async (locationId) => {
    try {
      await api.patch(`http://localhost:8000/api/local/${locationId}/desativar`);
      fetchLocations(); // Atualizar a lista de locais após desativar
    } catch (error) {
      console.error("Erro ao desativar local:", error);
    }
  };

  const handleNewUser = () => {
    navigate('/dashboard/locais/create'); // Volta para a tela anterior
  };

  return (
    <div className="container mt-4">
      <h2>Lista de Locais</h2>
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-success" onClick={handleNewUser}><IconClipboard/> Gerar Relatório</button>
        <button className="btn btn-primary" onClick={handleNewUser}><IconPlus/>Novo Local</button>
      </div>
      {/* Tabela de Locais */}
      <Table sx={{ marginTop: '2%' }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Nome do Local
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Status
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Ações
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {locations.length > 0 ? (
            locations.map((location) => (
              <TableRow key={location.id}>
                <TableCell align="center">
                  <Typography variant="body2">{location.nomeLocal}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">
                    {location.statusLocal === 1 ? 'Ativado' : 'Desativado'}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Box display="flex" justifyContent="center" gap={2}>
                    {location.statusLocal === 1 ? (
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeactivateLocation(location.id)}
                        startIcon={<IconX />}
                        size="small"
                      >
                        Desativar
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleActivateLocation(location.id)}
                        startIcon={<IconCheck />}
                        size="small"
                      >
                        Ativar
                      </Button>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center">
                <Typography variant="body2">Nenhum local encontrado</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListaLocais;
