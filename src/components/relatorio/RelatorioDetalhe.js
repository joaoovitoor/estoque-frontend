import { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'

import { Button } from '@mui/material'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

export const RelatorioDetalhe = ({ produto, handleFechar }) => {
	const [history, setHistory] = useState([])

	const StyledTableCell = styled(TableCell)(({ theme }) => ({
		[`&.${tableCellClasses.head}`]: {
			backgroundColor: '#424242',
			color: theme.palette.common.white,
		},
		[`&.${tableCellClasses.body}`]: {
			fontSize: 14,
		},
	}))

	const fetchData = async (url) => {
		const response = await fetch(url)
		const responseJson = await response.json()

		return responseJson
	}

	const handleProdutos = async (produto) => {
		const dataMovimentacoes = await fetchData(
			'http://localhost:5000/movimentacoes'
		)

		if (dataMovimentacoes.length > 0) {
			let movimentosFiltrados = dataMovimentacoes.filter(
				(movimentacao) => movimentacao.produto === produto.id
			)

			setHistory(movimentosFiltrados)
		}
	}

	useEffect(() => {
		handleProdutos(produto)
		// eslint-disable-next-line
	}, [produto])

	return (
		<>
			<Button
				type="button"
				fullWidth
				variant="contained"
				color="warning"
				sx={{ mt: 0, mb: 2 }}
				onClick={() => handleFechar(false)}
			>
				Voltar
			</Button>

			<TableContainer component={Paper} sx={{ marginTop: '2px' }}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<StyledTableCell>Tipo</StyledTableCell>
							<StyledTableCell>Produto</StyledTableCell>
							<StyledTableCell>Quantidade</StyledTableCell>
							<StyledTableCell>Data</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{history.map((produto) => (
							<TableRow
								key={produto.id}
								sx={{
									'&:last-child td, &:last-child th': {
										border: 0,
									},
								}}
							>
								<TableCell component="th" scope="row">
									{produto.movementType}
								</TableCell>
								<TableCell>{produto.nome}</TableCell>
								<TableCell>{produto.quantidade}</TableCell>
								<TableCell>{produto.date}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	)
}
