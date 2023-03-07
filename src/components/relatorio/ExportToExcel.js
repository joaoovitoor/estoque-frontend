import { useState } from 'react';
import { Button } from '@mui/material';
import { Loader } from '../loader/Loader';

export const ExportToExcel = () => {
    const [isLoading, setIsLoading] = useState(false);

    const fetchProdutos = async () => {
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_API_URL}/produtos/csv?limit=100`)
            .then((response) => response.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'produtos.csv';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);

                setIsLoading(false);
            })
            .catch((error) => console.error(error));
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
