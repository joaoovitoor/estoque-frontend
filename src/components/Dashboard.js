import { AuthContext } from '../contexts/AuthContext';
import logo from '../logo_previsao.png';
import { listItems } from './ListItems';
import { Login } from './Login';
import { Logout } from '@mui/icons-material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9),
            },
        }),
    },
}));

const mdTheme = createTheme();

function DashboardContent({ title, children }) {
    const { user, logout } = React.useContext(AuthContext);

    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <>
            {user ? (
                <ThemeProvider theme={mdTheme}>
                    <Box sx={{ display: 'flex' }}>
                        <CssBaseline />
                        <AppBar position='absolute' open={open}>
                            <Toolbar
                                sx={{
                                    pr: '24px', // keep right padding when drawer closed
                                    bgcolor: '#424242',
                                }}
                            >
                                <IconButton
                                    edge='start'
                                    color='inherit'
                                    aria-label='open drawer'
                                    onClick={toggleDrawer}
                                    sx={{
                                        marginRight: '36px',
                                        ...(open && { display: 'none' }),
                                    }}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Typography
                                    component='h1'
                                    variant='h6'
                                    color='inherit'
                                    noWrap
                                    sx={{ flexGrow: 1 }}
                                >
                                    {title}
                                </Typography>

                                <Button
                                    edge='end'
                                    color='inherit'
                                    aria-label='logout user'
                                    onClick={logout}
                                    sx={{
                                        marginRight: '36px',
                                        ...(open && { display: 'none' }),
                                    }}
                                >
                                    <Logout />
                                </Button>
                            </Toolbar>
                        </AppBar>
                        <Drawer variant='permanent' open={open}>
                            <Toolbar
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                    px: [1],
                                }}
                            >
                                <img src={logo} className='logo' alt='logo' />
                                <IconButton onClick={toggleDrawer}>
                                    <ChevronLeftIcon />
                                </IconButton>
                            </Toolbar>
                            <Divider />
                            <List component='nav'>{listItems}</List>
                        </Drawer>
                        <Box
                            component='main'
                            sx={{
                                backgroundColor: (theme) =>
                                    theme.palette.mode === 'light'
                                        ? theme.palette.grey[100]
                                        : theme.palette.grey[900],
                                flexGrow: 1,
                                height: '100vh',
                                overflow: 'auto',
                            }}
                        >
                            <Toolbar />

                            {children}
                        </Box>
                    </Box>
                </ThemeProvider>
            ) : (
                <Login />
            )}
        </>
    );
}

export const Dashboard = ({ title, children }) => {
    return <DashboardContent title={title}>{children}</DashboardContent>;
};
