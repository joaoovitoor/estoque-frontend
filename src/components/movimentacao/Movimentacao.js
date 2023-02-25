import React, {
	useState,
	useEffect,
	useCallback,
} from 'react'
import { green, red } from '@mui/material/colors'
import ButtonGroup from '@mui/material/ButtonGroup'
import TextField from '@mui/material/TextField'
import {
	Button,
	Button as MaterialButton,
} from '@mui/material'
import { Autocomplete } from '@mui/material'
import { Message } from '../Message'
import {
	produtoVazioMovimentacao,
	mensagemVazio,
	showMessage,
} from '../../data/Interfaces'

import { Get, Post } from '../../data/Verbs'

import Box from '@mui/material/Box'

export const Movimentacao = () => {
	const [message, setMessage] = useState(mensagemVazio)
	const [produtos, setProdutos] = useState([])
	const [movementType, setMovementType] =
		useState('entrada')
	const [produto, setProduto] = useState(
		produtoVazioMovimentacao,
	)
	const [quantidade, setQuantidade] = useState('')

	const handleMovementTypeChange = (event) => {
		setMovementType(event.target.value)
	}

	const handleProdutoChange = (produto) => {
		setProduto(produto)
	}

	const handleQuantidadeChange = (event) => {
		setQuantidade(event.target.value)
	}

	const handleFormSubmit = (event) => {
		event.preventDefault()

		const movimentacao = {
			movementType: movementType,
			produto: produto.id,
			nome: produto.label,
			quantidade: quantidade,
			date: new Date().toJSON(),
		}

		salvarMovimentacao(movimentacao)
	}

	const salvarMovimentacao = async (movimentacao) => {
		let url = `${process.env.REACT_APP_API_URL}/movimentacoes`

		try {
			await Post(url, movimentacao)
			setProduto(produtoVazioMovimentacao)
			setQuantidade('')

			showMessage(
				{
					variant:
						movimentacao.movementType.toUpperCase() ===
						'ENTRADA'
							? 'success'
							: 'error',
					message: `${movimentacao.movementType.toUpperCase()} EFETUADA COM SUCESSO`,
				},
				setMessage,
			)
		} catch (error) {
			showMessage(
				{
					variant: 'warning',
					message: error.message,
				},
				setMessage,
			)
		}
	}

	const fetchProdutos = useCallback(async () => {
		setProdutos(
			await Get(
				`${process.env.REACT_APP_API_URL}/produtos`,
			),
		)
	}, [])

	useEffect(() => {
		fetchProdutos()
	}, [fetchProdutos])

	return (
		<div>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="top"
				height="calc(100vh - 32px)"
				bgcolor={
					movementType === 'entrada'
						? '#9ACD32'
						: '#FF6347'
				}>
				<form
					onSubmit={handleFormSubmit}
					style={{
						width: '80%',
						height: 'fit-content',
						marginTop: '5%',
						maxHeight: '80%',
						backgroundColor: 'white',
						borderRadius: 2,
						padding: '20px',
					}}>
					{message.message && (
						<>
							<Message
								variant={message.variant}
								message={message.message}
							/>

							<br />
						</>
					)}

					<ButtonGroup
						fullWidth={true}
						size="large"
						aria-label="large button group">
						<MaterialButton
							value="entrada"
							onClick={
								handleMovementTypeChange
							}
							style={{
								backgroundColor:
									movementType ===
									'entrada'
										? green[600]
										: green[300],
								color: 'white',
								paddingTop: '20px',
								paddingBottom: '20px',
								fontSize: '2em',
							}}>
							Entrada
						</MaterialButton>
						<MaterialButton
							value="saída"
							onClick={
								handleMovementTypeChange
							}
							style={{
								backgroundColor:
									movementType === 'saída'
										? red[600]
										: red[300],
								color: 'white',
								paddingTop: '20px',
								paddingBottom: '20px',
								fontSize: '2em',
							}}>
							Saída
						</MaterialButton>
					</ButtonGroup>
					<br />

					{produtos && (
						<Autocomplete
							fullWidth
							id="produto"
							value={
								produto.id !== '0'
									? produto
									: null
							}
							options={produtos.map(
								(produtoMap) => ({
									id: produtoMap._id,
									label: `${produtoMap.codigo} - ${produtoMap.nome}`,
								}),
							)}
							isOptionEqualToValue={(
								option,
								value,
							) =>
								option.label === value.label
							}
							onChange={(a, b) =>
								handleProdutoChange(b)
							}
							style={{
								paddingTop: '20px',
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Produto"
								/>
							)}
						/>
					)}
					<br />
					<TextField
						fullWidth
						type="number"
						id="quantidade"
						label="Quantidade"
						value={quantidade}
						onChange={handleQuantidadeChange}
						margin="none"
						required
					/>
					<br />
					<Button
						fullWidth
						type="submit"
						variant="contained"
						color="primary"
						sx={{ marginTop: 2 }}
						style={{
							backgroundColor:
								movementType === 'saída'
									? red[600]
									: green[600],
							color: 'white',
							paddingTop: '10px',
							paddingBottom: '10px',
							fontSize: '1em',
						}}>
						Salvar {movementType}
					</Button>
				</form>
			</Box>
		</div>
	)
}
