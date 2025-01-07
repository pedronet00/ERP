import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, Typography, TableContainer, TableHead, TableRow, Paper, IconButton, Grid } from '@mui/material';
import { IconPrinter, IconArrowLeft } from '@tabler/icons-react';
import api from '../../axiosConfig';
import { useNavigate, useLocation } from 'react-router-dom';

const DepartamentoReport = () => {
    const [departamentos, setDepartamentos] = useState([]);
    const [reportData, setReportData] = useState({});
    const [dataInicial, setDataInicial] = useState('');
    const [dataFinal, setDataFinal] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    // Função para formatar a data para o formato DD/MM/YYYY
    const formatDate = (dateString) => {
        // Extrai os componentes da data
        const [year, month, day] = dateString.split('-').map(Number);
      
        // Cria a data no horário local
        const date = new Date(year, month - 1, day); // `month` começa em 0 no JS
      
        // Formata a data no formato DD/MM/YYYY
        const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
        return formattedDate;
      };
      

    // Função para buscar os departamentos da API com datas
    const fetchDepartamentos = async (dataInicial, dataFinal) => {
        try {
            const idCliente = localStorage.getItem('idCliente'); // Pega o idCliente do localStorage
            const apiUrl = `http://localhost:8000/api/departamentoReport?idCliente=${idCliente}&dataInicial=${dataInicial}&dataFinal=${dataFinal}`; // Monta a URL com as datas e o idCliente
            const response = await api.get(apiUrl);

            // Armazena os departamentos e os dados do relatório
            setDepartamentos(response.data.departamentos); 
            setReportData(response.data); // Armazena os dados do relatório
        } catch (error) {
            console.error("Erro ao buscar departamentos:", error);
        }
    };

    // Obtém as datas da URL e formata elas
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search); // Pega os parâmetros da URL
        const dataInicial = queryParams.get('dataInicial');
        const dataFinal = queryParams.get('dataFinal');

        if (dataInicial && dataFinal) {
            setDataInicial(formatDate(dataInicial)); // Formata dataInicial
            setDataFinal(formatDate(dataFinal)); // Formata dataFinal
            fetchDepartamentos(dataInicial, dataFinal); // Chama a função com as datas
        }
    }, [location.search]); // O hook vai ser executado sempre que a URL mudar

    // Função para impressão
    const handlePrint = () => {
        window.print();
    };

    const handleGoBack = () => {
        navigate(-1); // Volta para a tela anterior
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
                Relatório de Departamentos da Primeira Igreja Batista de Presidente Prudente
            </Typography>
            <Typography variant="h6" gutterBottom style={{ textAlign: 'center', fontWeight: '200' }}>
                Departamentos cadastrados entre {dataInicial} e {dataFinal}
            </Typography>

            <IconButton onClick={handlePrint} aria-label="imprimir" className="no-print">
                <IconPrinter />
            </IconButton>

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

export default DepartamentoReport;
