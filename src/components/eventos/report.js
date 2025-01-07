import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, Typography, TableContainer, TableHead, TableRow, Paper, IconButton, Grid } from '@mui/material';
import { IconPrinter, IconArrowLeft } from '@tabler/icons-react';
import api from '../../axiosConfig';
import { useNavigate, useLocation } from 'react-router-dom';

const EventoReport = () => {
    const [eventos, setEventos] = useState([]);
    const [reportData, setReportData] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    // Extrai as datas da URL (assumindo o formato /eventos-report?dataInicial=YYYY-MM-DD&dataFinal=YYYY-MM-DD)
    const params = new URLSearchParams(location.search);
    const dataInicial = params.get('dataInicial');
    const dataFinal = params.get('dataFinal');

    // Função para buscar os eventos da API com base nas datas da URL
    const fetchEventos = async () => {
        try {
            const idCliente = localStorage.getItem('idCliente');

            if (!dataInicial || !dataFinal) {
                throw new Error("Datas não fornecidas na URL");
            }

            const apiUrl = `http://localhost:8000/api/eventosReport?idCliente=${idCliente}&dataInicial=${dataInicial}&dataFinal=${dataFinal}`;
            const response = await api.get(apiUrl);

            setEventos(response.data.eventos || []);
            setReportData(response.data || {});
        } catch (error) {
            console.error("Erro ao buscar eventos:", error);
            setEventos([]);
        }
    };

    useEffect(() => {
        fetchEventos();
    }, [location.search]); // Reexecuta quando as datas na URL mudarem

    const handlePrint = () => {
        window.print();
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <Paper className="relatorio" style={{ width: '80%', margin: 'auto' }}>
            <style>
                {`
                @media print {
                    .no-print {
                        display: none !important;
                    }
                }
                `}
            </style>

            <div className="d-flex justify-content-between mb-3 no-print" style={{ marginTop: '2%' }}>
                <button className="btn btn-secondary" onClick={handleGoBack}><IconArrowLeft /> Voltar</button>
            </div>

            <Typography variant="h4" gutterBottom style={{ textAlign: 'center', padding: '5% 0 0 0' }}>
                Relatório de Eventos da Primeira Igreja Batista de Presidente Prudente
            </Typography>
            <Typography variant="h6" gutterBottom style={{ textAlign: 'center', fontWeight: '200' }}>
                Eventos realizados entre {new Date(dataInicial).toLocaleDateString('pt-BR', { timeZone: 'UTC' })} e {new Date(dataFinal).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
            </Typography>

            <IconButton onClick={handlePrint} aria-label="imprimir" className="no-print">
                <IconPrinter />
            </IconButton>

            <Grid container spacing={1} style={{ marginTop: '20px', width: '80%', margin: 'auto' }}>
                <Grid item xs={12}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Quantidade de eventos:</Typography>
                        <Typography variant="h5">{reportData.quantidadeEventos || 0}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} style={{ marginTop: '5%' }}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Evento mais caro:</Typography>
                        <Typography variant="h5">{reportData.eventoMaisCaro?.titulo || 'N/A'}</Typography>
                        <Typography variant="body1">
                            Orçamento: R$ {reportData.eventoMaisCaro?.orcamento || 'N/A'}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} style={{ marginTop: '5%' }}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Mês com mais eventos:</Typography>
                        <Typography variant="h5">{reportData.mesComMaisEventos?.mes || 'N/A'}</Typography>
                        <Typography variant="body1">
                            Total de eventos: {reportData.mesComMaisEventos?.totalEventos || 'N/A'}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            <TableContainer style={{ width: '80%', margin: '2% auto' }}>
                <Table sx={{ borderCollapse: 'collapse', textAlign: 'center' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ border: '1px solid black', fontWeight: '900', textAlign: 'center' }}>Título</TableCell>
                            <TableCell sx={{ border: '1px solid black', fontWeight: '900', textAlign: 'center' }}>Data</TableCell>
                            <TableCell sx={{ border: '1px solid black', fontWeight: '900', textAlign: 'center' }}>Orçamento</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {eventos && eventos.length > 0 ? (
                            eventos.map((evento, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{evento.nomeEvento}</TableCell>
                                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{new Date(evento.dataEvento).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</TableCell>
                                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>R$ {evento.orcamentoEvento}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} align="center" sx={{ border: '1px solid black' }}>
                                    Nenhum evento encontrado.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Grid container style={{ marginTop: '50px', textAlign: 'center', padding: '50px' }} spacing={4}>
                <Grid item xs={6}>
                    <Typography variant="h6" style={{ marginBottom: '40px', borderTop: '1px solid black' }}></Typography>
                    <Typography variant="body1">Pastor</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" style={{ marginBottom: '40px', borderTop: '1px solid black' }}></Typography>
                    <Typography variant="body1">Secretária</Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default EventoReport;
