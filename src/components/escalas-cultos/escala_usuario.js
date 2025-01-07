import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../../axiosConfig';
import { Typography, Box, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { IconArrowLeft } from '@tabler/icons-react';

const EscalasUsuario = () => {
  const [escala, setEscala] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const idPessoa = searchParams.get('idPessoa'); // Obtém o idCulto da URL

  const fetchEscalas = async () => {
    try {
      const response = await api.get(
        `http://localhost:8000/api/escala-culto-usuario?idPessoa=${idPessoa}`
      );
      setEscala(response.data);
      setLoading(false);
    } catch (err) {
      setError('Erro ao carregar escalas');
      setLoading(false);
    }
  };

  const handleDayClick = (date) => {
    const formattedDate = date.toISOString().split('T')[0]; // Formatar a data para 'YYYY-MM-DD'
    const detailsForDay = escala.filter((item) => item.culto.dataCulto === formattedDate);
    setDetails(detailsForDay);
    setSelectedDate(date);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchEscalas();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6">Carregando escalas...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  const markedDates = escala.map((item) => {
    const [year, month, day] = item.culto.dataCulto.split('-').map(Number);
    return new Date(year, month - 1, day); // Criar a data no fuso horário local
  });

  const handleGoBack = () => {
    navigate(-1); // Volta para a tela anterior
  };

  return (
    <div>
        <div className="d-flex justify-content-between mb-3" style={{ marginTop: '2%' }}>
            <button className="btn btn-secondary" onClick={handleGoBack}><IconArrowLeft /> Voltar</button>
        </div>
        <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
        }}
        >
        <Calendar
            onClickDay={handleDayClick}
            tileClassName={({ date }) =>
                markedDates.some(
                (markedDate) =>
                    date.getFullYear() === markedDate.getFullYear() &&
                    date.getMonth() === markedDate.getMonth() &&
                    date.getDate() === markedDate.getDate()
                )
                ? 'highlight'
                : null
            }
            
            className="full-calendar"
        />
        <style>{`
            .highlight {
            background-color: #1e3b8b !important; /* Azul */
            color: white !important;
            }

            .react-calendar {
            width: 100%;
            height: 100%;
            }

            .react-calendar__tile {
            max-width: initial !important;
            height: 6rem; /* Aumenta o tamanho das células */
            }

            .react-calendar__tile--now {
            background-color: #f0f0f0 !important;
            }

            .react-calendar__tile--active {
            background-color: #2196f3 !important; /* Verde para o dia selecionado */
            color: white !important;
            }

            .react-calendar__month-view__weekdays {
            font-weight: bold;
            }
        `}</style>

        <Dialog open={open} onClose={closeDialog} maxWidth="sm" fullWidth>
            <DialogTitle>Detalhes do Dia</DialogTitle>
            <DialogContent>
            {details.length > 0 ? (
                details.map((detail, index) => (
                <Box key={index} mb={2}>
                    <Typography variant="body1">
                    <strong>Função:</strong> {detail.funcao_culto.nomeFuncao}
                    </Typography>
                    <Typography variant="body1">
                    <strong>Turno:</strong> {detail.culto.turnoCulto === 0 ? 'Manhã' : 'Noite'}
                    </Typography>
                </Box>
                ))
            ) : (
                <Typography variant="body1">Nenhum detalhe para este dia.</Typography>
            )}
            </DialogContent>
        </Dialog>
        </Box>
    </div>
  );
};

export default EscalasUsuario;
