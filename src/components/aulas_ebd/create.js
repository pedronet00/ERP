import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { TextField, Button, Container, Typography, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';

const CriarAulaEBD = () => {
  const navigate = useNavigate();
  const [dataAula, setDataAula] = useState('');
  const [professorAula, setProfessorAula] = useState('');
  const [classeAula, setClasseAula] = useState('');
  const [quantidadePresentes, setQuantidadePresentes] = useState('');
  const [numeroAula, setNumeroAula] = useState('');
  const [professores, setProfessores] = useState([]);
  const [classes, setClasses] = useState([]);
  const idCliente = localStorage.getItem('idCliente');

  // Função para buscar professores e classes
  useEffect(() => {
    const fetchProfessores = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/user?id=${idCliente}`);
        setProfessores(response.data); // Supondo que a resposta seja uma lista de professores
      } catch (error) {
        console.error("Erro ao buscar professores:", error);
      }
    };

    const fetchClasses = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/classesEBD?idCliente=${idCliente}`);
        setClasses(response.data); // Supondo que a resposta seja uma lista de classes
      } catch (error) {
        console.error("Erro ao buscar classes:", error);
      }
    };

    fetchProfessores();
    fetchClasses();
  }, [idCliente]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const aulaData = {
      dataAula,
      professorAula,
      classeAula,
      quantidadePresentes,
      numeroAula,
      idCliente,
    };

    try {
      // Enviar os dados da aula para o backend
      await axios.post(`http://localhost:8000/api/aulaEBD`, aulaData);
      Swal.fire('Aula Criada!', 'A aula foi criada com sucesso.', 'success');

      // Limpa os campos após o sucesso
      setDataAula('');
      setProfessorAula('');
      setClasseAula('');
      setQuantidadePresentes('');
      setNumeroAula('');
    } catch (error) {
      if (error.response && error.response.data.error) {
        Swal.fire('Erro!', error.response.data.error, 'error');
      } else {
        Swal.fire('Erro!', 'Houve um problema ao criar a aula.', 'error');
      }
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Volta para a tela anterior
  };

  return (
    <Container maxWidth="sm">
      <div className="d-flex justify-content-between mb-3" style={{ marginTop: '2%' }}>
        <button className="btn btn-secondary" onClick={handleGoBack}><IconArrowLeft /> Voltar</button>
      </div>
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Criar Nova Aula
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Data da Aula"
            type="date"
            variant="outlined"
            fullWidth
            margin="normal"
            value={dataAula}
            onChange={(e) => setDataAula(e.target.value)}
            required
            InputLabelProps={{
              shrink: true,
            }}
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Professor</InputLabel>
            <Select
              value={professorAula}
              onChange={(e) => setProfessorAula(e.target.value)}
              label="Professor"
            >
              {professores.map((professor) => (
                <MenuItem key={professor.id} value={professor.id}>
                  {professor.name} {/* Supondo que o objeto professor tenha um campo "nome" */}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Classe</InputLabel>
            <Select
              value={classeAula}
              onChange={(e) => setClasseAula(e.target.value)}
              label="Classe"
            >
              {classes.map((classe) => (
                <MenuItem key={classe.id} value={classe.id}>
                  {classe.nomeClasse} {/* Supondo que o objeto classe tenha um campo "nomeClasse" */}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Quantidade de Presentes"
            variant="outlined"
            type="number"
            fullWidth
            margin="normal"
            value={quantidadePresentes}
            onChange={(e) => setQuantidadePresentes(e.target.value)}
            required
          />

          <TextField
            label="Lição da Aula"
            variant="outlined"
            fullWidth
            type="number"
            margin="normal"
            value={numeroAula}
            onChange={(e) => setNumeroAula(e.target.value)}
            required
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Criar Aula
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CriarAulaEBD;