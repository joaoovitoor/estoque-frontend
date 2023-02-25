export const Get = async (url) => {
	const response = await fetch(url)

	if (!response.ok) {
		throw new Error('Erro ao processar fetch')
	}

	return response.json()
}

export const Excluir = async (url) => {
	const response = await fetch(url, {
		method: 'DELETE',
	})

	if (!response.ok) {
		throw new Error('Erro ao processar fetch')
	}

	return response.json()
}

export const Post = async (url, data) => {
	delete data._id
	const response = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	})

	if (!response.ok) {
		throw new Error('Erro ao processar fetch')
	}

	return response.json()
}

export const Patch = async (url, data) => {
	const response = await fetch(url, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	})

	if (!response.ok) {
		throw new Error('Erro ao processar fetch')
	}

	return response.json()
}
