import styles from '../../_assets/css/generic.module.css';
import { mensagemVazio, showMessage } from '../../data/Interfaces';
import { Excluir, Get, Patch, Post } from '../../data/Verbs';
import { Message } from '../Message';
import { Loader } from '../loader/Loader';
import { Usuario } from './Usuario';
import { UsuariosLista } from './UsuariosLista';
import { AddCircle } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

export function Usuarios() {
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState(mensagemVazio);
    const [usuarios, setUsuarios] = useState([]);
    const [abreUsuario, setAbreUsuario] = useState({
        status: false,
        usuario: {
            _id: '0',
        },
    });

    const salvarUsuario = async (usuario) => {
        const url = `${process.env.REACT_APP_API_URL}/usuarios`;
        let message = 'Usuário inserido com sucesso';

        try {
            if (usuario._id === '0') {
                usuario._id = uuid();
                await Post(url, usuario);
            } else {
                await Patch(`${url}/${usuario._id}`, usuario);
                message = 'Usuário alterado com sucesso';
            }

            closeUsuario();
            showMessage(
                {
                    variant: 'success',
                    message,
                },
                setMessage,
            );
        } catch (error) {
            closeUsuario();
            showMessage(
                {
                    variant: 'warning',
                    message: error.message,
                },
                setMessage,
            );
        }
    };

    const ExcluirUsuario = async (usuario) => {
        try {
            await Excluir(`${process.env.REACT_APP_API_URL}/usuarios/${usuario._id}`);

            closeUsuario();
            showMessage(
                {
                    variant: 'warning',
                    message: 'Usuário excluido com sucesso',
                },
                setMessage,
            );
        } catch (error) {
            closeUsuario();

            showMessage(
                {
                    variant: 'error',
                    message: error.message,
                },
                setMessage,
            );
        }
    };

    const openUsuario = (_usuario) => {
        setAbreUsuario({
            status: true,
            usuario: _usuario,
        });
    };

    const closeUsuario = () => {
        setAbreUsuario({
            status: false,
            usuario: {
                _id: '0',
            },
        });
    };

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await Get(`${process.env.REACT_APP_API_URL}/usuarios`);

            setUsuarios(data);
            setIsLoading(false);
        };

        fetchUsers();
    }, [abreUsuario]);

    return (
        <div className={styles.container}>
            {message.message && <Message variant={message.variant} message={message.message} />}

            {isLoading ? (
                <Loader />
            ) : abreUsuario.status ? (
                <Usuario
                    usuario={abreUsuario.usuario}
                    className={styles.container}
                    handleSalvar={salvarUsuario}
                    handleFechar={closeUsuario}
                />
            ) : (
                <>
                    <Button
                        variant='contained'
                        usuario={abreUsuario.usuario}
                        onClick={() =>
                            openUsuario({
                                _id: '0',
                            })
                        }
                        startIcon={<AddCircle />}
                        sx={{ mt: 1, mb: 1 }}
                    >
                        Adicionar
                    </Button>

                    <UsuariosLista
                        usuarios={usuarios}
                        handleEditar={openUsuario}
                        handleExcluir={ExcluirUsuario}
                    />
                </>
            )}
        </div>
    );
}
