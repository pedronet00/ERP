import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, Typography, TableContainer, TableHead, TableRow, Paper, IconButton, Grid } from '@mui/material';
import { IconPrinter, IconArrowLeft } from '@tabler/icons-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FinancasReport = () => {
    const [reportData, setReportData] = useState({});
    const navigate = useNavigate();
    
    // Função para buscar os dados financeiros da API
    const fetchFinancas = async () => {
        try {
            const idCliente = localStorage.getItem('idCliente'); // Pega o idCliente do localStorage
            const apiUrl = `http://localhost:8000/api/financasReport?idCliente=${idCliente}`; // Monta a URL com o idCliente como parâmetro
            const response = await axios.get(apiUrl);

            // Armazena os dados do relatório
            setReportData(response.data);
        } catch (error) {
            console.error("Erro ao buscar dados financeiros:", error);
        }
    };

    // Busca os dados quando o componente for montado
    useEffect(() => {
        fetchFinancas();
    }, []);

    // Função para impressão
    const handlePrint = () => {
        window.print();
    };

    const handleGoBack = () => {
        navigate(-1); // Volta para a tela anterior
    };

    return (
        <Paper className="relatorio" style={{ width: '80%', margin: 'auto' }}>
            {/* Estilos para ocultar itens na impressão */}
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
            
            {/* Título e informações do relatório */}
            <Typography variant="h4" gutterBottom style={{ textAlign: 'center', padding: '5% 0 0 0' }}>
                Relatório Financeiro da Primeira Igreja Batista de Presidente Prudente
            </Typography>
            <Typography variant="h6" gutterBottom style={{ textAlign: 'center', fontWeight: '200' }}>
                Entradas, Saídas e Saldo Mensal - {new Date().getFullYear()}
            </Typography>

            {/* Ícone de impressão */}
            <IconButton onClick={handlePrint} aria-label="imprimir" className="no-print">
                <IconPrinter />
            </IconButton>

            {/* Estatísticas do relatório */}
            <Grid container spacing={1} style={{ marginTop: '20px', width: '80%', margin: 'auto' }}>
                <Grid item xs={12}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Saldo Mensal Atual:</Typography>
                        <Typography variant="h5">R$ {reportData.saldoMensalAtual}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} style={{marginTop: '5%'}}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Mês com maior entrada:</Typography>
                        <Typography variant="h5">{reportData.mesMaiorEntrada?.mes} - R$ {reportData.mesMaiorEntrada?.valor}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} style={{marginTop: '5%'}}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Mês com maior saída:</Typography>
                        <Typography variant="h5">{reportData.mesMaiorSaida?.mes} - R$ {reportData.mesMaiorSaida?.valor}</Typography>
                    </Paper>
                </Grid>
            </Grid>

            {/* Tabela de entradas, saídas e saldo mensal */}
            <TableContainer style={{ width: '80%', margin: '2% auto' }}>
                <Table sx={{ borderCollapse: 'collapse', textAlign: 'center' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ border: '1px solid black', fontWeight: '900', textAlign: 'center' }}>Mês</TableCell>
                            <TableCell sx={{ border: '1px solid black', fontWeight: '900', textAlign: 'center' }}>Entradas (R$)</TableCell>
                            <TableCell sx={{ border: '1px solid black', fontWeight: '900', textAlign: 'center' }}>Saídas (R$)</TableCell>
                            <TableCell sx={{ border: '1px solid black', fontWeight: '900', textAlign: 'center' }}>Saldo (R$)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* Verificando se há entradas, saídas e saldos para exibir */}
                        {reportData.entradas && reportData.saidas && reportData.saldos ? (
                            Object.keys(reportData.entradas).map((mes) => (
                                <TableRow key={mes}>
                                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>
                                        {reportData.meses[parseInt(mes) - 1]}
                                    </TableCell>
                                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>
                                        R$ {parseFloat(reportData.entradas[mes]).toFixed(2)}
                                    </TableCell>
                                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>
                                        R$ {parseFloat(reportData.saidas[mes]).toFixed(2)}
                                    </TableCell>
                                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>
                                        R$ {parseFloat(reportData.saldos[mes]).toFixed(2)}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center" sx={{ border: '1px solid black' }}>
                                    Nenhum dado financeiro encontrado.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Área de assinaturas */}
            <Grid container style={{ marginTop: '50px', textAlign: 'center', padding: '50px' }} spacing={4}>
                <Grid item xs={6}>
                    <Typography variant="h6" style={{ marginBottom: '40px', borderTop: '1px solid black' }}>
                    </Typography>
                    <Typography variant="body1">Tesoureiro</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" style={{ marginBottom: '40px', borderTop: '1px solid black' }}>
                    </Typography>
                    <Typography variant="body1">Secretária</Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default FinancasReport;
