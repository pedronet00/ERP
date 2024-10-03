import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconX, IconEdit, IconPlus, IconClipboard } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import {
  Typography, Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip
} from '@mui/material';

const MissoesList = () => {
  
  const [missoes, setMissoes] = useState([]);
  const navigate = useNavigate(); // Inicializar o navegador

  // Função para buscar missões da API
  const fetchMissoes = async () => {
    try {
      const response = await axios.get('https://apoleon.com.br/api-estagio/public/api/missoes');
      setMissoes(response.data);
    } catch (error) {
      console.error("Erro ao buscar missões:", error);
    }
  };

  // Usar o useEffect para chamar a API quando o componente for montado
  useEffect(() => {
    fetchMissoes();
  }, []);

  // Função do botão de novo usuário (você pode ajustar conforme necessário)
  const handleNewUser = () => {
    navigate('/missoes/create');
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Lista de Missões</h2>
      </div>

      <div className="d-flex justify-content-between">
        <button className="btn btn-success" onClick={handleNewUser}><IconClipboard/> Gerar Relatório</button>
        <button className="btn btn-primary" onClick={handleNewUser}><IconPlus/>Nova Missão</button>
      </div>

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
          Cidade
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2" fontWeight={600}>
          Membros
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2" fontWeight={600}>
          Pastor titular
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
    {missoes.length > 0 ? (
      missoes.map((missao) => (
        <TableRow key={missao.id}>
          <TableCell>
            <Typography variant="body2">{missao.id}</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="body2">{missao.nomeMissao}</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="body2">{missao.cidadeMissao}</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="body2">{missao.quantidadeMembros}</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="body2">{missao.pastorTitular}</Typography>
          </TableCell>
          <TableCell align="right">
            <IconX />
            <IconEdit />
          </TableCell>
        </TableRow>
      ))
    ) : (
      <TableRow>
        <TableCell colSpan={6} align="center">
          <Typography variant="body2">Nenhum departamento encontrado</Typography>
        </TableCell>
      </TableRow>
    )}
  </TableBody>
</Table>

    </div>
  );
};

export default MissoesList;
