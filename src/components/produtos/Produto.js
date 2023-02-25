import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Typography from '@mui/material/Typography'

export const Produto = ({
	produto,
	handleFechar,
	handleSalvar,
}) => {
	const handleSubmit = (event) => {
		event.preventDefault()

		const data = new FormData(event.currentTarget)

		produto.codigo = data.get('codigo')
		produto.nome = data.get('nome')
		produto.estoqueminimo = data.get('estoqueminimo')

		handleSalvar(produto)
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
			}}>
			<Avatar
				sx={{
					m: 1,
					mt: 3,
					bgcolor: 'primary.main',
				}}>
				<ShoppingCartIcon />
			</Avatar>

			<Typography component="h1" variant="h5">
				{produto._id === '0'
					? 'Adicionar Produto'
					: 'Alterar Produto'}
			</Typography>

			<Box
				component="form"
				onSubmit={handleSubmit}
				sx={{ width: '100%', p: 4 }}>
				<TextField
					margin="normal"
					required
					fullWidth
					id="codigo"
					label="Código"
					name="codigo"
					autoComplete="codigo"
					defaultValue={produto.codigo}
					autoFocus
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					name="nome"
					label="Nome do Produto"
					id="nome"
					defaultValue={produto.nome}
					autoComplete="Nome do produto"
				/>
				<TextField
					margin="normal"
					type="number"
					required
					fullWidth
					name="estoqueminimo"
					label="Estoque Mínimo"
					id="estoqueminimo"
					defaultValue={produto.estoqueminimo}
					autoComplete="Estoque Mínimo"
				/>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="success"
					sx={{ mt: 3, mb: 2 }}>
					Salvar
				</Button>
				<Button
					type="button"
					fullWidth
					variant="contained"
					color="primary"
					sx={{ mt: 0, mb: 2 }}
					onClick={() => handleFechar(false)}>
					Voltar
				</Button>
			</Box>
		</Box>
	)
}
