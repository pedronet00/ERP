import React from 'react';
import { Table, TableBody, TableCell, Typography, TableContainer, TableHead, TableRow, Paper, IconButton, Card, CardContent, Grid } from '@mui/material';
import { IconPrinter } from '@tabler/icons-react';

const Relatorio = () => {
    const dados = [
        { coluna1: 'Dado 1', coluna2: 'Dado 2', coluna3: 'Dado 3', coluna4: 'Dado 4', coluna5: 'Dado 5' },
        { coluna1: 'Dado 6', coluna2: 'Dado 7', coluna3: 'Dado 8', coluna4: 'Dado 9', coluna5: 'Dado 10' },
        { coluna1: 'Dado 11', coluna2: 'Dado 12', coluna3: 'Dado 13', coluna4: 'Dado 14', coluna5: 'Dado 15' },
    ];

    const handlePrint = () => {
        window.print();
    };

    return (
        <Paper className="relatorio" style={{ width: '80%', margin: 'auto', backgroundColor: 'rgb(4 5 6)' }}>
            <Typography variant="h4" gutterBottom style={{ textAlign: 'center', padding: '5% 0 0 0' }}>
                Relatório de Membros da Primeira Igreja Batista de Presidente Prudente
            </Typography>
            <Typography variant="h6" gutterBottom style={{ textAlign: 'center', fontWeight: '200' }}>
                Membros cadastrados entre 20/08/2024 e 04/10/2024
            </Typography>
            <IconButton onClick={handlePrint} aria-label="imprimir">
                <IconPrinter />
            </IconButton>
            
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={4} display="flex">
                    <Card sx={{ flexGrow: 1, margin: '16px', boxShadow: 3 }}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Typography variant="h5" component="div">
                                Quantidade de novos registros: <span style={{ fontWeight: 'bold' }}>20</span>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lorem ipsum sit dolor amet
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} display="flex">
                    <Card sx={{ flexGrow: 1, margin: '16px', boxShadow: 3 }}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Typography variant="h5" component="div">
                                Média de idade: <span style={{ fontWeight: 'bold' }}>39 anos</span>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lorem ipsum sit dolor amet
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} display="flex">
                    <Card sx={{ flexGrow: 1, margin: '16px', boxShadow: 3 }}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Typography variant="h5" component="div">
                                Mês com mais registros: <span style={{ fontWeight: 'bold' }}>Setembro</span>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lorem ipsum sit dolor amet
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <TableContainer style={{ width: '80%', margin: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>Idade</TableCell>
                            <TableCell>Data de Cadastro</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dados.map((linha, index) => (
                            <TableRow key={index}>
                                <TableCell>{linha.coluna1}</TableCell>
                                <TableCell>{linha.coluna2}</TableCell>
                                <TableCell>{linha.coluna3}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default Relatorio;
