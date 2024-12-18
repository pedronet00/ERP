import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Typography, 
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    Button
} from '@mui/material';
import { IconPlus } from '@tabler/icons-react';
import DashboardCard from '../../../components/shared/DashboardCard';

const EventosIgreja = ({ eventos }) => { // Recebe os eventos via props
    const navigate = useNavigate();
    const nivelUsuario = localStorage.getItem('nivelUsuario');

    // Função para definir a cor de background com base na prioridade
    const getPriorityColor = (prioridade) => {
        if (prioridade === 1 || prioridade === 2) {
            return "success.main";  // Verde para prioridades 1 ou 2
        } else if (prioridade === 3) {
            return "secondary.main";  // Cinza para prioridade 3
        } else if (prioridade === 4) {
            return "error.main";  // Vermelho para prioridade 4
        }
    };

    // Função para definir o nome da prioridade
    const getPriorityName = (prioridade) => {
        switch (prioridade) {
            case 1:
                return "Baixa";
            case 2:
                return "Média";
            case 3:
                return "Alta";
            case 4:
                return "Crítica";
            default:
                return "Desconhecida";
        }
    };

    const handleNewEvent = () => {
        navigate('/dashboard/eventos/create');
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        date.setHours(date.getHours() + 12); // Ajusta a data para o meio do dia
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <DashboardCard title="Próximos eventos da igreja">
            {nivelUsuario > 2 && (
                <button className="btn btn-primary" onClick={handleNewEvent}><IconPlus />Novo evento</button>
            )}
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: "nowrap",
                        mt: 3
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Título
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Data
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Prioridade
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Orçamento
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {eventos.length > 0 ? (
                            eventos.map((evento) => (
                                <TableRow key={evento.id}>
                                    <TableCell>
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            <Box>
                                                <Typography variant="subtitle2" fontWeight={600}>
                                                    {evento.nomeEvento}
                                                </Typography>
                                                <Typography
                                                    color="textSecondary"
                                                    sx={{ fontSize: "13px" }}
                                                >
                                                    {evento.local.nomeLocal}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                            {formatDate(evento.dataEvento)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            sx={{
                                                px: "4px",
                                                backgroundColor: getPriorityColor(evento.prioridadeEvento),
                                                color: "#fff",
                                            }}
                                            size="small"
                                            label={getPriorityName(evento.prioridadeEvento)}
                                        ></Chip>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="h6">R$ {parseFloat(evento.orcamentoEvento).toFixed(2)}</Typography>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    <Typography variant="subtitle2">Nenhum evento encontrado</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Box>
        </DashboardCard>
    );
};

export default EventosIgreja;
