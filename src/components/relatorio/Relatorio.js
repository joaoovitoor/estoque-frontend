import { useState, useEffect, useCallback } from 'react'
import { RelatorioDetalhe } from './RelatorioDetalhe'

import styles from '../../_assets/css/generic.module.css'
import { RelatorioLista } from './RelatorioLista'
import { Get } from '../../data/Verbs'

export const Relatorio = () => {
	const [query, setQuery] = useState('')
	const [produtos, setProdutos] = useState([])
	const [produto, setProduto] = useState({})
	const [detalhe, setDetalhe] = useState(false)

	const mostraDetalhe = (produto) => {
		setProduto(produto)
		setDetalhe(true)
	}

	const fecharDetalhe = () => {
		setDetalhe(false)
	}

	const handleFilter = useCallback(
		(produtoBusca, checkboxBusca) => {
			let handleQuery = ''
			if (produtoBusca) {
				handleQuery += `&nome=${produtoBusca}`
			}

			if (checkboxBusca) {
				handleQuery += `&estoqueminimo=${checkboxBusca}`
			}

			setQuery(handleQuery)
		},
		[],
	)

	useEffect(() => {
		const fetchProdutos = async () => {
			const dataProdutos = await Get(
				`${
					process.env.REACT_APP_API_URL
				}/produtos?limit=10${query && `${query}`}`,
			)

			setProdutos(dataProdutos)
		}

		fetchProdutos()
	}, [query, detalhe])

	return (
		<div className={styles.container}>
			{detalhe === false ? (
				<RelatorioLista
					produtos={produtos}
					handleDetalhe={mostraDetalhe}
					handleFilter={handleFilter}
				/>
			) : (
				<RelatorioDetalhe
					produto={produto}
					handleFechar={fecharDetalhe}
				/>
			)}
		</div>
	)
}
