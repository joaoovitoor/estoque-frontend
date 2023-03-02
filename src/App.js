import { Dashboard } from './components/Dashboard';
import { Movimentacao } from './components/movimentacao/Movimentacao';
import { Produtos } from './components/produtos/Produtos';
import { Relatorio } from './components/relatorio/Relatorio';
import { Usuarios } from './components/usuarios/Usuarios';
import { AuthProvider } from './contexts/AuthContext';
import { Routes, Route } from 'react-router-dom';

export default function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route
                    path='/'
                    element={
                        <Dashboard title='Estoque'>
                            <Relatorio />
                        </Dashboard>
                    }
                />
                <Route
                    path='/produtos'
                    element={
                        <Dashboard title='Produtos'>
                            <Produtos />
                        </Dashboard>
                    }
                />
                <Route
                    path='/estoque/movimentacao'
                    element={
                        <Dashboard title='Movimentação de Estoque'>
                            <Movimentacao />
                        </Dashboard>
                    }
                />
                <Route
                    path='/usuarios'
                    element={
                        <Dashboard title='Usuários'>
                            <Usuarios />
                        </Dashboard>
                    }
                />
            </Routes>
        </AuthProvider>
    );
}
