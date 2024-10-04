import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { IconMinus, IconPrinter, IconPlus, IconTrash, IconClipboard } from '@tabler/icons-react';


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
        <Paper className="relatorio">
            <IconButton onClick={handlePrint} aria-label="imprimir">
                <IconPrinter />
            </IconButton>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Coluna 1</TableCell>
                            <TableCell>Coluna 2</TableCell>
                            <TableCell>Coluna 3</TableCell>
                            <TableCell>Coluna 4</TableCell>
                            <TableCell>Coluna 5</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dados.map((linha, index) => (
                            <TableRow key={index}>
                                <TableCell>{linha.coluna1}</TableCell>
                                <TableCell>{linha.coluna2}</TableCell>
                                <TableCell>{linha.coluna3}</TableCell>
                                <TableCell>{linha.coluna4}</TableCell>
                                <TableCell>{linha.coluna5}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default Relatorio;
