import { useState } from 'react';
import { Button } from '@mui/material';
import { Loader } from '../loader/Loader';
import { Download } from '../../data/Verbs';

export const ExportToExcel = () => {
    const [isLoading, setIsLoading] = useState(false);

    const fetchProdutos = async () => {
        setIsLoading(true);

        const text = await Download(`${process.env.REACT_APP_API_URL}/produtos/csv`);
        const csvContent = `\uFEFF${text}`;
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');

        a.style.display = 'none';
        a.href = url;
        a.download = 'produtos.csv';

        document.body.appendChild(a);

        a.click();

        window.URL.revokeObjectURL(url);
        setIsLoading(false);
    };

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <Button variant='contained' onClick={fetchProdutos}>
                    Exportar Relatório CSV
                </Button>
            )}
        </>
    );
};
