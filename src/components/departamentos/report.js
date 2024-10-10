import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, Typography, TableContainer, TableHead, TableRow, Paper, IconButton, Grid } from '@mui/material';
import { IconPrinter, IconArrowLeft } from '@tabler/icons-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DepartamentoReport = () => {
    const [departamentos, setDepartamentos] = useState([]);
    const [reportData, setReportData] = useState({});
    const navigate = useNavigate();
    
    // Função para buscar os usuários da API
    const fetchDepartamentos = async () => {
        try {
            const idCliente = localStorage.getItem('idCliente'); // Pega o idCliente do localStorage
            const apiUrl = `http://localhost:8000/api/departamentoReport?idCliente=${idCliente}`; // Monta a URL com o idCliente como parâmetro
            const response = await axios.get(apiUrl);
    
            // Armazena os usuários a partir do campo 'usuarios'
            setDepartamentos(response.data.departamentos); 
            setReportData(response.data); // Armazena os dados do relatório
        } catch (error) {
            console.error("Erro ao buscar departamentos:", error);
        }
    };

    // Busca os usuários quando o componente for montado
    useEffect(() => {
        fetchDepartamentos();
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
                Relatório de Departamentos da Primeira Igreja Batista de Presidente Prudente
            </Typography>
            <Typography variant="h6" gutterBottom style={{ textAlign: 'center', fontWeight: '200' }}>
                Departamentos cadastrados entre 20/08/2024 e 04/10/2024
            </Typography>

            {/* Ícone de impressão */}
            <IconButton onClick={handlePrint} aria-label="imprimir" className="no-print">
                <IconPrinter />
            </IconButton>

            {/* Estatísticas do relatório */}
            <Grid container spacing={1} style={{ marginTop: '20px', width: '80%', margin: 'auto' }}>
                <Grid item xs={12}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Quantidade de departamentos:</Typography>
                        <Typography variant="h5">{reportData.qtdeDepartamentos}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} style={{marginTop: '5%'}}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Quantidade de departamentos ativos:</Typography>
                        <Typography variant="h5">{reportData.qtdeDepartamentosAtivos}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} style={{marginTop: '5%'}}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Quantidade de departamentos inativos:</Typography>
                        <Typography variant="h5">{reportData.qtdeDepartamentosInativos}</Typography>
                    </Paper>
                </Grid>
                
            </Grid>

            {/* Tabela de usuários */}
            <TableContainer style={{ width: '80%', margin: '2% auto' }}>
                <Table sx={{ borderCollapse: 'collapse', textAlign: 'center' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ border: '1px solid black', fontWeight: '900', textAlign: 'center' }}>Nome</TableCell>
                            <TableCell sx={{ border: '1px solid black', fontWeight: '900', textAlign: 'center' }}>Data de cadastro</TableCell>
                            <TableCell sx={{ border: '1px solid black', fontWeight: '900', textAlign: 'center' }}>Status do departamento</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {departamentos.length > 0 ? (
                            departamentos.map((departamento, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{departamento.tituloDepartamento}</TableCell>
                                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{new Date(departamento.created_at).toLocaleDateString()}</TableCell>
                                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{departamento.statusDepartamento === 0 ? "Inativo" : "Ativo"}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center" sx={{ border: '1px solid black' }}>
                                    Nenhum departamento encontrado.
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

export default DepartamentoReport;
