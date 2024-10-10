import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, Typography, TableContainer, TableHead, TableRow, Paper, IconButton, Grid } from '@mui/material';import { IconPrinter } from '@tabler/icons-react';
import axios from 'axios';

const Relatorio = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    // Função para buscar os usuários da API
    const fetchUsers = async () => {
        try {
            const idCliente = localStorage.getItem('idCliente'); // Pega o idCliente do localStorage
            const apiUrl = `http://localhost:8000/api/user?idCliente=${idCliente}`; // Monta a URL com o idCliente como parâmetro
            const response = await axios.get(apiUrl);
    
            setUsers(response.data); // Armazena os usuários
            setFilteredUsers(response.data); // Armazena os usuários filtrados (se necessário)
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

            <TableContainer style={{ width: '80%', margin: 'auto' }}>
                <Table sx={{ borderCollapse: 'collapse', textAlign: 'center' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ border: '1px solid black', fontWeight: '900', textAlign: 'center' }}>Nome</TableCell>
                            <TableCell sx={{ border: '1px solid black', fontWeight: '900', textAlign: 'center' }}>Data de nascimento</TableCell>
                            <TableCell sx={{ border: '1px solid black', fontWeight: '900', textAlign: 'center' }}>Nível do usuário</TableCell>
                            <TableCell sx={{ border: '1px solid black', fontWeight: '900', textAlign: 'center' }}>Data de Cadastro</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{user.name}</TableCell>
                                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{user.dataNascimentoUsuario}</TableCell>
                                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{user.nivel_usuario.nivelUsuario}</TableCell>
                                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center" sx={{ border: '1px solid black' }}>
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

export default Relatorio;
