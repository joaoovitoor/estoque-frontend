import { useState, useEffect, useCallback } from 'react'
import { Button } from '@mui/material'
import { AddCircle } from '@mui/icons-material'
import { Usuario } from './Usuario'
import { UsuariosLista } from './UsuariosLista'
import { Message } from '../Message'
import { v4 as uuid } from 'uuid'
import { Excluir, Get, Patch, Post } from '../../data/Verbs'
import { usuarioVazio, mensagemVazio, showMessage } from '../../data/Interfaces'

import styles from '../../_assets/css/generic.module.css'

export const Usuarios = () => {
	const [message, setMessage] = useState(mensagemVazio)

	const [usuarios, setUsuarios] = useState([])
	const [usuario, setUsuario] = useState(usuarioVazio)
	const [abreUsuario, setAbreUsuario] = useState(false)

	const salvarUsuario = async (usuario) => {
		let url = 'http://localhost:5000/usuarios'
		let message = 'Usuário inserido com sucesso'

		try {
			if (usuario.id === 0) {
				usuario.id = uuid()
				await Post(url, usuario)
			} else {
				await Patch(`${url}/${usuario.id}`, usuario)
				message = 'Usuário alterado com sucesso'
			}

			setAbreUsuario(false)
			fetchUsers()
			showMessage(
				{
					variant: 'success',
					message: message,
				},
				setMessage
			)
		} catch (error) {
			setAbreUsuario(false)
			showMessage(
				{
					variant: 'warning',
					message: error.message,
				},
				setMessage
			)
		}
	}

	const ExcluirUsuario = async (usuario) => {
		try {
			await Excluir(`http://localhost:5000/usuarios/${usuario.id}`)
			setAbreUsuario(false)
			setUsuario(usuarioVazio)
			fetchUsers()

			showMessage(
				{
					variant: 'warning',
					message: 'Usuário excluido com sucesso',
				},
				setMessage
			)
		} catch (error) {
			setAbreUsuario(false)
			showMessage(
				{
					variant: 'error',
					message: error.message,
				},
				setMessage
			)
		}
	}

	const abrirUsuario = (objUsuario) => {
		setUsuario(objUsuario)
		setAbreUsuario(true)
	}

	const fetchUsers = useCallback(async () => {
		setUsuarios(await Get(`http://localhost:5000/usuarios`))
	}, [])

	useEffect(() => {
		fetchUsers()
	}, [fetchUsers])

	return (
		<div className={styles.container}>
			{message.message && (
				<Message variant={message.variant} message={message.message} />
			)}

			{abreUsuario === true ? (
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
						onClick={() => abrirUsuario(usuarioVazio)}
						startIcon={<AddCircle />}
						sx={{ mt: 1, mb: 1 }}
					>
						Adicionar
					</Button>

					<UsuariosLista
						usuarios={usuarios}
						handleEditar={abrirUsuario}
						handleExcluir={ExcluirUsuario}
					/>
				</>
			)}
		</div>
	)
}
