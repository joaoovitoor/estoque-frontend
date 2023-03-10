export const mensagemVazio = {
    variant: '',
    message: '',
};

export const showMessage = ({ variant, message }, setMessage) => {
    setMessage({ variant, message });

    setTimeout(() => {
        setMessage(mensagemVazio);
    }, 3000);
};

export const produtoVazio = {
    _id: '0',
    codigo: '',
    nome: '',
    estoqueminimo: 0,
};

export const produtoVazioMovimentacao = {
    id: '0',
    label: null,
    saldo: 0,
};

export const providenciaVazio = {
    status: false,
    produto: '',
};
