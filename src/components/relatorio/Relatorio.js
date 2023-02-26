import { useState, useEffect } from 'react'

import styles from '../../_assets/css/generic.module.css'
import { Get } from '../../data/Verbs'
import { Loader } from '../loader/Loader'
import { RelatorioDetalhe } from './RelatorioDetalhe'
import { RelatorioLista } from './RelatorioLista'

export const Relatorio = () => {
	const [fields, setFields] = useState({
		produto: '',
		checkbox: false,
	})

	const [isLoading, setIsLoading] = useState(true)
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

	const handleFields = (_fields) => {
		setFields(_fields)
	}

	const handleQuery = (_fields) => {
		let query = ''
		if (_fields.produto) {
			query += `&nome=${_fields.produto}`
		}

		if (_fields.checkbox) {
			query += `&estoqueminimo=${_fields.checkbox}`
		}

		return query
	}

	useEffect(() => {
		const query = handleQuery(fields)
		const fetchProdutos = async () => {
			const dataProdutos = await Get(
				`${
					process.env.REACT_APP_API_URL
				}/produtos?limit=10${query && `${query}`}`,
			)

			setProdutos(dataProdutos)
			setIsLoading(false)
		}

		fetchProdutos()
	}, [fields, detalhe])

	return (
		<div className={styles.container}>
			{isLoading ? (
				<Loader />
			) : (
				<>
					{detalhe === false ? (
						<RelatorioLista
							produtos={produtos}
							fields={fields}
							handleDetalhe={mostraDetalhe}
							handleFields={handleFields}
						/>
					) : (
						<RelatorioDetalhe
							produto={produto}
							handleFechar={fecharDetalhe}
						/>
					)}
				</>
			)}
		</div>
	)
}
