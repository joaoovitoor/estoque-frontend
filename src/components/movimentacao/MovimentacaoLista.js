import * as React from 'react'
import { styled } from '@mui/material/styles'

import { green, red } from '@mui/material/colors'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

export const MovimentacaoLista = ({ movimentacoes, handleExcluir }) => {
	const formateDate = (dateStr) => {
		const date = new Date(dateStr)
		const options = {
			day: '2-digit',
			month: '2-digit',
			year: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
		}
		return date.toLocaleString('pt-BR', options)
	}

	const excluirMovimentacao = (movimentacao) => {
		handleExcluir(movimentacao)
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
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<StyledTableCell>Tipo</StyledTableCell>
						<StyledTableCell>Produto</StyledTableCell>
						<StyledTableCell>Quantidade</StyledTableCell>
						<StyledTableCell>Data</StyledTableCell>
						<StyledTableCell></StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{movimentacoes
						.sort((a, b) => new Date(b.date) - new Date(a.date))
						.slice(0, 100)
						.map((movimentacao) => (
							<TableRow
								key={movimentacao.id}
								sx={{
									'&:last-child td, &:last-child th': {
										border: 0,
									},
									'& th': {
										color: 'rgba(255, 255, 255)',
									},
								}}
								style={{
									backgroundColor:
										movimentacao.movementType === 'entrada'
											? green[600]
											: red[600],
								}}
							>
								<TableCell component="th" scope="row">
									{movimentacao.movementType}
								</TableCell>
								<TableCell component="th">
									{movimentacao.nome}
								</TableCell>
								<TableCell component="th">
									{movimentacao.quantidade}
								</TableCell>
								<TableCell component="th">
									{formateDate(movimentacao.date)}
								</TableCell>
								<TableCell component="th" align="right">
									<IconButton
										aria-label="delete"
										size="small"
										onClick={() =>
											excluirMovimentacao(movimentacao)
										}
									>
										<DeleteIcon fontSize="small" style={{ color: 'white' }} />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
