import React, { useState } from 'react';
import {
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Button,
    Stack,
    Checkbox,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importando o Swal para alertas

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';

const AuthLogin = ({ title, subtitle, subtext }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Limpa mensagens de erro anteriores

        try {
            const response = await axios.post('http://localhost:8000/api/login', {
                emailCliente: email,
                passwordCliente: password,
            });

            if (response.status === 200) {
                const subdominio = response.data.subdominio;

                // Armazenando email no localStorage (caso necessário)
                localStorage.setItem('email', email);

                Swal.fire({
                    icon: 'success',
                    title: 'Login realizado com sucesso!',
                    text: `Redirecionando para ${subdominio}...`,
                    timer: 2000,
                    showConfirmButton: false,
                });

                // Redireciona o usuário para o subdomínio retornado pela API
                setTimeout(() => {
                    window.location.href = `http://${subdominio}`;
                }, 2000); // Aguarda 2 segundos antes do redirecionamento
            }
        } catch (error) {
            setError('Email ou senha incorretos.');
            console.error('Erro ao fazer login:', error);
            Swal.fire({
                icon: 'error',
                title: 'Erro ao fazer login',
                text: 'Email ou senha incorretos.',
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

            <form onSubmit={handleLogin}>
                <Stack>
                    <Box>
                        <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            component="label"
                            htmlFor="email"
                            mb="5px"
                        >
                            Email
                        </Typography>
                        <CustomTextField
                            id="email"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Box>
                    <Box mt="25px">
                        <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            component="label"
                            htmlFor="password"
                            mb="5px"
                        >
                            Senha
                        </Typography>
                        <CustomTextField
                            id="password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Box>
                    <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Lembrar deste dispositivo"
                            />
                        </FormGroup>
                        <Typography
                            component={Link}
                            to="/"
                            fontWeight="500"
                            sx={{
                                textDecoration: 'none',
                                color: 'primary.main',
                            }}
                        >
                            Esqueceu a senha?
                        </Typography>
                    </Stack>
                </Stack>
                <Box>
                    <Button
                        color="primary"
                        variant="contained"
                        size="large"
                        fullWidth
                        type="submit"
                    >
                        Entrar
                    </Button>
                </Box>
                {error && <Typography color="error">{error}</Typography>}
                {subtitle}
            </form>
        </>
    );
};

export default AuthLogin;
