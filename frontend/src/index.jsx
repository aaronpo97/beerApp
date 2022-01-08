import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import theme from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';

import PageHeader from './components/misc/PageHeader';

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
				<PageHeader />
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
