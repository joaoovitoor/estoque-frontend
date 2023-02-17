import { useState, useEffect } from 'react'
import { MovimentacaoLista } from './MovimentacaoLista'
import { Message } from '../Message'

import styles from '../../_assets/css/generic.module.css'

export const MovimentacaoHistorico = () => {
	const mensagemVazio = {
		variant: '',
		message: '',
	}

	const [message, setMessage] = useState(mensagemVazio)
	const [movimentacoes, setMovimentacoes] = useState([])

	const showMessage = ({ variant, message }) => {
		setMessage({ variant, message })

		setTimeout(() => {
			setMessage(mensagemVazio)
		}, 3000)
	}

	const ExcluirMovimentacao = (movimentacao) => {
		fetch(`http://localhost:5000/movimentacoes/${movimentacao.id}`, {
			method: 'DELETE',
		})
			.then((response) => {
				if (response.ok) {
					return response.json()
				}

				throw new Error('Erro ao deletar Movimentação')
			})
			.then(() => {
				fetchMovimentacoes()

				showMessage({
					variant: 'error',
					message: 'Movimentação excluida com sucesso',
				})
			})
			.catch((error) => {
				showMessage({
					variant: 'warning',
					message: error.message,
				})
			})
	}

	const fetchMovimentacoes = () => {
		fetch('http://localhost:5000/movimentacoes')
			.then((response) => response.json())
			.then((data) => setMovimentacoes(data))
	}

	useEffect(() => {
		fetchMovimentacoes()
	}, [])

	return (
		<div className={styles.container}>
			{message.message && (
				<>
					<Message
						variant={message.variant}
						message={message.message}
					/>
					<br />
				</>
			)}

			<>
				<MovimentacaoLista
					movimentacoes={movimentacoes}
					handleExcluir={ExcluirMovimentacao}
				/>
			</>
		</div>
	)
}
