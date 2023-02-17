import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { Dashboard } from './components/Dashboard'
import { Relatorio } from './components/relatorio/Relatorio'
import { Produtos } from './components/produtos/Produtos'
import { Usuarios } from './components/usuarios/Usuarios'
import { Movimentacao } from './components/movimentacao/Movimentacao'
import { MovimentacaoHistorico } from './components/movimentacao/MovimentacaoHistorico'

export default function App() {
	return (
		<AuthProvider>
			<Routes>
				<Route
					path="/"
					element={
						<Dashboard title="Relatório de Estoque">
							<Relatorio />
						</Dashboard>
					}
				/>
				<Route
					path="/produtos"
					element={
						<Dashboard title="Produtos">
							<Produtos />
						</Dashboard>
					}
				/>
				<Route
					path="/estoque/movimentacao"
					element={
						<Dashboard title="Movimentação de Estoque">
							<Movimentacao />
						</Dashboard>
					}
				/>
				<Route
					path="/estoque/movimentacao/historico"
					element={
						<Dashboard title="Histórico de Movimentações">
							<MovimentacaoHistorico />
						</Dashboard>
					}
				/>
				<Route
					path="/usuarios"
					element={
						<Dashboard title="Usuários">
							<Usuarios />
						</Dashboard>
					}
				/>
			</Routes>
		</AuthProvider>
	)
}
