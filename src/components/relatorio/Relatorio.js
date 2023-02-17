import { useState, useEffect } from 'react'
import { RelatorioDetalhe } from './RelatorioDetalhe'

import styles from '../../_assets/css/generic.module.css'
import { RelatorioLista } from './RelatorioLista'

export const Relatorio = () => {
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

	const fetchData = async (url) => {
		const response = await fetch(url)
		const responseJson = await response.json()

		return responseJson
	}

	useEffect(() => {
		const handleProdutos = async () => {
			const [dataMovimentacoes, dataProdutos] = await Promise.all([
				fetchData('http://localhost:5000/movimentacoes'),
				fetchData('http://localhost:5000/produtos'),
			])

			if (dataProdutos.length > 0) {
				let produtosTratado = dataProdutos.map((produto) => {
					let estoqueideal = produto.estoqueminimo * 5
					let saldo = dataMovimentacoes
						.filter(
							(movimentacao) =>
								movimentacao.produto === produto.id
						)
						.reduce((saldoAcumulado, movimentacao) => {
							return movimentacao.movementType === 'entrada'
								? (saldoAcumulado += parseInt(
										movimentacao.quantidade
								  ))
								: (saldoAcumulado -= parseInt(
										movimentacao.quantidade
								  ))
						}, 0)

					return { ...produto, estoqueideal, saldo }
				})

				setProdutos(produtosTratado)
			}
		}

		handleProdutos()
	}, [])

	return (
		<div className={styles.container}>
			{detalhe === false ? (
				<RelatorioLista
					produtos={produtos}
					handleDetalhe={mostraDetalhe}
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
