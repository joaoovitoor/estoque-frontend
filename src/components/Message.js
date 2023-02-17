import React from 'react'
import { Alert } from '@mui/material'

export const Message = ({ variant, message }) => {
	return (
		<>	
			{message && (
				<Alert variant="filled" severity={variant}>
					{message}
				</Alert>
			)}
		</>
	)
}
