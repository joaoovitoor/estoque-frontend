import { useState, useEffect, useCallback } from 'react'
import { Button } from '@mui/material'
import { AddCircle } from '@mui/icons-material'
import { Produto } from './Produto'
import { ProdutosLista } from './ProdutosLista'
import { Message } from '../Message'
import { v4 as uuid } from 'uuid'
import { Excluir, Get, Patch, Post } from '../../data/Verbs'
import { ordenarData } from '../../data/Utils'
import {
	produtoVazio,
	mensagemVazio,
	showMessage,
} from '../../data/Interfaces'

import styles from '../../_assets/css/generic.module.css'

export const Produtos = () => {
	const [message, setMessage] = useState(mensagemVazio)

	const [produtos, setProdutos] = useState([])
	const [produto, setProduto] = useState(produtoVazio)
	const [abreProduto, setAbreProduto] = useState(false)

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

			setProduto({
				_id: '0',
			})
			setAbreProduto(false)
			fetchProdutos()
			showMessage(
				{
					variant: 'success',
					message: message,
				},
				setMessage,
			)
		} catch (error) {
			setProduto({
				_id: '0',
			})
			setAbreProduto(false)
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

			fetchProdutos()

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

	const abrirProduto = (objProduto) => {
		setProduto(objProduto)

		setAbreProduto(true)
	}

	const fetchProdutos = useCallback(async () => {
		const produtosFetch = await Get(
			`${process.env.REACT_APP_API_URL}/produtos`,
		)
		const produtosOrdenados = ordenarData(
			produtosFetch,
			'created_at',
			'desc',
		)

		setProdutos(produtosOrdenados)
	}, [])

	useEffect(() => {
		fetchProdutos()
	}, [fetchProdutos])

	return (
		<div className={styles.container}>
			{message.message && (
				<Message
					variant={message.variant}
					message={message.message}
				/>
			)}

			{abreProduto === true ? (
				<Produto
					produto={produto}
					className={styles.container}
					handleSalvar={salvarProduto}
					handleFechar={setAbreProduto}
				/>
			) : (
				<>
					<ProdutosLista
						produtos={produtos}
						handleEditar={abrirProduto}
						handleExcluir={ExcluirProduto}
						handleAdicionar={
							<Button
								variant="contained"
								produto={produto}
								onClick={() =>
									abrirProduto({
										_id: '0',
									})
								}
								startIcon={<AddCircle />}
								sx={{ mt: 1, mb: 1 }}>
								Adicionar
							</Button>
						}
					/>
				</>
			)}
		</div>
	)
}
