import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, Typography, TableContainer, TableHead, TableRow, Paper, IconButton, Grid } from '@mui/material';
import { IconPrinter, IconArrowLeft } from '@tabler/icons-react';
import api from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';

const DizimosReport = () => {
    const [dizimos, setDizimos] = useState([]);
    const [reportData, setReportData] = useState({});
    const navigate = useNavigate();
    
    // Função para buscar os dizimos da API
    const fetchDizimos = async () => {
        try {
            const idCliente = localStorage.getItem('idCliente'); // Pega o idCliente do localStorage
            const apiUrl = `http://localhost:8000/api/dizimosReport?idCliente=${idCliente}`; // Monta a URL com o idCliente como parâmetro
            const response = await api.get(apiUrl);
    
            // Armazena os dizimos a partir do campo 'dizimos'
            setDizimos(response.data.dizimos); 
            setReportData(response.data); // Armazena os dados do relatório
        } catch (error) {
            console.error("Erro ao buscar dízimos:", error);
        }
    };

    // Busca os dizimos quando o componente for montado
    useEffect(() => {
        fetchDizimos();
    }, []);

    // Função para agrupar os dizimos por mês
    const groupDizimosByMonth = (dizimos) => {
        const grouped = {};
        dizimos.forEach((dizimo) => {
            const date = new Date(dizimo.dataCulto);
            const month = date.toLocaleString('default', { month: 'long' });
            const year = date.getFullYear();
const monthYear = `${date.toLocaleString('pt-BR', { month: 'long' }).charAt(0).toUpperCase() + date.toLocaleString('pt-BR', { month: 'long' }).slice(1)}/${year}`;

            
            if (!grouped[monthYear]) {
                grouped[monthYear] = [];
            }
            grouped[monthYear].push(dizimo);
        });
        return grouped;
    };

    const groupedDizimos = groupDizimosByMonth(dizimos);

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
                Relatório de Dízimos da Primeira Igreja Batista de Presidente Prudente
            </Typography>
            <Typography variant="h6" gutterBottom style={{ textAlign: 'center', fontWeight: '200' }}>
                Dízimos cadastrados entre 20/08/2024 e 04/10/2024
            </Typography>

            {/* Ícone de impressão */}
            <IconButton onClick={handlePrint} aria-label="imprimir" className="no-print">
                <IconPrinter />
            </IconButton>

             {/* Estatísticas do relatório */}
             <Grid container spacing={1} style={{ marginTop: '20px', width: '80%', margin: 'auto' }}>
    <Grid item xs={6}>
        <Paper style={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h6">Culto com maior arrecadação:</Typography>
            <Typography variant="h5">
                {reportData.cultoMaiorValorArrecadado 
                    ? `${reportData.cultoMaiorValorArrecadado.dataCulto} - ${reportData.cultoMaiorValorArrecadado.turnoCulto === 0 ? "Manhã" : "Noite"}` 
                    : "Dados indisponíveis"}
            </Typography>
        </Paper>
    </Grid>
    <Grid item xs={6}>
        <Paper style={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h6">Culto com menor arrecadação:</Typography>
            <Typography variant="h5">
                {reportData.cultoMenorValorArrecadado 
                    ? `${reportData.cultoMenorValorArrecadado.dataCulto} - ${reportData.cultoMenorValorArrecadado.turnoCulto === 0 ? "Manhã" : "Noite"}` 
                    : "Dados indisponíveis"}
            </Typography>
        </Paper>
    </Grid>
    <Grid item xs={6} style={{ marginTop: '5%' }}>
        <Paper style={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h6">Mês com maior entrada:</Typography>
            <Typography variant="h5">
                {reportData.mesMaiorEntrada 
                    ? `${reportData.mesMaiorEntrada.mes} - R$ ${reportData.mesMaiorEntrada.valor}` 
                    : "Dados indisponíveis"}
            </Typography>
        </Paper>
    </Grid>
    <Grid item xs={6} style={{ marginTop: '5%' }}>
        <Paper style={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h6">Mês com menor entrada:</Typography>
            <Typography variant="h5">
                {reportData.mesMenorEntrada 
                    ? `${reportData.mesMenorEntrada.mes} - R$ ${reportData.mesMenorEntrada.valor}` 
                    : "Dados indisponíveis"}
            </Typography>
        </Paper>
    </Grid>
</Grid>


            {/* Tabela de dizimos agrupados por mês */}
            {Object.keys(groupedDizimos).map((monthYear, idx) => (
                <React.Fragment key={idx}>
                    <Typography variant="h5" style={{ margin: '20px 0', textAlign: 'center' }}>{monthYear}</Typography>
                    <TableContainer style={{ width: '80%', margin: '2% auto' }}>
                        <Table sx={{ borderCollapse: 'collapse', textAlign: 'center' }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ border: '1px solid black', fontWeight: '900', textAlign: 'center' }}>Data do culto</TableCell>
                                    <TableCell sx={{ border: '1px solid black', fontWeight: '900', textAlign: 'center' }}>Turno do culto</TableCell>
                                    <TableCell sx={{ border: '1px solid black', fontWeight: '900', textAlign: 'center' }}>Valor arrecadado</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {groupedDizimos[monthYear].map((dizimo, index) => (
                                    <TableRow key={index}>
                                        <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{new Date(dizimo.dataCulto).toLocaleDateString()}</TableCell>
                                        <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{dizimo.turnoCulto === 0 ? "Manhã" : "Noite"}</TableCell>
                                        <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>R$ {dizimo.valorArrecadado}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </React.Fragment>
            ))}
        </Paper>
    );
};

export default DizimosReport;
