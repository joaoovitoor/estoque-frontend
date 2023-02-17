import { useState, useEffect, createContext } from 'react'
import bcrypt from 'bcryptjs-react'
import { Get } from '../data/Verbs'

export const AuthContext = createContext({
	user: null,
	login: async () => {},
	logout: () => {},
})

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)

	useEffect(() => {
		const storedUser = localStorage.getItem('user')
		if (storedUser) {
			setUser(JSON.parse(storedUser))
		}
	}, [])

	const login = async (username, password) => {
		const responseUser = await Get(
			`http://localhost:5000/usuarios?email=${username}`
		)

		if (responseUser.length === 0)
			throw new Error('ERRO - Digite um e-mail valido!')

		const responseBcrypt = await bcrypt.compare(
			password,
			responseUser[0].senha
		)

		if (responseBcrypt) {
			setUser(responseUser[0])
			localStorage.setItem('user', JSON.stringify(responseUser[0]))
		} else throw new Error('ERRO - Digite a senha correta!')
	}

	const logout = () => {
		localStorage.removeItem('user')
		setUser(null)
	}

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}
