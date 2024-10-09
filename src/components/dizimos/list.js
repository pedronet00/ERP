import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconX, IconEdit, IconPlus, IconClipboard, IconCheck } from '@tabler/icons-react'; // IconCheck adicionado
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  Typography, Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';

const DizimoList = () => {
  const [dizimos, setDizimos] = useState([]);
  const [filteredDizimos, setFilteredDizimos] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const navigate = useNavigate();
  
  const idCliente = localStorage.getItem('idCliente'); 

  // Função para buscar dízimos da API
  const fetchDizimos = async () => {
    try {
        const apiUrl = `http://localhost:8000/api/dizimos?idCliente=${idCliente}`; // Monta a URL com o idCliente como parâmetro
        const response = await axios.get(apiUrl);
      setDizimos(response.data);
      setFilteredDizimos(response.data); // Inicialmente, mostrar todos os dízimos
    } catch (error) {
      console.error("Erro ao buscar dízimos:", error);
    }
  };

  // Função para ativar dízimo
  const handleActivateDizimo = async (dizimoId) => {
    const result = await Swal.fire({
      title: "Tem certeza?",
      text: "Deseja ativar este dízimo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, ativar."
    });
  
    if (result.isConfirmed) {
      try {
        await axios.patch(`http://localhost:8000/api/dizimo/${dizimoId}/ativar`);
        // Atualizar a lista de dízimos após a ativação
        fetchDizimos();
        Swal.fire({
          title: "Ativado!",
          text: "O dízimo foi ativado.",
          icon: "success"
        });
      } catch (error) {
        console.error("Erro ao ativar dízimo:", error);
        Swal.fire({
          title: "Erro!",
          text: "Ocorreu um erro ao ativar o dízimo.",
          icon: "error"
        });
      }
    }
  };

  const handleDeactivateDizimo = async (dizimoId) => {
    const result = await Swal.fire({
      title: "Tem certeza?",
      text: "Deseja desativar este dízimo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, desativar."
    });
  
    if (result.isConfirmed) {
      try {
        await axios.patch(`http://localhost:8000/api/dizimo/${dizimoId}/desativar`);
        // Atualizar a lista de dízimos após a desativação
        fetchDizimos();
        Swal.fire({
          title: "Desativado!",
          text: "O dízimo foi desativado.",
          icon: "success"
        });
      } catch (error) {
        console.error("Erro ao desativar dízimo:", error);
        Swal.fire({
          title: "Erro!",
          text: "Ocorreu um erro ao desativar o dízimo.",
          icon: "error"
        });
      }
    }
  };

  // Usar o useEffect para chamar a API quando o componente for montado
  useEffect(() => {
    fetchDizimos();
  }, []);

  


  const handleNewDizimo = () => {
    navigate('/dizimos/create');
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Lista de Dízimos</h2>
      </div>

      

      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-success" onClick={handleNewDizimo}><IconClipboard/> Gerar relatório</button>
        <button className="btn btn-primary" onClick={handleNewDizimo}><IconPlus/> Novo registro</button>
      </div>

      {/* Tabela de Dízimos */}
      <Table sx={{ marginTop: '2%' }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                ID
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Data do Culto
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Turno do Culto
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Valor arrecadado
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
  {dizimos.length > 0 ? (
    dizimos.map((dizimo) => (
      <TableRow key={dizimo.id}>
        <TableCell align="center">
          <Typography variant="body2">{dizimo.id}</Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="body2">{dizimo.dataCulto}</Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="body2">{dizimo.turnoCulto === 0 ? 'Manhã' : 'Noite'}</Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="body2">{dizimo.valorArrecadado}</Typography>
        </TableCell>
        
        <TableCell align="center">
          <Box display="flex" flexDirection="column" gap={1}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(`/dizimos/edit/${dizimo.id}`)}
              startIcon={<IconEdit />}
              size="small"
            >
              Editar
            </Button>
          </Box>
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={5} align="center"> {/* Corrigido o colspan para 5 */}
        <Typography variant="body2">Nenhum dízimo encontrado</Typography>
      </TableCell>
    </TableRow>
  )}
</TableBody>

      </Table>
    </div>
  );
};

export default DizimoList;
