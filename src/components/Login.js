import { AuthContext } from '../contexts/AuthContext';
import { mensagemVazio, showMessage } from '../data/Interfaces';
import { formatarCPFBanco } from '../data/Utils';
import { Message } from './Message';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useContext, useState } from 'react';
import InputMask from 'react-input-mask';

const theme = createTheme();

export const Login = () => {
    const { login } = useContext(AuthContext);
    const [message, setMessage] = useState(mensagemVazio);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const data = new FormData(event.currentTarget);

            await login(formatarCPFBanco(data.get('cpf')), data.get('password'));
        } catch (error) {
            showMessage(
                {
                    variant: 'warning',
                    message: error.message,
                },
                setMessage,
            );
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid
                container
                component='main'
                sx={{
                    height: '100vh',
                    backgroundColor: '#FFFFFF',
                }}
            >
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage:
                            'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxZMdv6c5glg0Tb2MDIa4MncU0KnjQkQp4DQ&usqp=CAU)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[0] : t.palette.grey[900],
                        backgroundSize: '30% ',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Avatar
                            sx={{
                                m: 1,
                                bgcolor: 'primary.main',
                            }}
                        >
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component='h1' variant='h5'>
                            Sign in
                        </Typography>
                        <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            {message.message && (
                                <Message variant={message.variant} message={message.message} />
                            )}

                            <InputMask
                                mask='999.999.999-99'
                                required
                                fullWidth
                                name='cpf'
                                id='cpf'
                                label='CPF'
                                autoComplete='CPF'
                                margin='normal'
                            >
                                {(inputProps) => <TextField {...inputProps} />}
                            </InputMask>
                            <TextField
                                margin='normal'
                                required
                                fullWidth
                                name='password'
                                label='Password'
                                type='password'
                                id='password'
                                autoComplete='current-password'
                            />
                            <FormControlLabel
                                control={<Checkbox value='remember' color='primary' />}
                                label='Remember me'
                            />
                            <Button
                                type='submit'
                                fullWidth
                                variant='contained'
                                color='primary'
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href='#' variant='body2'>
                                        Forgot password?
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};
