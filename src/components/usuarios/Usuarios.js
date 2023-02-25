import { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import { AddCircle } from '@mui/icons-material'
import { Usuario } from './Usuario'
import { UsuariosLista } from './UsuariosLista'
import { Message } from '../Message'
import { v4 as uuid } from 'uuid'
import { Excluir, Get, Patch, Post } from '../../data/Verbs'
import {
	mensagemVazio,
	showMessage,
} from '../../data/Interfaces'

import styles from '../../_assets/css/generic.module.css'

export const Usuarios = () => {
	const [message, setMessage] = useState(mensagemVazio)

	const [usuarios, setUsuarios] = useState([])
	const [usuario, setUsuario] = useState({
		_id: '0',
	})
	const [abreUsuario, setAbreUsuario] = useState(false)

	const salvarUsuario = async (usuario) => {
		let url = `${process.env.REACT_APP_API_URL}/usuarios`
		let message = 'Usuário inserido com sucesso'

		try {
			if (usuario._id === '0') {
				usuario._id = uuid()
				await Post(url, usuario)
			} else {
				await Patch(
					`${url}/${usuario._id}`,
					usuario,
				)
				message = 'Usuário alterado com sucesso'
			}

			setUsuario({
				_id: '0',
			})

			setAbreUsuario(false)
			showMessage(
				{
					variant: 'success',
					message: message,
				},
				setMessage,
			)
		} catch (error) {
			setUsuario({
				_id: '0',
			})
			setAbreUsuario(false)
			showMessage(
				{
					variant: 'warning',
					message: error.message,
				},
				setMessage,
			)
		}
	}

	const ExcluirUsuario = async (usuario) => {
		try {
			await Excluir(
				`${process.env.REACT_APP_API_URL}/usuarios/${usuario._id}`,
			)
			setAbreUsuario(false)
			setUsuario({
				_id: '0',
			})

			showMessage(
				{
					variant: 'warning',
					message: 'Usuário excluido com sucesso',
				},
				setMessage,
			)
		} catch (error) {
			setAbreUsuario(false)
			showMessage(
				{
					variant: 'error',
					message: error.message,
				},
				setMessage,
			)
		}
	}

	const criarUsuario = () => {
		setUsuario({
			_id: '0',
		})

		setAbreUsuario(true)
	}

	const alterarUsuario = (objUsuario) => {
		setUsuario(objUsuario)

		setAbreUsuario(true)
	}

	useEffect(() => {
		const fetchUsers = async () => {
			setUsuarios(
				await Get(
					`${process.env.REACT_APP_API_URL}/usuarios`,
				),
			)
		}

		fetchUsers()
	}, [message, abreUsuario])

	return (
		<div className={styles.container}>
			{message.message && (
				<Message
					variant={message.variant}
					message={message.message}
				/>
			)}

			{abreUsuario ? (
				<Usuario
					usuario={usuario}
					className={styles.container}
					handleSalvar={salvarUsuario}
					handleFechar={setAbreUsuario}
				/>
			) : (
				<>
					<Button
						variant="contained"
						usuario={usuario}
						onClick={() => criarUsuario()}
						startIcon={<AddCircle />}
						sx={{ mt: 1, mb: 1 }}>
						Adicionar
					</Button>

					<UsuariosLista
						usuarios={usuarios}
						handleEditar={alterarUsuario}
						handleExcluir={ExcluirUsuario}
					/>
				</>
			)}
		</div>
	)
}
