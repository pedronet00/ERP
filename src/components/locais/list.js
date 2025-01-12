import React, { useState, useEffect } from 'react';
import api from '../../axiosConfig';
import { IconDotsVertical, IconPlus } from '@tabler/icons-react'; // Icon for the menu
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';

const ListaLocais = () => {
  const [locations, setLocations] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigate = useNavigate();

  // Function to fetch locations from the API
  const fetchLocations = async () => {
    try {
      const idCliente = localStorage.getItem('idCliente');
      const apiUrl = `http://localhost:8000/api/locais?idCliente=${idCliente}`;
      const response = await api.get(apiUrl);
      setLocations(response.data);
    } catch (error) {
      console.error('Erro ao buscar locais:', error);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  // Function to deactivate location
  const handleDeactivateLocation = async (locationId) => {
    try {
      await api.patch(`http://localhost:8000/api/locais/${locationId}/desativar`);
      fetchLocations(); // Refresh the list after deactivating
      handleMenuClose();
    } catch (error) {
      console.error('Erro ao desativar local:', error);
    }
  };

  // Function to activate location
  const handleActivateLocation = async (locationId) => {
    try {
      await api.patch(`http://localhost:8000/api/locais/${locationId}/ativar`);
      fetchLocations(); // Refresh the list after activating
      handleMenuClose();
    } catch (error) {
      console.error('Erro ao ativar local:', error);
    }
  };

  const handleEditLocation = async (locationId) => {
    window.location.href= `/dashboard/locais/create?id=${locationId}`
  }

  const handleMenuOpen = (event, location) => {
    setAnchorEl(event.currentTarget);
    setSelectedLocation(location);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedLocation(null);
  };

  const handleNewLocation = () => {
    navigate('/dashboard/locais/create');
  };

  return (
    <div className="container mt-4">
      <h2>Lista de Locais</h2>
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-success" onClick={handleNewLocation}><IconPlus /> Novo Local</button>
      </div>
      
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
                  <IconButton onClick={(e) => handleMenuOpen(e, location)}>
                    <IconDotsVertical />
                  </IconButton>
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

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {selectedLocation && (
          selectedLocation.statusLocal === 1 ? (
            <MenuItem onClick={() => handleDeactivateLocation(selectedLocation.id)}>
              Desativar Local
            </MenuItem>
          ) : (
            <MenuItem onClick={() => handleActivateLocation(selectedLocation.id)}>
              Ativar Local
            </MenuItem>
          )
        )}
          <MenuItem onClick={() => handleEditLocation(selectedLocation.id)}>
              Editar Local
          </MenuItem>
      </Menu>
    </div>
  );
};

export default ListaLocais;
