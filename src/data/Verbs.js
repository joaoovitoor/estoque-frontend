export const Get = async (url) => {
    const response = await fetch(url, {
        headers: {
            Authorization: process.env.REACT_APP_TOKEN,
        },
    });

    if (!response.ok) {
        throw new Error('Erro ao processar fetch');
    }

    return response.json();
};

export const Download = async (url) => {
    const response = await fetch(url, {
        headers: {
            Authorization: process.env.REACT_APP_TOKEN,
        },
    });

    if (!response.ok) {
        throw new Error('Erro ao processar fetch');
    }

    return response.text();
};

export const Excluir = async (url) => {
    const response = await fetch(url, {
        headers: {
            Authorization: process.env.REACT_APP_TOKEN,
        },
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Erro ao processar fetch');
    }

    return response.json();
};

export const Post = async (url, data) => {
    delete data._id;
    const response = await fetch(url, {
        method: 'POST',
        headers: { Authorization: process.env.REACT_APP_TOKEN, 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Erro ao processar fetch');
    }

    return response.json();
};

export const Patch = async (url, data) => {
    const response = await fetch(url, {
        method: 'PATCH',
        headers: { Authorization: process.env.REACT_APP_TOKEN, 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Erro ao processar fetch');
    }

    return response.json();
};

export const calcularSaldo = async (produto) => {
    const data = await Get(`${process.env.REACT_APP_API_URL}/movimentacoes?produto=${produto._id}`);

    let saldoAtual = 0;
    for (let movimentacao of data) {
        const { quantidade, movementType } = movimentacao;
        saldoAtual =
            movementType === 'entrada'
                ? Number(saldoAtual) + Number(quantidade)
                : Number(saldoAtual) - Number(quantidade);
    }

    console.log({ saldoAtual, data });

    return saldoAtual;
};
