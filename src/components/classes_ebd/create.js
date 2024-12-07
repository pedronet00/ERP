import React, { useState } from 'react';
import api from '../../axiosConfig';
import Swal from 'sweetalert2';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CriarClasseAula = () => {
    const [nomeClasse, setNomeClasse] = useState('');
    const [quantidadeMembros, setQuantidadeMembros] = useState('');
    const idCliente = localStorage.getItem('idCliente'); // Supondo que o idCliente esteja no localStorage
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const classeData = {
            nomeClasse,
            quantidadeMembros: parseInt(quantidadeMembros), // Certifique-se de que é um número
            idCliente
        };

        try {
            await api.post('http://localhost:8000/api/classesEBD', classeData);
            Swal.fire(
                'Classe Criada!',
                'A classe foi criada com sucesso.',
                'success'
            );

            // Limpa os campos após o sucesso
            setNomeClasse('');
            setQuantidadeMembros('');
            navigate('/dashboard/classesEBD'); // Navegue de volta para a lista de classes (ajuste a rota conforme necessário)
        } catch (error) {
            if (error.response && error.response.data.error) {
                Swal.fire(
                    'Erro!',
                    error.response.data.error,
                    'error'
                );
            } else {
                Swal.fire(
                    'Erro!',
                    'Houve um problema ao criar a classe.',
                    'error'
                );
            }
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ marginTop: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Criar Nova Classe de Aula
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Nome da Classe"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={nomeClasse}
                        onChange={(e) => setNomeClasse(e.target.value)}
                        required
                    />

                    <TextField
                        label="Quantidade de Membros"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="number"
                        value={quantidadeMembros}
                        onChange={(e) => setQuantidadeMembros(e.target.value)}
                        required
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        sx={{ marginTop: 2 }}
                    >
                        Criar Classe
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default CriarClasseAula;
