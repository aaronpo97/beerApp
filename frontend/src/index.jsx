import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import theme from './theme';
import { CssBaseline, ThemeProvider, AppBar, Box, Toolbar, IconButton, Typography, Button } from '@mui/material';
import UserIcon from '@mui/icons-material/Menu';

import BeerInfoPage from './routes/BeerInfoPage';
import BeerIndex from './routes/BeerIndex';
import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';
import CreateBeer from './routes/CreateBeer';
import BreweryIndex from './routes/BreweryIndex';
import BreweryInfoPage from './routes/BreweryInfoPage';

const App = () => {
	// const navigate = useNavigate();
	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Box sx={{ flexGrow: 1 }}>
					<AppBar position='sticky'>
						<Toolbar>
							<IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
								<UserIcon />
							</IconButton>
							<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
								the biergarten app
							</Typography>
							<Button color='inherit'>Beers</Button>
							<Button color='inherit'>Breweries</Button>
							<Button color='inherit'>Home</Button>
						</Toolbar>
					</AppBar>
				</Box>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/beers' element={<BeerIndex />} />
					<Route path='/beers/create' element={<CreateBeer />} />
					<Route path='/beers/:id' element={<BeerInfoPage />} />
					<Route path='/breweries' element={<BreweryIndex />} />
					<Route path='/breweries/:id' element={<BreweryInfoPage />} />
				</Routes>
			</ThemeProvider>
		</BrowserRouter>
	);
};
ReactDOM.render(<App />, document.querySelector('#root'));
