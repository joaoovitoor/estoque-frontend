import { useState } from 'react'

import ModeEditIcon from '@mui/icons-material/ModeEdit'
import SaveIcon from '@mui/icons-material/Save'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import {
	Grid,
	TextField,
	Checkbox,
	FormControlLabel,
	IconButton,
} from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, {
	tableCellClasses,
} from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { styled } from '@mui/material/styles'

import { providenciaVazio } from '../../data/Interfaces'
import { Patch } from '../../data/Verbs'

export const RelatorioLista = ({
	produtos,
	fields,
	handleDetalhe,
	handleFields,
}) => {
	const [providencia, setProvidencia] = useState(
		providenciaVazio,
	)

	const handleProvidencia = (produto) => {
		setProvidencia({
			status: !providencia.status,
			produto: produto._id,
		})
	}

	const saveProvidencia = async (produto) => {
		await Patch(
			`${process.env.REACT_APP_API_URL}/produtos/${produto._id}`,
			produto,
		)

		handleProvidencia(produto)
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
				<Grid item xs={8}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="produto"
						label="Busque por Produto"
						name="produto"
						autoComplete="produto"
						defaultValue={fields.produto}
						autoFocus
						onChange={(e) =>
							handleFields({
								...fields,
								[e.target.name]:
									e.target.value,
							})
						}
					/>
				</Grid>
				<Grid item xs={4}>
					<FormControlLabel
						sx={{
							marginTop: '20px',
							marginLeft: '10px',
						}}
						control={
							<Checkbox
								name="checkbox"
								value={fields.checkbox}
								onChange={(e) =>
									handleFields({
										...fields,
										[e.target.name]:
											e.target
												.checked,
									})
								}
							/>
						}
						label="Estoque Mínimo"
					/>
				</Grid>
			</Grid>

			<TableContainer
				component={Paper}
				sx={{ marginTop: '2px' }}>
				<Table
					sx={{ minWidth: 650 }}
					aria-label="simple table">
					<TableHead>
						<TableRow>
							<StyledTableCell width="20%">
								Código
							</StyledTableCell>
							<StyledTableCell width="30%">
								Nome
							</StyledTableCell>
							<StyledTableCell>
								Mínimo
							</StyledTableCell>
							<StyledTableCell>
								Ideal
							</StyledTableCell>
							<StyledTableCell>
								Saldo
							</StyledTableCell>
							<StyledTableCell>
								Provicência
							</StyledTableCell>
							<StyledTableCell></StyledTableCell>
							<StyledTableCell></StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{produtos.length > 0 &&
							produtos
								.sort((a, b) => {
									if (
										a.nome.toUpperCase() >
										b.nome.toUpperCase()
									) {
										return 1
									}
									if (
										a.nome.toUpperCase() <
										b.nome.toUpperCase()
									) {
										return -1
									}
									// a must be equal to b
									return 0
								})
								.slice(0, 10)
								.map((produto) => (
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
											{
												produto.estoqueminimo
											}
										</TableCell>
										<TableCell>
											{
												produto.estoqueideal
											}
										</TableCell>
										<TableCell>
											{produto.saldo}
										</TableCell>
										<TableCell>
											{providencia.status ===
												true &&
											providencia.produto ===
												produto._id ? (
												<>
													<TextField
														margin="none"
														size="small"
														required
														id="providencia"
														label="Providência"
														name="providencia"
														autoComplete="providencia"
														defaultValue={
															produto.providencia
														}
														autoFocus
														onChange={(
															e,
														) =>
															(produto.providencia =
																e.target.value)
														}
													/>

													<IconButton
														aria-label="salvar produto"
														size="small"
														onClick={() =>
															saveProvidencia(
																produto,
															)
														}>
														<SaveIcon />
													</IconButton>
												</>
											) : (
												<>
													{
														produto.providencia
													}
													<IconButton
														aria-label="Editar Produto"
														size="small"
														onClick={() =>
															handleProvidencia(
																produto,
															)
														}>
														<ModeEditIcon />
													</IconButton>
												</>
											)}
										</TableCell>
										<TableCell>
											<IconButton
												aria-label={`Detalhes do Produto ${produto.nome}`}
												onClick={() =>
													handleDetalhe(
														produto,
													)
												}>
												<ZoomInIcon />
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
