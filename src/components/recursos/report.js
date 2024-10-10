import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, Typography, TableContainer, TableHead, TableRow, Paper, IconButton, Grid } from '@mui/material';
import { IconPrinter, IconArrowLeft } from '@tabler/icons-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RecursoReport = () => {
    const [recursos, setRecursos] = useState([]);
    const [reportData, setReportData] = useState({});
    const navigate = useNavigate();
    
    // Função para buscar os recursos da API
    const fetchRecursos = async () => {
        try {
            const idCliente = localStorage.getItem('idCliente'); // Pega o idCliente do localStorage
            const apiUrl = `http://localhost:8000/api/recursoReport?idCliente=${idCliente}`; // Monta a URL com o idCliente como parâmetro
            const response = await axios.get(apiUrl);

            // Armazena os recursos e os dados do relatório
            setRecursos(response.data.recursos);
            setReportData(response.data);
        } catch (error) {
            console.error("Erro ao buscar recursos:", error);
        }
    };

    // Busca os recursos quando o componente for montado
    useEffect(() => {
        fetchRecursos();
    }, []);

    // Função para impressão
    const handlePrint = () => {
        window.print();
    };

    const handleGoBack = () => {
        navigate(-1); // Volta para a tela anterior
    };

    // Função para agrupar recursos por categoria
    const groupByCategory = (recursos) => {
        return recursos.reduce((acc, recurso) => {
            const categoriaId = recurso.categoria.id;
            if (!acc[categoriaId]) {
                acc[categoriaId] = [];
            }
            acc[categoriaId].push(recurso);
            return acc;
        }, {});
    };

    const groupedRecursos = groupByCategory(recursos);

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
                {reportData.titulo}
            </Typography>

            {/* Ícone de impressão */}
            <IconButton onClick={handlePrint} aria-label="imprimir" className="no-print">
                <IconPrinter />
            </IconButton>

            {/* Estatísticas do relatório */}
            <Grid container spacing={1} style={{ marginTop: '20px', width: '80%', margin: 'auto' }}>
                <Grid item xs={12}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Quantidade de recursos:</Typography>
                        <Typography variant="h5">{reportData.qtdeRecursos}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} style={{ marginTop: '5%' }}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Quantidade de tipos de recursos:</Typography>
                        <Typography variant="h5">{reportData.qtdeTipoRecursos}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} style={{ marginTop: '5%' }}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Quantidade de categorias de recursos:</Typography>
                        <Typography variant="h5">{reportData.qtdeCategoriaRecursos}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} style={{ marginTop: '5%' }}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Tipo de recurso mais frequente:</Typography>
                        {/* <Typography variant="h5">{reportData.tipoMaisFrequente.tipoRecurso} ({reportData.tipoMaisFrequente.total})</Typography> */}
                    </Paper>
                </Grid>
                <Grid item xs={6} style={{ marginTop: '5%' }}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Categoria de recurso mais frequente:</Typography>
                        {/* <Typography variant="h5">{reportData.categoriaMaisFrequente.categoriaRecurso} ({reportData.categoriaMaisFrequente.total})</Typography> */}
                    </Paper>
                </Grid>
            </Grid>

            {/* Seções de recursos por categoria */}
            {Object.keys(groupedRecursos).map(categoriaId => (
                <div key={categoriaId}>
                    <Typography variant="h5" style={{ textAlign: 'center', marginTop: '40px' }}>
                        Categoria: {groupedRecursos[categoriaId][0].categoria.categoriaRecurso}
                    </Typography>

                    <TableContainer style={{ width: '80%', margin: '2% auto' }}>
                        <Table sx={{ borderCollapse: 'collapse', textAlign: 'center' }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ border: '1px solid black', fontWeight: '900', textAlign: 'center' }}>Nome do Recurso</TableCell>
                                    <TableCell sx={{ border: '1px solid black', fontWeight: '900', textAlign: 'center' }}>Tipo de Recurso</TableCell>
                                    <TableCell sx={{ border: '1px solid black', fontWeight: '900', textAlign: 'center' }}>Quantidade</TableCell>
                                    <TableCell sx={{ border: '1px solid black', fontWeight: '900', textAlign: 'center' }}>Data de Cadastro</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {groupedRecursos[categoriaId].map((recurso, index) => (
                                    <TableRow key={index}>
                                        <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{recurso.nomeRecurso}</TableCell>
                                        <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{recurso.tipo.tipoRecurso}</TableCell>
                                        <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{recurso.quantidadeRecurso}</TableCell>
                                        <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{new Date(recurso.created_at).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            ))}

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

export default RecursoReport;
