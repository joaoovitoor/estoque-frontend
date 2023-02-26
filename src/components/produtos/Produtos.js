import { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import { AddCircle } from '@mui/icons-material'
import { Produto } from './Produto'
import { ProdutosLista } from './ProdutosLista'
import { Message } from '../Message'
import { v4 as uuid } from 'uuid'
import { Excluir, Get, Patch, Post } from '../../data/Verbs'
import { ordenarData } from '../../data/Utils'
import { Loader } from '../loader/Loader'
import {
	produtoVazio,
	mensagemVazio,
	showMessage,
} from '../../data/Interfaces'

import styles from '../../_assets/css/generic.module.css'

export const Produtos = () => {
	const [query, setQuery] = useState('')
	const [isLoading, setIsLoading] = useState(true)
	const [message, setMessage] = useState(mensagemVazio)
	const [produtos, setProdutos] = useState([])
	const [abreProduto, setAbreProduto] = useState({
		status: false,
		produto: produtoVazio,
	})

	const salvarProduto = async (produto) => {
		let url = `${process.env.REACT_APP_API_URL}/produtos`
		let message = 'Produto inserido com sucesso'

		try {
			if (produto._id === '0') {
				produto._id = uuid()
				await Post(url, produto)
			} else {
				await Patch(
					`${url}/${produto._id}`,
					produto,
				)
				message = 'Produto alterado com sucesso'
			}

			closeProduto()

			showMessage(
				{
					variant: 'success',
					message: message,
				},
				setMessage,
			)
		} catch (error) {
			closeProduto()

			showMessage(
				{
					variant: 'warning',
					message: error.message,
				},
				setMessage,
			)
		}
	}

	const ExcluirProduto = async (produto) => {
		try {
			await Excluir(
				`${process.env.REACT_APP_API_URL}/produtos/${produto._id}`,
			)

			showMessage(
				{
					variant: 'warning',
					message: 'Produto excluido com sucesso',
				},
				setMessage,
			)
		} catch (error) {
			showMessage(
				{
					variant: 'error',
					message: error.message,
				},
				setMessage,
			)
		}
	}

	const handleBusca = (_query) => {
		setQuery(_query)
	}

	const openProduto = (_produto) => {
		setAbreProduto({
			status: true,
			produto: _produto,
		})
	}

	const closeProduto = () => {
		setAbreProduto({
			status: false,
			produto: {
				_id: '0',
			},
		})
	}

	useEffect(() => {
		const fetchProdutos = async () => {
			const produtosFetch = await Get(
				`${process.env.REACT_APP_API_URL}/produtos?nome=${query}&limit=10`,
			)
			const produtosOrdenados = ordenarData(
				produtosFetch,
				'created_at',
				'desc',
			)

			setProdutos(produtosOrdenados)
			setIsLoading(false)
		}

		fetchProdutos()
	}, [query, abreProduto])

	return (
		<div className={styles.container}>
			{isLoading ? (
				<Loader />
			) : (
				<>
					{message.message && (
						<Message
							variant={message.variant}
							message={message.message}
						/>
					)}

					{abreProduto.status === true ? (
						<Produto
							produto={abreProduto.produto}
							className={styles.container}
							handleSalvar={salvarProduto}
							handleFechar={closeProduto}
						/>
					) : (
						<>
							<ProdutosLista
								produtos={produtos}
								handleEditar={openProduto}
								handleExcluir={
									ExcluirProduto
								}
								handleBusca={handleBusca}
								query={query}
								handleAdicionar={
									<Button
										variant="contained"
										produto={
											abreProduto.produto
										}
										onClick={() =>
											openProduto({
												_id: '0',
											})
										}
										startIcon={
											<AddCircle />
										}
										sx={{
											mt: 1,
											mb: 1,
										}}>
										Adicionar
									</Button>
								}
							/>
						</>
					)}
				</>
			)}
		</div>
	)
}
