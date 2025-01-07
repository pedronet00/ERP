import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, Typography, TableContainer, TableHead, TableRow, Paper, IconButton, Grid } from '@mui/material';
import { IconPrinter, IconArrowLeft } from '@tabler/icons-react';
import api from '../../axiosConfig';
import { useNavigate, useLocation } from 'react-router-dom';

const MissoesReport = () => {
    const [missoes, setMissoes] = useState([]);
    const [reportData, setReportData] = useState({});
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const dataInicial = params.get('dataInicial');
    const dataFinal = params.get('dataFinal');
    
    // Função para buscar os usuários da API
    const fetchMissoes = async () => {
        try {
            const idCliente = localStorage.getItem('idCliente'); // Pega o idCliente do localStorage
            const apiUrl = `http://localhost:8000/api/missoesReport?dataInicial=${dataInicial}&dataFinal=${dataFinal}&idCliente=${idCliente}`; // Monta a URL com o idCliente como parâmetro
            const response = await api.get(apiUrl);
    
            // Armazena os usuários a partir do campo 'usuarios'
            setMissoes(response.data.missoes); 
            setReportData(response.data); // Armazena os dados do relatório
        } catch (error) {
            console.error("Erro ao buscar missões:", error);
        }
    };

    // Busca os usuários quando o componente for montado
    useEffect(() => {
        fetchMissoes();
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
                Relatório de Missões da Primeira Igreja Batista de Presidente Prudente
            </Typography>
            <Typography variant="h6" gutterBottom style={{ textAlign: 'center', fontWeight: '200' }}>
                Missões cadastradas entre {new Date(dataInicial).toLocaleDateString('pt-BR', { timeZone: 'UTC' })} e {new Date(dataFinal).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
            </Typography>

            {/* Ícone de impressão */}
            <IconButton onClick={handlePrint} aria-label="imprimir" className="no-print">
                <IconPrinter />
            </IconButton>

            {/* Estatísticas do relatório */}
            <Grid container spacing={1} style={{ marginTop: '20px', width: '80%', margin: 'auto' }}>
                <Grid item xs={6}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Quantidade de missões:</Typography>
                        <Typography variant="h5">{reportData.qtdeMissoes}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Membros de missões:</Typography>
                        <Typography variant="h5">{reportData.qtdeMembrosMissoes}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} style={{marginTop: '5%'}}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Quantidade de missões ativas:</Typography>
                        <Typography variant="h5">{reportData.qtdeMissoesAtivas}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} style={{marginTop: '5%'}}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Quantidade de missões inativas:</Typography>
                        <Typography variant="h5">{reportData.qtdeMissoesInativas}</Typography>
                    </Paper>
                </Grid>
                
            </Grid>

            {/* Tabela de missões */}
            <TableContainer style={{ width: '90%', margin: '2% auto' }}>
                <Table sx={{ borderCollapse: 'collapse', textAlign: 'center' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ border: '1px solid black', fontWeight: '900', textAlign: 'center' }}>Nome</TableCell>
                            <TableCell sx={{ border: '1px solid black', fontWeight: '900', textAlign: 'center' }}>Membros</TableCell>
                            <TableCell sx={{ border: '1px solid black', fontWeight: '900', textAlign: 'center' }}>Cidade</TableCell>
                            <TableCell sx={{ border: '1px solid black', fontWeight: '900', textAlign: 'center' }}>Pastor titular</TableCell>
                            <TableCell sx={{ border: '1px solid black', fontWeight: '900', textAlign: 'center' }}>Status</TableCell>
                            <TableCell sx={{ border: '1px solid black', fontWeight: '900', textAlign: 'center' }}>Data de cadastro</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {missoes.length > 0 ? (
                            missoes.map((missao, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{missao.nomeMissao}</TableCell>
                                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{missao.quantidadeMembros}</TableCell>
                                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{missao.cidadeMissao}</TableCell>
                                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{missao.pastor_titular.name}</TableCell>
                                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{missao.statusMissao === 0 ? "Inativo" : "Ativo"}</TableCell>
                                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{new Date(missao.created_at).toLocaleDateString()}</TableCell>
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
