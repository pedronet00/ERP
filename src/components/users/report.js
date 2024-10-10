import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, Typography, TableContainer, TableHead, TableRow, Paper, IconButton, Grid } from '@mui/material';import { IconPrinter } from '@tabler/icons-react';
import axios from 'axios';

const UserReport = () => {
    const [users, setUsers] = useState([]);
    const [reportData, setReportData] = useState({});
    
    // Função para buscar os usuários da API
    const fetchUsers = async () => {
        try {
            const idCliente = localStorage.getItem('idCliente'); // Pega o idCliente do localStorage
            const apiUrl = `http://localhost:8000/api/userReport?idCliente=${idCliente}`; // Monta a URL com o idCliente como parâmetro
            const response = await axios.get(apiUrl);
    
            // Armazena os usuários a partir do campo 'usuarios'
            setUsers(response.data.usuarios); 
            setReportData(response.data); // Armazena os dados do relatório
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        }
    };

    // Busca os usuários quando o componente for montado
    useEffect(() => {
        fetchUsers();
    }, []);

    // Função para impressão
    const handlePrint = () => {
        window.print();
    };

    return (
        <Paper className="relatorio" style={{ width: '80%', margin: 'auto' }}>
            <Typography variant="h4" gutterBottom style={{ textAlign: 'center', padding: '5% 0 0 0' }}>
                Relatório de Membros da Primeira Igreja Batista de Presidente Prudente
            </Typography>
            <Typography variant="h6" gutterBottom style={{ textAlign: 'center', fontWeight: '200' }}>
                Membros cadastrados entre 20/08/2024 e 04/10/2024
            </Typography>
            <IconButton onClick={handlePrint} aria-label="imprimir">
                <IconPrinter />
            </IconButton>


            <Grid container spacing={1} style={{ marginTop: '20px', width: '80%', margin: 'auto' }}>
                <Grid item xs={12}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Quantidade de usuários:</Typography>
                        <Typography variant="h5">{reportData.qtdeUsuarios}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} style={{marginTop: '5%'}}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Quantidade de usuários ativos:</Typography>
                        <Typography variant="h5">{reportData.qtdeUsuariosAtivos}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} style={{marginTop: '5%'}}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Quantidade de usuários inativos:</Typography>
                        <Typography variant="h5">{reportData.qtdeUsuariosInativos}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} style={{marginTop: '5%'}}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Quantidade de usuários comuns:</Typography>
                        <Typography variant="h5">{reportData.qtdeUsuariosComuns}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} style={{marginTop: '5%'}}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Quantidade de usuários líderes:</Typography>
                        <Typography variant="h5">{reportData.qtdeUsuariosLideres}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} style={{marginTop: '5%'}}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Quantidade de usuários pastores:</Typography>
                        <Typography variant="h5">{reportData.qtdeUsuariosPastores}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} style={{marginTop: '5%'}}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Quantidade de usuários administrador:</Typography>
                        <Typography variant="h5">{reportData.qtdeUsuariosAdm}</Typography>
                    </Paper>
                </Grid>
            </Grid>


            <TableContainer style={{ width: '80%', margin: '2% auto' }}>
                <Table sx={{ borderCollapse: 'collapse', textAlign: 'center' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ border: '1px solid black', fontWeight: '900', textAlign: 'center' }}>Nome</TableCell>
                            <TableCell sx={{ border: '1px solid black', fontWeight: '900', textAlign: 'center' }}>Data de nascimento</TableCell>
                            <TableCell sx={{ border: '1px solid black', fontWeight: '900', textAlign: 'center' }}>Nível do usuário</TableCell>
                            <TableCell sx={{ border: '1px solid black', fontWeight: '900', textAlign: 'center' }}>Data de cadastro</TableCell>
                            <TableCell sx={{ border: '1px solid black', fontWeight: '900', textAlign: 'center' }}>Status do usuário</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{user.name}</TableCell> {/* Corrigido */}
                                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{user.dataNascimentoUsuario}</TableCell> {/* Corrigido */}
                                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{user.nivel_usuario?.nivelUsuario || "N/A"}</TableCell> {/* Corrigido */}
                                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{user.usuarioAtivo === 0 ? "Inativo" : "Ativo"}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center" sx={{ border: '1px solid black' }}>
                                    Nenhum usuário encontrado.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Área de assinaturas */}
            <Grid container style={{ marginTop: '50px', textAlign: 'center', padding: '50px' }} spacing={4}>
                <Grid item xs={6}>
                    <Typography variant="h6" style={{ marginBottom: '40px', borderTop: '2px solid black' }}>
                    </Typography>
                    <Typography variant="body1">Pastor</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" style={{ marginBottom: '40px', borderTop: '2px solid black' }}>
                    </Typography>
                    <Typography variant="body1">Secretária</Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default UserReport;
