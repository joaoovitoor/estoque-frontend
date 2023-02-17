import { useState, useEffect, useCallback } from 'react'
import { Button } from '@mui/material'
import { AddCircle } from '@mui/icons-material'
import { Produto } from './Produto'
import { ProdutosLista } from './ProdutosLista'
import { Message } from '../Message'
import { v4 as uuid } from 'uuid'
import { Excluir, Get, Patch, Post } from '../../data/Verbs'

import { produtoVazio, mensagemVazio, showMessage } from '../../data/Interfaces'

import styles from '../../_assets/css/generic.module.css'

export const Produtos = () => {
	const [message, setMessage] = useState(mensagemVazio)

	const [produtos, setProdutos] = useState([])
	const [produto, setProduto] = useState(produtoVazio)
	const [abreProduto, setAbreProduto] = useState(false)

	const salvarProduto = async (produto) => {
		let url = 'http://localhost:5000/produtos'
		let message = 'Produto inserido com sucesso'

		try {
			if (produto.id === 0) {
				produto.id = uuid()
				await Post(url, produto)
			} else {
				await Patch(`${url}/${produto.id}`, produto)
				message = 'Produto alterado com sucesso'
			}

			setAbreProduto(false)
			fetchProdutos()
			showMessage(
				{
					variant: 'success',
					message: message,
				},
				setMessage
			)
		} catch (error) {
			setAbreProduto(false)
			showMessage(
				{
					variant: 'warning',
					message: error.message,
				},
				setMessage
			)
		}
	}

	const ExcluirProduto = async (produto) => {
		try {
			await Excluir(`http://localhost:5000/produtos/${produto.id}`)
			setAbreProduto(false)
			setProduto(produtoVazio)
			fetchProdutos()

			showMessage(
				{
					variant: 'warning',
					message: 'Produto excluido com sucesso',
				},
				setMessage
			)
		} catch (error) {
			setAbreProduto(false)
			showMessage(
				{
					variant: 'error',
					message: error.message,
				},
				setMessage
			)
		}
	}

	const abrirProduto = (objProduto) => {
		setProduto(objProduto)

        setAbreProduto(true)
	}

	const fetchProdutos = useCallback(async () => {
		setProdutos(await Get('http://localhost:5000/produtos'))
	}, []);

	useEffect(() => {
		fetchProdutos()
	}, [fetchProdutos])

	return (
		<div className={styles.container}>
			{message.message && (
				<Message variant={message.variant} message={message.message} />
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
					<Button
						variant="contained"
						produto={produto}
						onClick={() => abrirProduto(produtoVazio)}
						startIcon={<AddCircle />}
						sx={{ mt: 1, mb: 1 }}
					>
						Adicionar
					</Button>

					<ProdutosLista
						produtos={produtos}
						handleEditar={abrirProduto}
						handleExcluir={ExcluirProduto}
					/>
				</>
			)}
		</div>
	)
}
