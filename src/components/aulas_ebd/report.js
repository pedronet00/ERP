import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, Typography, TableContainer, TableHead, TableRow, Paper, IconButton, Grid } from '@mui/material';
import { IconPrinter, IconArrowLeft } from '@tabler/icons-react';
import api from '../../axiosConfig';
import { useNavigate, useLocation } from 'react-router-dom';

const AulaEBDReport = () => {
    const [aulas, setAulas] = useState([]);
    const [reportData, setReportData] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search); // Obtém os parâmetros da URL
    const dataInicial = queryParams.get('dataInicial');
    const dataFinal = queryParams.get('dataFinal');

    // Função para buscar os dados da API
    const fetchAulas = async () => {
        try {
            const idCliente = localStorage.getItem('idCliente'); // Obtém o ID do cliente do localStorage
    
            // Monta a URL com os parâmetros
            const apiUrl = `http://localhost:8000/api/ebdReport?idCliente=${idCliente}&dataInicial=${dataInicial}&dataFinal=${dataFinal}`;
            const response = await api.get(apiUrl);
    
            // Armazena os dados do relatório
            setAulas(response.data.aulas);
            setReportData(response.data);
        } catch (error) {
            console.error("Erro ao buscar aulas:", error);
        }
    };

    // Busca os usuários quando o componente for montado
    useEffect(() => {
        fetchAulas();
    }, []);

    // Função para impressão
    const handlePrint = () => {
        window.print();
    };

    const handleGoBack = () => {
        navigate(-1); // Volta para a tela anterior
    };

    return (
        <Paper className="relatorio" style={{ width: '90%', margin: 'auto' }}>
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
                Relatório de Aulas de EBD da Primeira Igreja Batista de Presidente Prudente
            </Typography>
            <Typography variant="h6" gutterBottom style={{ textAlign: 'center', fontWeight: '200' }}>
                Aulas registradas entre {new Date(dataInicial).toLocaleDateString('pt-BR', { timeZone: 'UTC' })} e {new Date(dataFinal).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
            </Typography>

            {/* Ícone de impressão */}
            <IconButton onClick={handlePrint} aria-label="imprimir" className="no-print">
                <IconPrinter />
            </IconButton>

            {/* Estatísticas do relatório */}
            <Grid container spacing={1} style={{ marginTop: '20px', width: '80%', margin: 'auto' }}>
                <Grid item xs={6}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Quantidade de aulas:</Typography>
                        <Typography variant="h5">{reportData.qtdeAulas ?? "Sem dados disponíveis"}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Quantidade de classes:</Typography>
                        <Typography variant="h5">{reportData.qtdeClasses ?? "Sem dados disponíveis"}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} style={{ marginTop: '5%' }}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Média de alunos:</Typography>
                        <Typography variant="h5">{reportData.mediaAlunos ?? "Sem dados disponíveis"}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} style={{ marginTop: '5%' }}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Professor mais ativo:</Typography>
                        <Typography variant="h5">
                            {reportData.professorMaisFrequente?.professor
                                ? `${reportData.professorMaisFrequente.professor.name} (${reportData.professorMaisFrequente.total} aulas)`
                                : "Sem dados disponíveis"}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            {/* Tabela de missões */}
            <TableContainer style={{ width: '90%', margin: '2% auto' }}>
                <Table sx={{ borderCollapse: 'collapse', textAlign: 'center' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ border: '1px solid black', fontWeight: '900', textAlign: 'center' }}>Data da aula</TableCell>
                            <TableCell sx={{ border: '1px solid black', fontWeight: '900', textAlign: 'center' }}>Classe da aula</TableCell>
                            <TableCell sx={{ border: '1px solid black', fontWeight: '900', textAlign: 'center' }}>Professor da aula</TableCell>
                            <TableCell sx={{ border: '1px solid black', fontWeight: '900', textAlign: 'center' }}>Quantidade presentes</TableCell>
                            <TableCell sx={{ border: '1px solid black', fontWeight: '900', textAlign: 'center' }}>Lição</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {aulas.length > 0 ? (
                            aulas.map((aula, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{aula.dataAula ?? "Sem dados"}</TableCell>
                                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{aula.classe?.nomeClasse ?? "Sem dados"}</TableCell>
                                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{aula.professor?.name ?? "Sem dados"}</TableCell>
                                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{aula.quantidadePresentes ?? "Sem dados"}</TableCell>
                                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{aula.numeroAula ?? "Sem dados"}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center" sx={{ border: '1px solid black' }}>
                                    Sem dados disponíveis.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Área de assinaturas */}
            <Grid container style={{ marginTop: '50px', textAlign: 'center', padding: '50px' }} spacing={4}>
                <Grid item xs={6}>
                    <Typography variant="h6" style={{ marginBottom: '40px', borderTop: '1px solid black' }} />
                    <Typography variant="body1">Pastor</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" style={{ marginBottom: '40px', borderTop: '1px solid black' }} />
                    <Typography variant="body1">Secretária</Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default AulaEBDReport;
