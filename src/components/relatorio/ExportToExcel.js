import { useState, useEffect, useRef } from 'react';
import { CSVLink } from 'react-csv';
import { Button } from '@mui/material';
import { Get } from '../../data/Verbs';
import { Loader } from '../loader/Loader';

export const ExportToExcel = () => {
    const [jsonData, setJsonData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const csvLinkRef = useRef(null);

    const fetchProdutos = async () => {
        setIsLoading(true);
        const dataProdutos = await Get(`${process.env.REACT_APP_API_URL}/produtos`);
        setIsLoading(false);
        setJsonData(dataProdutos);
    };

    let headers = [
        { label: 'Código', key: 'codigo' },
        { label: 'Produto', key: 'nome' },
        { label: 'Estoque Mínimo', key: 'estoqueminimo' },
        { label: 'Estoque Ideal', key: 'estoqueideal' },
        { label: 'Saldo', key: 'saldo' },
        { label: 'Providência', key: 'providencia' },
    ];

    const generateCSV = () => {
        csvLinkRef.current.link.click();
    };

    useEffect(() => {
        if (jsonData.length > 0) {
            generateCSV();
        }
    }, [jsonData]);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <Button variant='contained' onClick={fetchProdutos}>
                    Exportar Relatório CSV
                </Button>
            )}

            <CSVLink
                data={jsonData}
                headers={headers}
                filename={'estoque.csv'}
                separator={';'}
                ref={csvLinkRef}
                target='_blank'
                style={{ display: 'none' }}
            >
                Gerar Excel
            </CSVLink>
        </>
    );
};
