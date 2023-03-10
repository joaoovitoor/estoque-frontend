import { showMessage, mensagemVazio } from '../../data/Interfaces';
import { Get, Excluir, Patch, calcularSaldo } from '../../data/Verbs';
import { Message } from '../Message';
import { Loader } from '../loader/Loader';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import { IconButton } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';

export const RelatorioDetalhe = ({ produto, handleFechar }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState(mensagemVazio);
    const [history, setHistory] = useState([]);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#424242',
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const ExcluirMovimentacao = async (movimentacao, produto) => {
        console.log(produto);
        try {
            await Excluir(`${process.env.REACT_APP_API_URL}/movimentacoes/${movimentacao._id}`);

            const saldoAtualizado = await calcularSaldo(produto);
            const produtoBanco = {
                ...produto,
                saldo: saldoAtualizado,
            };

            await Patch(`${process.env.REACT_APP_API_URL}/produtos/${produto._id}`, produtoBanco);

            showMessage(
                {
                    variant: 'success',
                    message: 'Movimentação excluida com sucesso!',
                },
                setMessage,
            );
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

    useEffect(() => {
        const handleProdutos = async () => {
            const data = await Get(
                `${process.env.REACT_APP_API_URL}/movimentacoes?produto=${produto._id}`,
            );

            setHistory(data);
            setIsLoading(false);
        };

        handleProdutos();
    }, [produto._id, message]);

    return (
        <>
            {message.message && (
                <>
                    <Message variant={message.variant} message={message.message} />

                    <br />
                </>
            )}

            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <Button
                        type='button'
                        fullWidth
                        variant='contained'
                        color='warning'
                        sx={{ mt: 0, mb: 2 }}
                        onClick={() => handleFechar(false)}
                    >
                        Voltar
                    </Button>

                    <TableContainer component={Paper} sx={{ marginTop: '2px' }}>
                        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Tipo</StyledTableCell>
                                    <StyledTableCell>Produto</StyledTableCell>
                                    <StyledTableCell>Quantidade</StyledTableCell>
                                    <StyledTableCell>Data</StyledTableCell>
                                    <StyledTableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {history.map((movimentacao) => (
                                    <TableRow
                                        key={movimentacao._id}
                                        sx={{
                                            '&:last-child td, &:last-child th': {
                                                border: 0,
                                            },
                                        }}
                                    >
                                        <TableCell component='th' scope='row'>
                                            {movimentacao.movementType}
                                        </TableCell>
                                        <TableCell>{movimentacao.nome}</TableCell>
                                        <TableCell>{movimentacao.quantidade}</TableCell>
                                        <TableCell>{movimentacao.date}</TableCell>
                                        <TableCell component='th' align='right'>
                                            <IconButton
                                                aria-label='delete'
                                                size='small'
                                                onClick={() =>
                                                    ExcluirMovimentacao(movimentacao, produto)
                                                }
                                            >
                                                <DeleteIcon fontSize='small' />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}
        </>
    );
};
