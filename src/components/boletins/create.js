import React, { useState, useEffect } from "react";
import api from "../../axiosConfig";
import Swal from "sweetalert2";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";

const BoletimCultoForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Obter o ID da URL, caso exista
  const [dataCulto, setDataCulto] = useState("");
  const [turnoCulto, setTurnoCulto] = useState(1);
  const [usuarios, setUsuarios] = useState([]);
  const [escala, setEscala] = useState({
    transmissaoCulto: "",
    filmagemCulto: "",
    fotoCulto: "",
    apoioCulto: "",
    regenciaCulto: "",
    pianoCulto: "",
    orgaoCulto: "",
    somCulto: "",
    micVolanteCulto: "",
    apoioInternetCulto: "",
    cultoInfantilCulto: "",
    bercarioCulto: "",
    recepcaoCulto: "",
    aconselhamentoCulto: "",
    estacionamentoCulto: "",
    diaconosCulto: "",
  });

  const idCliente = localStorage.getItem("idCliente");

  // Função para buscar usuários da API
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await api.get(`http://localhost:8000/api/user?idCliente=${idCliente}`);
        setUsuarios(response.data || []);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsuarios();
  }, [idCliente]);

  // Função para carregar dados do boletim se estiver editando
  useEffect(() => {
    const fetchBoletim = async () => {
      if (id) {
        try {
          const response = await api.get(`http://localhost:8000/api/boletim/${id}`);
          const data = response.data.success; // Acesse o objeto dentro de "success"
  
          console.log("Boletim carregado:", data);
  
          // Atualize os estados com os dados do boletim
          setDataCulto(data.dataCulto || "");
          setTurnoCulto(data.turnoCulto || 1);
          setEscala({
            transmissaoCulto: data.transmissaoCulto || "",
            filmagemCulto: data.filmagemCulto || "",
            fotoCulto: data.fotoCulto || "",
            apoioCulto: data.apoioCulto || "",
            regenciaCulto: data.regenciaCulto || "",
            pianoCulto: data.pianoCulto || "",
            orgaoCulto: data.orgaoCulto || "",
            somCulto: data.somCulto || "",
            micVolanteCulto: data.micVolanteCulto || "",
            apoioInternetCulto: data.apoioInternetCulto || "",
            cultoInfantilCulto: data.cultoInfantilCulto || "",
            bercarioCulto: data.bercarioCulto || "",
            recepcaoCulto: data.recepcaoCulto || "",
            aconselhamentoCulto: data.aconselhamentoCulto || "",
            estacionamentoCulto: data.estacionamentoCulto || "",
            diaconosCulto: data.diaconosCulto || "",
          });
        } catch (error) {
          console.error("Erro ao carregar os dados do boletim:", error);
          Swal.fire("Erro!", "Erro ao carregar os dados do boletim.", "error");
        }
      }
    };
  
    fetchBoletim();
  }, [id]);
  

  // Função para atualizar a escala e aplicar a regra
  const handleEscalaChange = (field, value) => {
    setEscala((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Filtra usuários para garantir que um usuário não seja selecionado em múltiplas funções
  const getAvailableUsers = (selectedField) => {
    const selectedUsers = Object.values(escala).filter((value) => value && value !== escala[selectedField]);
    return usuarios.filter((user) => !selectedUsers.includes(user.id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const boletimData = {
      dataCulto,
      turnoCulto,
      ...escala,
    };

    try {
      if (id) {
        await api.put(`http://localhost:8000/api/boletim/${id}`, boletimData);
        Swal.fire("Boletim Atualizado!", "O boletim foi atualizado com sucesso.", "success");
      } else {
        await api.post("http://localhost:8000/api/boletim", boletimData);
        Swal.fire("Boletim Criado!", "O boletim foi criado com sucesso.", "success");
      }

      navigate("/dashboard/boletim");
    } catch (error) {
      Swal.fire("Erro!", "Houve um problema ao salvar o boletim.", "error");
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ marginTop: 4 }}>
        <Button
          onClick={handleGoBack}
          variant="contained"
          startIcon={<IconArrowLeft />}
          sx={{ marginBottom: 2 }}
        >
          Voltar
        </Button>

        <Typography variant="h4" gutterBottom>
          {id ? "Editar Boletim de Culto" : "Criar Boletim de Culto"}
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Data do Culto"
            type="date"
            variant="outlined"
            fullWidth
            margin="normal"
            value={dataCulto}
            onChange={(e) => setDataCulto(e.target.value || "")}
            required
            InputLabelProps={{
              shrink: true,
            }}
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Turno do Culto</InputLabel>
            <Select
              value={turnoCulto || ""}
              onChange={(e) => setTurnoCulto(e.target.value)}
              label="Turno do Culto"
            >
              <MenuItem value={1}>Manhã</MenuItem>
              <MenuItem value={2}>Noite</MenuItem>
            </Select>
          </FormControl>

          {Object.keys(escala).map((field) => (
            <FormControl fullWidth margin="normal" required key={field}>
              <InputLabel>{field.replace(/Culto/, "").replace(/([A-Z])/g, " $1")}</InputLabel>
              <Select
                value={escala[field] || ""}
                onChange={(e) => handleEscalaChange(field, e.target.value)}
                label={field.replace(/Culto/, "").replace(/([A-Z])/g, " $1")}
              >
                <MenuItem value="">Nenhum</MenuItem>
                {getAvailableUsers(field).map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ))}

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            {id ? "Salvar Alterações" : "Criar Boletim"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default BoletimCultoForm;
