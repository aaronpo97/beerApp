import React from 'react';
import ReactDOM from 'react-dom';
import Beers from './routes/BeerIndex';
import Home from './routes/Home';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import InfoPage from './routes/InfoPage';
import Login from './routes/Login';

import Register from './routes/Register';

import { CssBaseline, ThemeProvider } from '@mui/material';

import theme from './theme';

const App = () => {
	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<CssBaseline />

				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/beers' element={<Beers />} />
					<Route path='/beers/:id' element={<InfoPage />} />

					<Route path='/login' element={<Login />} />

					<Route path='/register' element={<Register />} />
				</Routes>
			</ThemeProvider>
		</BrowserRouter>
	);
};

ReactDOM.render(<App />, document.querySelector('#root'));
