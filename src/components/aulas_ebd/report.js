import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, Typography, TableContainer, TableHead, TableRow, Paper, IconButton, Grid } from '@mui/material';
import { IconPrinter, IconArrowLeft } from '@tabler/icons-react';
import api from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';

const MissoesReport = () => {
    const [aulas, setAulas] = useState([]);
    const [reportData, setReportData] = useState({});
    const navigate = useNavigate();
    
    // Função para buscar os usuários da API
    const fetchAulas = async () => {
        try {
            const idCliente = localStorage.getItem('idCliente'); // Pega o idCliente do localStorage
            const apiUrl = `http://localhost:8000/api/ebdReport?idCliente=${idCliente}`; // Monta a URL com o idCliente como parâmetro
            const response = await api.get(apiUrl);
    
            // Armazena os usuários a partir do campo 'usuarios'
            setAulas(response.data.aulas); 
            setReportData(response.data); // Armazena os dados do relatório
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
                Aulas cadastradas entre 20/08/2024 e 04/10/2024
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
                        <Typography variant="h5">{reportData.qtdeAulas}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Quantidade de classes:</Typography>
                        <Typography variant="h5">{reportData.qtdeClasses}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} style={{marginTop: '5%'}}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Média de alunos:</Typography>
                        <Typography variant="h5">{reportData.mediaAlunos}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} style={{marginTop: '5%'}}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Professor mais ativo:</Typography>
                        <Typography variant="h5">{reportData.professorMaisFrequente && reportData.professorMaisFrequente.professor 
                ? `${reportData.professorMaisFrequente.professor.name} (${reportData.professorMaisFrequente.total} aulas)` 
                : "Dados indisponíveis"}</Typography>
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
                                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{aula.dataAula}</TableCell>
                                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{aula.classe.nomeClasse}</TableCell>
                                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{aula.professor.name}</TableCell>
                                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{aula.quantidadePresentes}</TableCell>
                                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{aula.numeroAula}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center" sx={{ border: '1px solid black' }}>
                                    Nenhuma missão encontrada.
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
                    <Typography variant="body1">Pastor</Typography>
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

export default MissoesReport;
