import { CSVLink } from 'react-csv';
import { Button } from '@mui/material';

export const ExportToExcel = ({ jsonData }) => {
    let headers = [
        { label: 'Código', key: 'codigo' },
        { label: 'Produto', key: 'nome' },
        { label: 'Estoque Mínimo', key: 'estoqueminimo' },
        { label: 'Estoque Ideal', key: 'estoqueideal' },
        { label: 'Saldo', key: 'saldo' },
        { label: 'Providência', key: 'providencia' },
    ];

    return (
        <CSVLink data={jsonData} headers={headers} filename={'estoque.csv'}>
            <Button variant='contained'>Exportar para Excel</Button>
        </CSVLink>
    );
};
