export const formatarCPFBanco = (cpf) => {
    // Remove acentos e caracteres especiais
    cpf = cpf.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // Remove pontos e traços
    cpf = cpf.replace(/[.-]/g, '');

    return cpf;
};

export const formatarCPFTela = (cpf) => {
    // Remove pontos e traços
    cpf = cpf.replace(/[.-]/g, '');

    // Insere os pontos e traço na posição correta
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

    return cpf;
};

export const ordenarData = (produtos, campoData, ordem) => {
    const sortedProdutos = [...produtos].sort((produtoA, produtoB) => {
        const dataA = new Date(produtoA[campoData]).getTime();
        const dataB = new Date(produtoB[campoData]).getTime();
        return ordem === 'asc' ? dataA - dataB : dataB - dataA;
    });

    return sortedProdutos;
};
