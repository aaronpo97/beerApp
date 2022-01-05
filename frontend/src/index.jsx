import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import theme from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';

import BeerInfoPage from './routes/BeerInfoPage';
import Beers from './routes/BeerIndex';
import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';
import CreateBeer from './routes/CreateBeer';
import BreweryIndex from './routes/BreweryIndex';
import BreweryInfoPage from './routes/BreweryInfoPage';

const App = () => {
	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/beers' element={<Beers />} />
					<Route path='/beers/:id' element={<BeerInfoPage />} />
					<Route path='/breweries/:id' element={<BreweryInfoPage />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/create' element={<CreateBeer />} />
				</Routes>
			</ThemeProvider>
		</BrowserRouter>
	);
};
ReactDOM.render(<App />, document.querySelector('#root'));
