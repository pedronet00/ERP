import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Button,
  TextField,
  Typography,
  Select,
  InputLabel,
  FormControl,
  MenuItem
} from '@mui/material';
import { IconArrowLeft } from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../axiosConfig';
import Swal from 'sweetalert2';

const CadastrarEvento = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const [nomeEvento, setNomeEvento] = useState("");
  const [descricaoEvento, setDescricaoEvento] = useState("");
  const [localEvento, setLocalEvento] = useState("");
  const [dataEvento, setDataEvento] = useState("");
  const [prioridadeEvento, setPrioridadeEvento] = useState("");
  const [orcamentoEvento, setOrcamentoEvento] = useState("");
  const [locais, setLocais] = useState([]);
  const idCliente = localStorage.getItem('idCliente'); 

  const prioridades = [
    { value: 1, label: 'Baixa' },
    { value: 2, label: 'Média' },
    { value: 3, label: 'Alta' },
    { value: 4, label: 'Crítica' },
  ];

  useEffect(() => {
    const fetchLocais = async () => {
      try {
        const apiUrl = `http://localhost:8000/api/locais?idCliente=${idCliente}`; // Monta a URL com o idCliente como parâmetro
        const response = await api.get(apiUrl);
        const locaisData = response.data;

        if (locaisData.length === 0) {
          // Se não houver locais cadastrados, exibir o Swal
          Swal.fire({
            title: 'Atenção',
            text: 'Antes de cadastrar um evento, você deve cadastrar um local.',
            icon: 'warning',
            confirmButtonText: 'Entendi'
          }).then(() => {
            navigate('/dashboard/locais/create'); // Redireciona para a página de criação de locais, ajuste a rota conforme necessário
          });
        }

        setLocais(locaisData);
      } catch (error) {
        console.error('Erro ao buscar os locais:', error);
      }
    };

    fetchLocais();
  }, [idCliente, navigate]);

  useEffect(() => {
    const fetchEvento = async () => {
      if (eventId) {
        try {
          const response = await api.get(`http://localhost:8000/api/eventos/${eventId}`);
          const evento = response.data;
  
          setNomeEvento(evento.evento.nomeEvento || '');
          setDescricaoEvento(evento.evento.descricaoEvento || '');
          setLocalEvento(evento.evento.localEvento || '');
          setDataEvento(evento.evento.dataEvento || '');
          setPrioridadeEvento(evento.evento.prioridadeEvento || '');
          setOrcamentoEvento(evento.evento.orcamentoEvento || '');
        } catch (error) {
          console.error('Erro ao buscar o evento:', error);
        }
      }
    };
  
    fetchEvento();
  }, [eventId]);

  const handleGoBack = () => {
    navigate('/dashboard/eventos');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      nomeEvento,
      descricaoEvento,
      localEvento,
      dataEvento,
      prioridadeEvento,
      orcamentoEvento,
      idCliente
    };

    try {
      if (eventId) {
        await api.put(`http://localhost:8000/api/eventos/${eventId}`, formData);
        Swal.fire('Evento atualizado!', 'O evento foi atualizado com sucesso.', 'success');
        navigate('/dashboard/eventos');
      } else {
        await api.post('http://localhost:8000/api/eventos', formData);
        Swal.fire('Evento cadastrado!', 'O evento foi cadastrado com sucesso.', 'success');
      }
      
      setNomeEvento('');
      setDescricaoEvento('');
      setLocalEvento('');
      setDataEvento('');
      setPrioridadeEvento('');
      setOrcamentoEvento('');

      navigate('/dashboard/eventos');
    } catch (error) {
      console.error('Erro ao salvar o evento:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <div className="d-flex justify-content-between mb-3" style={{ marginTop: '2%' }}>
        <button className="btn btn-secondary" onClick={handleGoBack}>
          <IconArrowLeft /> Voltar
        </button>
      </div>
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          {eventId ? 'Editar Evento' : 'Cadastrar Evento'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nome do Evento"
            variant="outlined"
            fullWidth
            margin="normal"
            inputProps={{ maxLength: 40 }}
            value={nomeEvento}
            onChange={(e) => setNomeEvento(e.target.value)}
            required
          />

          <TextField
            label="Descrição do Evento"
            variant="outlined"
            fullWidth
            multiline
            inputProps={{ maxLength: 100 }}
            rows={5}
            margin="normal"
            value={descricaoEvento}
            onChange={(e) => setDescricaoEvento(e.target.value)}
            required
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Local do Evento</InputLabel>
            <Select
              label="Local do Evento"
              value={localEvento}
              onChange={(e) => setLocalEvento(e.target.value)}
              displayEmpty
            >
              {locais
                .filter(local => local.statusLocal === 1)  // Filtra os locais com statusLocal igual a 1
                .map((local) => (
                  <MenuItem key={local.id} value={local.id}>
                    {local.nomeLocal}
                  </MenuItem>
                ))
              }

            </Select>
          </FormControl>

          <TextField
            label="Data do Evento"
            variant="outlined"
            fullWidth
            margin="normal"
            type="date"
            value={dataEvento}
            onChange={(e) => setDataEvento(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Prioridade do Evento</InputLabel>
            <Select
              label="Prioridade do Evento"
              value={prioridadeEvento}
              onChange={(e) => setPrioridadeEvento(e.target.value)}
              displayEmpty
            >
              {prioridades.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Orçamento do Evento"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            value={orcamentoEvento}
            onChange={(e) => setOrcamentoEvento(e.target.value)}
            required
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            {eventId ? 'Atualizar Evento' : 'Cadastrar Evento'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CadastrarEvento;
