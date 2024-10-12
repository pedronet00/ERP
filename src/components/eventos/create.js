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
import { IconArrowLeft } from '@tabler/icons-react'; // Importe seu ícone de voltar
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
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
        const response = await axios.get(apiUrl);
        setLocais(response.data);
      } catch (error) {
        console.error('Erro ao buscar os locais:', error);
      }
    };

    fetchLocais();
  }, []);

  useEffect(() => {
    const fetchEvento = async () => {
      if (eventId) {
        try {
          const response = await axios.get(`http://localhost:8000/api/eventos/${eventId}`);
          const evento = response.data; // Aqui você já tem o objeto evento
  
  
          // Atribui os dados retornados aos estados corretamente
          setNomeEvento(evento.evento.nomeEvento || '');
          setDescricaoEvento(evento.evento.descricaoEvento || '');
          setLocalEvento(evento.evento.localEvento || ''); // Local do evento é um id, ajuste conforme necessário
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
    navigate(-1);
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
        const response = await axios.put(
          `http://localhost:8000/api/eventos/${eventId}`,
          formData
        );
        Swal.fire(
          'Evento atualizado!',
          'O evento foi atualizado com sucesso.',
          'success'
        );

        setNomeEvento('');
        setDescricaoEvento('');
        setLocalEvento('');
        setDataEvento('');
        setPrioridadeEvento('');
        setOrcamentoEvento('');

        navigate('/');
      } else {
        const response = await axios.post(
          'http://localhost:8000/api/eventos',
          formData
        );
        console.log('Evento cadastrado com sucesso:', response.data);
      }
      // Limpa os campos após salvar
      setNomeEvento('');
      setDescricaoEvento('');
      setLocalEvento('');
      setDataEvento('');
      setPrioridadeEvento('');
      setOrcamentoEvento('');
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
            value={nomeEvento}
            onChange={(e) => setNomeEvento(e.target.value)}
            required
          />

          <TextField
            label="Descrição do Evento"
            variant="outlined"
            fullWidth
            multiline
            rows={5}
            margin="normal"
            value={descricaoEvento}
            onChange={(e) => setDescricaoEvento(e.target.value)}
            required
          />

          {/* Select de Local do Evento */}
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Local do Evento</InputLabel>
            <Select
              label="Local do Evento"
              value={localEvento}
              onChange={(e) => setLocalEvento(e.target.value)}
              displayEmpty // Permite um valor vazio
            >
              
              {locais.map((local) => (
                <MenuItem key={local.id} value={local.id}>
                  {local.nomeLocal}
                </MenuItem>
              ))}
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
              displayEmpty // Permite um valor vazio
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

