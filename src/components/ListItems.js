import * as React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PeopleIcon from '@mui/icons-material/People'
import BarChartIcon from '@mui/icons-material/BarChart'
import { ChangeCircle } from '@mui/icons-material'

export const listItems = (
	<React.Fragment>
		<ListItemButton to="/">
			<ListItemIcon>
				<BarChartIcon />
			</ListItemIcon>
			<ListItemText primary="Relatório Estoque" />
		</ListItemButton>
		<ListItemButton to="/produtos">
			<ListItemIcon>
				<ShoppingCartIcon />
			</ListItemIcon>
			<ListItemText primary="Produtos" />
		</ListItemButton>
		<ListItemButton to="/estoque/movimentacao">
			<ListItemIcon>
				<ChangeCircle />
			</ListItemIcon>
			<ListItemText primary="Movimentações" />
		</ListItemButton>
		<ListItemButton to="/usuarios">
			<ListItemIcon>
				<PeopleIcon />
			</ListItemIcon>
			<ListItemText primary="Usuários" />
		</ListItemButton>
	</React.Fragment>
)
