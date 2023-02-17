import bcrypt from 'bcryptjs-react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import PeopleIcon from '@mui/icons-material/People'
import Typography from '@mui/material/Typography'

export const Usuario = ({ usuario, handleFechar, handleSalvar }) => {
	const passwordEncode = (password) => {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
	}

	const handleSubmit = (event) => {
		event.preventDefault()

		const data = new FormData(event.currentTarget)

		usuario.nome = data.get('nome')
		usuario.email = data.get('email')
		usuario.telefone = data.get('telefone')
		usuario.cpf = data.get('cpf')

		if (usuario.id === 0) {
			usuario.senha = data.get('senha')
			usuario.senha = passwordEncode(usuario.senha)
		}

		handleSalvar(usuario)
	}

	return (
		<Box
			sx={{
				borderRadius: 2,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: '#FFFFFF',
			}}
		>
			<Avatar sx={{ m: 1, mt: 3, bgcolor: 'primary.main' }}>
				<PeopleIcon />
			</Avatar>

			<Typography component="h1" variant="h5">
				{usuario.id === 0 ? 'Adicionar Usuário' : 'Alterar Usuário'}
			</Typography>

			<Box
				component="form"
				onSubmit={handleSubmit}
				sx={{ width: '100%', p: 4 }}
			>
				<TextField
					margin="normal"
					required
					fullWidth
					name="nome"
					label="Nome do Usuário"
					id="nome"
					defaultValue={usuario.nome}
					autoComplete="Nome do Usuário"
				/>
				<TextField
					margin="normal"
					type="email"
					required
					fullWidth
					name="email"
					label="E-mail"
					id="email"
					defaultValue={usuario.email}
					autoComplete="E-mail"
				/>
				<TextField
					margin="normal"
					type="tel"
					required
					fullWidth
					name="telefone"
					label="Telefone"
					id="telefone"
					defaultValue={usuario.telefone}
					autoComplete="Telefone"
				/>
				<TextField
					margin="normal"
					type="cpf"
					required
					fullWidth
					name="cpf"
					label="CPF"
					id="cpf"
					defaultValue={usuario.cpf}
					autoComplete="CPF"
				/>

				{usuario.id === 0 && (
					<TextField
						margin="normal"
						type="password"
						required
						fullWidth
						name="senha"
						label="Senha"
						id="senha"
						defaultValue={usuario.senha}
						autoComplete="Senha"
					/>
				)}
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="success"
					sx={{ mt: 3, mb: 2 }}
				>
					Salvar
				</Button>
				<Button
					type="button"
					fullWidth
					variant="contained"
					color="primary"
					sx={{ mt: 0, mb: 2 }}
					onClick={() => handleFechar(false)}
				>
					Voltar
				</Button>
			</Box>
		</Box>
	)
}
