import React, { useEffect, useState } from 'react';
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip
} from '@mui/material';
import { IconPlus } from '@tabler/icons-react'; // IconCheck adicionado
import DashboardCard from '../../../components/shared/DashboardCard';

const EventosIgreja = () => {
    const [eventos, setEventos] = useState([]);

    // Função para buscar os eventos da API
    const fetchEventos = async () => {
        try {
            const response = await fetch('https://apoleon.com.br/api-estagio/public/api/eventos');
            const data = await response.json();
            setEventos(data); // Salva os eventos na state
        } catch (error) {
            console.error('Erro ao buscar os eventos:', error);
        }
    };

    // useEffect para chamar a função quando o componente carregar
    useEffect(() => {
        fetchEventos();
    }, []);

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

    return (
        <DashboardCard title="Eventos da igreja">
            <button className="btn btn-primary"><IconPlus/>Novo evento</button>
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: "nowrap",
                        mt: 2
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Id
                                </Typography>
                            </TableCell>
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
                            <TableCell align="right">
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
                                        <Typography
                                            sx={{
                                                fontSize: "15px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {evento.id}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Box>
                                                <Typography variant="subtitle2" fontWeight={600}>
                                                    {evento.nomeEvento}
                                                </Typography>
                                                <Typography
                                                    color="textSecondary"
                                                    sx={{
                                                        fontSize: "13px",
                                                    }}
                                                >
                                                    Local: {evento.localEvento}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                            {new Date(evento.dataEvento).toLocaleDateString()}
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
                                    <TableCell align="right">
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
