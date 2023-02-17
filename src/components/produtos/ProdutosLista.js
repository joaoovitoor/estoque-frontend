import * as React from 'react'
import { styled } from '@mui/material/styles'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import QrCode2Icon from '@mui/icons-material/QrCode2'
import { ProdutoBarcode } from './ProdutoBarcode'

export const ProdutosLista = ({ produtos, handleEditar, handleExcluir }) => {
	const [modalOpen, setModalOpen] = React.useState(false)
	const [codigo, setCodigo] = React.useState('')

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

	const StyledTableCell = styled(TableCell)(({ theme }) => ({
		[`&.${tableCellClasses.head}`]: {
			backgroundColor: '#424242',
			color: theme.palette.common.white,
		},
		[`&.${tableCellClasses.body}`]: {
			fontSize: 14,
		},
	}))

	return (
		<>
			{codigo && (
				<ProdutoBarcode
					open={modalOpen}
					onClose={handleCloseModal}
					value={codigo}
				/>
			)}

			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<StyledTableCell>Código</StyledTableCell>
							<StyledTableCell>Nome</StyledTableCell>
							<StyledTableCell>Estoque Mínimo</StyledTableCell>
							<StyledTableCell></StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{produtos.map((produto) => (
							<TableRow
								key={produto.id}
								sx={{
									'&:last-child td, &:last-child th': {
										border: 0,
									},
								}}
							>
								<TableCell component="th" scope="row">
									{produto.codigo}
								</TableCell>
								<TableCell>{produto.nome}</TableCell>
								<TableCell>{produto.estoqueminimo}</TableCell>
								<TableCell align="right">
									<IconButton
										aria-label="Código de Barras"
										size="small"
										onClick={() => barcodeProduto(produto)}
									>
										<QrCode2Icon />
									</IconButton>

									<IconButton
										aria-label="Editar Produto"
										size="small"
										onClick={() => editarProduto(produto)}
									>
										<ModeEditIcon />
									</IconButton>

									<IconButton
										aria-label="delete"
										size="small"
										onClick={() => excluirProduto(produto)}
									>
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
