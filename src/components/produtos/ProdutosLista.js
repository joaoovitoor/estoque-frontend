import { useState } from 'react'
import { styled } from '@mui/material/styles'

import { Grid, TextField } from '@mui/material'
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
import QrCode2Icon from '@mui/icons-material/QrCode2'
import { ProdutoBarcode } from './ProdutoBarcode'

export const ProdutosLista = ({
	produtos,
	handleAdicionar,
	handleEditar,
	handleExcluir,
	handleBusca,
	query,
}) => {
	const [modalOpen, setModalOpen] = useState(false)
	const [codigo, setCodigo] = useState('')

	const barcodeProduto = (produto) => {
		setCodigo(produto.codigo)
		handleOpenModal()
	}

	const handleOpenModal = () => {
		setModalOpen(true)
	}

	const handleCloseModal = () => {
		setModalOpen(false)
	}

	const editarProduto = (produto) => {
		handleEditar(produto)
	}

	const excluirProduto = (produto) => {
		handleExcluir(produto)
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
		<>
			<Grid container spacing={0}>
				<Grid item xs={4}>
					{handleAdicionar}
				</Grid>
				<Grid item xs={8}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="produto"
						label="Busque por Produto"
						name="produto"
						autoComplete="produto"
						defaultValue={query}
						autoFocus
						onChange={(e) =>
							handleBusca(e.target.value)
						}
					/>
				</Grid>
			</Grid>

			{codigo && (
				<ProdutoBarcode
					open={modalOpen}
					onClose={handleCloseModal}
					value={codigo}
				/>
			)}

			<TableContainer component={Paper}>
				<Table
					sx={{ minWidth: 650 }}
					aria-label="simple table">
					<TableHead>
						<TableRow>
							<StyledTableCell>
								Código
							</StyledTableCell>
							<StyledTableCell>
								Nome
							</StyledTableCell>
							<StyledTableCell>
								Estoque Mínimo
							</StyledTableCell>
							<StyledTableCell></StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{produtos.map((produto) => (
							<TableRow
								key={produto._id}
								sx={{
									'&:last-child td, &:last-child th':
										{
											border: 0,
										},
								}}>
								<TableCell
									component="th"
									scope="row">
									{produto.codigo}
								</TableCell>
								<TableCell>
									{produto.nome}
								</TableCell>
								<TableCell>
									{produto.estoqueminimo}
								</TableCell>
								<TableCell align="right">
									<IconButton
										aria-label="Código de Barras"
										size="small"
										onClick={() =>
											barcodeProduto(
												produto,
											)
										}>
										<QrCode2Icon />
									</IconButton>

									<IconButton
										aria-label="Editar Produto"
										size="small"
										onClick={() =>
											editarProduto(
												produto,
											)
										}>
										<ModeEditIcon />
									</IconButton>

									<IconButton
										aria-label="delete"
										size="small"
										onClick={() =>
											excluirProduto(
												produto,
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
		</>
	)
}
