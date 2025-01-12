import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, Typography, TableContainer, TableHead, TableRow, Paper, Grid } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconPrinter, IconArrowLeft } from '@tabler/icons-react';
import api from '../../axiosConfig';

const EscalaCultoReport = () => {
    const [escalas, setEscalas] = useState([]);
    const [cultoData, setCultoData] = useState({});
    const location = useLocation();
    const navigate = useNavigate();

    const fetchEscalas = async () => {
        try {
            const params = new URLSearchParams(location.search);
            const idCulto = params.get('idCulto');

            if (!idCulto) {
                throw new Error("ID do culto não fornecido na URL");
            }

            const response = await api.get(`http://localhost:8000/api/escalas-cultos`, {
                params: { idCulto }
            });

            if (response.data.length > 0) {
                const firstEscala = response.data[0];
                setCultoData({
                    dataCulto: firstEscala.culto.dataCulto,
                    turnoCulto: firstEscala.culto.turnoCulto
                });
            }

            setEscalas(response.data || []);
        } catch (error) {
            console.error("Erro ao buscar escalas:", error);
            setEscalas([]);
        }
    };

    useEffect(() => {
        fetchEscalas();
    }, [location.search]);

    const handleGoBack = () => {
        navigate(-1);
    }

    return (
        <Paper style={{ width: '80%', margin: 'auto', padding: '20px' }}>
            <style>
                {`
                @media print {
                    .no-print {
                        display: none !important;
                    }
                }
                `}
            </style>

            {/* Botão de voltar */}
            <div className="d-flex justify-content-between mb-3 no-print" style={{ marginTop: '2%' }}>
                <button className="btn btn-secondary" onClick={handleGoBack}><IconArrowLeft /> Voltar</button>
            </div>
            <Typography variant="h4" gutterBottom style={{ textAlign: 'center', padding: '20px 0' }}>
                Relatório de Escala de Culto
            </Typography>
            <Typography variant="h6" style={{ textAlign: 'center', marginBottom: '20px' }}>
                Data: {new Date(cultoData.dataCulto).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                <br />
                Turno: {cultoData.turnoCulto === 0 ? 'Manhã' : 'Noite'}
            </Typography>

            <TableContainer>
                <Table sx={{ borderCollapse: 'collapse', textAlign: 'center' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ border: '1px solid black', fontWeight: 'bold', textAlign: 'center' }}>Função</TableCell>
                            <TableCell sx={{ border: '1px solid black', fontWeight: 'bold', textAlign: 'center' }}>Pessoa</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {escalas.length > 0 ? (
                            escalas.map((escala) => (
                                <TableRow key={escala.id}>
                                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{escala.funcao_culto.nomeFuncao}</TableCell>
                                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{escala.pessoa.name}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={2} align="center" sx={{ border: '1px solid black' }}>
                                    Nenhuma escala encontrada.
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

export default EscalaCultoReport;
