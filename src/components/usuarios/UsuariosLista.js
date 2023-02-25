import * as React from 'react'
import { styled } from '@mui/material/styles'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, {
	tableCellClasses,
} from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import { formatarCPFTela } from '../../data/Utils'

export const UsuariosLista = ({
	usuarios,
	handleEditar,
	handleExcluir,
}) => {
	const editarUsuario = (usuario) => {
		handleEditar(usuario)
	}

	const excluirUsuario = (usuario) => {
		handleExcluir(usuario)
	}

	const StyledTableCell = styled(TableCell)(
		({ theme }) => ({
			[`&.${tableCellClasses.head}`]: {
				backgroundColor: '#424242',
				color: theme.palette.common.white,
			},
			[`&.${tableCellClasses.body}`]: {
				fontSize: 14,
			},
		}),
	)

	return (
		<TableContainer component={Paper}>
			<Table
				sx={{ minWidth: 650 }}
				aria-label="simple table">
				<TableHead>
					<TableRow>
						<StyledTableCell>
							Nome
						</StyledTableCell>
						<StyledTableCell>
							E-mail
						</StyledTableCell>
						<StyledTableCell>
							Telefone
						</StyledTableCell>
						<StyledTableCell>
							CPF
						</StyledTableCell>
						<StyledTableCell></StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{usuarios.map((usuario) => (
						<TableRow
							key={usuario._id}
							sx={{
								'&:last-child td, &:last-child th':
									{
										border: 0,
									},
							}}>
							<TableCell
								component="th"
								scope="row">
								{usuario.nome}
							</TableCell>
							<TableCell>
								{usuario.email}
							</TableCell>
							<TableCell>
								{usuario.telefone}
							</TableCell>
							<TableCell>
								{usuario.cpf &&
									formatarCPFTela(
										usuario.cpf,
									)}
							</TableCell>
							<TableCell align="right">
								<IconButton
									aria-label="Editar Usuário"
									size="small"
									onClick={() =>
										editarUsuario(
											usuario,
										)
									}>
									<ModeEditIcon />
								</IconButton>

								<IconButton
									aria-label="delete"
									size="small"
									onClick={() =>
										excluirUsuario(
											usuario,
										)
									}>
									<DeleteIcon fontSize="small" />
								</IconButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
