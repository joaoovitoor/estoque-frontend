export const usuarioVazio = {
    id: 0,
    nome: '',
    telefone: '',
    cpf: '',
    senha: '',
}

export const mensagemVazio = {
    variant: '',
    message: '',
}

export const showMessage = ({ variant, message }, setMessage) => {
    setMessage({ variant, message })

    setTimeout(() => {
        setMessage(mensagemVazio)
    }, 3000)
}

export const produtoVazio = {
    id: 0,
    codigo: '',
    nome: '',
    estoqueminimo: 0,
}

export const produtoVazioMovimentacao = {
    id: null,
    label: null,
}

export const providenciaVazio = {
    status: false,
    produto: ''
}
