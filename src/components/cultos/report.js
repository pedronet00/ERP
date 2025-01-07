import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, Typography, TableContainer, TableHead, TableRow, Paper, IconButton, Grid } from '@mui/material';
import { IconPrinter, IconArrowLeft } from '@tabler/icons-react';
import api from '../../axiosConfig';
import { useNavigate, useLocation } from 'react-router-dom';

const CultoReport = () => {
    const [cultos, setCultos] = useState([]);
    const [reportData, setReportData] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const dataInicial = params.get('dataInicial');
    const dataFinal = params.get('dataFinal');

    const fetchCultos = async () => {
        try {
            const idCliente = localStorage.getItem('idCliente');

            if (!dataInicial || !dataFinal) {
                throw new Error("Datas não fornecidas na URL");
            }

            const response = await api.get('http://localhost:8000/api/cultoReport', {
                params: {
                    idCliente: idCliente,
                    dataInicial: dataInicial,
                    dataFinal: dataFinal
                }
            });

            setCultos(response.data.cultos || []);
            setReportData(response.data || {});
        } catch (error) {
            console.error("Erro ao buscar cultos:", error);
            setCultos([]);
        }
    };

    useEffect(() => {
        fetchCultos();
    }, [location.search]);

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
                Relatório de Cultos da Primeira Igreja Batista de Presidente Prudente
            </Typography>
            <Typography variant="h6" gutterBottom style={{ textAlign: 'center', fontWeight: '200' }}>
                Cultos realizados entre {new Date(dataInicial).toLocaleDateString('pt-BR', { timeZone: 'UTC' })} e {new Date(dataFinal).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
            </Typography>

            <IconButton onClick={handlePrint} aria-label="imprimir" className="no-print">
                <IconPrinter />
            </IconButton>

            <Grid container spacing={1} style={{ marginTop: '20px', width: '80%', margin: 'auto' }}>
                <Grid item xs={12}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Quantidade total de cultos:</Typography>
                        <Typography variant="h5">{reportData.qtdeCultos || 0}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} style={{ marginTop: '5%' }}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Cultos de manhã:</Typography>
                        <Typography variant="h5">{reportData.qtdeCultosManha || 0}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} style={{ marginTop: '5%' }}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Cultos de noite:</Typography>
                        <Typography variant="h5">{reportData.qtdeCultosNoite || 0}</Typography>
                    </Paper>
                </Grid>
            </Grid>

            <TableContainer style={{ width: '80%', margin: '2% auto' }}>
                <Table sx={{ borderCollapse: 'collapse', textAlign: 'center' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ border: '1px solid black', fontWeight: '900', textAlign: 'center' }}>Data do Culto</TableCell>
                            <TableCell sx={{ border: '1px solid black', fontWeight: '900', textAlign: 'center' }}>Turno</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cultos && cultos.length > 0 ? (
                            cultos.map((culto, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{new Date(culto.dataCulto).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</TableCell>
                                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{culto.turnoCulto === 0 ? 'Manhã' : 'Noite'}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={2} align="center" sx={{ border: '1px solid black' }}>
                                    Nenhum culto encontrado.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
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
            </TableContainer>
            
        </Paper>
    );
};

export default CultoReport;
