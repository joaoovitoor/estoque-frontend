import styles from '../../_assets/css/generic.module.css';
import { Get } from '../../data/Verbs';
import { Loader } from '../loader/Loader';
import { RelatorioDetalhe } from './RelatorioDetalhe';
import { RelatorioLista } from './RelatorioLista';
import { useState, useEffect } from 'react';
import { ExportToExcel } from './ExportToExcel';

export function Relatorio() {
    const [fields, setFields] = useState({
        produto: '',
        estoqueminimo: false,
    });

    const [isLoading, setIsLoading] = useState(true);
    const [produtos, setProdutos] = useState([]);
    const [produto, setProduto] = useState({});
    const [detalhe, setDetalhe] = useState(false);

    const mostraDetalhe = (produto) => {
        setProduto(produto);
        setDetalhe(true);
    };

    const fecharDetalhe = () => {
        setDetalhe(false);
    };

    const handleFields = (_fields) => {
        setIsLoading(true);
        setFields(_fields);
    };

    const handleQuery = (_fields) => {
        let query = '';
        if (_fields.produto) {
            query += `&nome=${_fields.produto}`;
        }

        if (_fields.estoqueminimo) {
            query += `&estoqueminimo=${_fields.estoqueminimo}`;
        }

        return query;
    };

    useEffect(() => {
        const query = handleQuery(fields);
        const fetchProdutos = async () => {
            const dataProdutos = await Get(
                `${process.env.REACT_APP_API_URL}/produtos?${query ? `${query}` : `limit=10`}`,
            );

            setProdutos(dataProdutos);
            setIsLoading(false);
        };

        fetchProdutos();
    }, [fields, detalhe]);

    return (
        <div className={styles.container}>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    {detalhe === false ? (
                        <>
                            <ExportToExcel />

                            <RelatorioLista
                                produtos={produtos}
                                fields={fields}
                                handleDetalhe={mostraDetalhe}
                                handleFields={handleFields}
                            />
                        </>
                    ) : (
                        <RelatorioDetalhe produto={produto} handleFechar={fecharDetalhe} />
                    )}
                </>
            )}
        </div>
    );
}
