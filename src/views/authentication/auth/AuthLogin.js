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
            const response = await axios.post('https://apoleon.com.br/api-estagio/public/api/login', {
                email,
                password,
            });

            if (response.status === 200) {
                const nivelUsuario = response.data.nivelUsuario; // Supondo que o nível do usuário vem na resposta
                localStorage.setItem('email', email);
                localStorage.setItem('nivelUsuario', nivelUsuario);
                navigate('/'); // Redireciona para a página inicial
            }
        } catch (error) {
            setError('Email ou senha incorretos.');
            console.error('Erro ao fazer login:', error);
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
                            htmlFor="username"
                            mb="5px"
                        >
                            Email
                        </Typography>
                        <CustomTextField
                            id="username"
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
