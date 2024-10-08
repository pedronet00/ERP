import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';

const AuthRegister = ({ title, subtitle, subtext }) => {
    const [razaoSocialCliente, setRazaoSocialCliente] = useState('');
    const [dominioCliente, setDominioCliente] = useState('');
    const [emailCliente, setEmailCliente] = useState('');
    const [passwordCliente, setPasswordCliente] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/register', {
                razaoSocialCliente,
                dominioCliente,
                emailCliente,
                passwordCliente,
            });

            console.log("Response: " + response)

            if (response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Cadastro realizado com sucesso!',
                    text: 'Você será redirecionado para a tela de login.',
                    timer: 3000,
                    showConfirmButton: false,
                });

                setTimeout(() => {
                    navigate('/auth/login'); // Redirecionar para a tela de login após o Swal
                }, 3000);
            }
        } catch (error) {
            console.error('Erro ao registrar:', error);
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Não foi possível registrar o cliente. Tente novamente.',
            });
        }
    };

    return (
        <>
            {title ? (
                <Typography fontWeight="700" variant="h2" mb={1}>
                    {title}
                </Typography>
            ) : null}

            {subtext}

            <Box component="form" onSubmit={handleSubmit}>
                <Stack mb={3}>
                    <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        component="label"
                        htmlFor="razaoSocialCliente"
                        mb="5px"
                    >
                        Razão Social
                    </Typography>
                    <CustomTextField
                        id="razaoSocialCliente"
                        variant="outlined"
                        fullWidth
                        value={razaoSocialCliente}
                        onChange={(e) => setRazaoSocialCliente(e.target.value)}
                    />

                    <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        component="label"
                        htmlFor="dominioCliente"
                        mb="5px"
                        mt="25px"
                    >
                        Domínio
                    </Typography>
                    <CustomTextField
                        id="dominioCliente"
                        variant="outlined"
                        fullWidth
                        value={dominioCliente}
                        onChange={(e) => setDominioCliente(e.target.value)}
                    />

                    <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        component="label"
                        htmlFor="emailCliente"
                        mb="5px"
                        mt="25px"
                    >
                        Email
                    </Typography>
                    <CustomTextField
                        id="emailCliente"
                        type="email"
                        variant="outlined"
                        fullWidth
                        value={emailCliente}
                        onChange={(e) => setEmailCliente(e.target.value)}
                    />

                    <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        component="label"
                        htmlFor="passwordCliente"
                        mb="5px"
                        mt="25px"
                    >
                        Senha
                    </Typography>
                    <CustomTextField
                        id="passwordCliente"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={passwordCliente}
                        onChange={(e) => setPasswordCliente(e.target.value)}
                    />
                </Stack>
                <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    type="submit"
                >
                    Sign Up
                </Button>
            </Box>

            {subtitle}
        </>
    );
};

export default AuthRegister;
