import React from 'react';
import ReactDOM from 'react-dom';
import Beers from './routes/Beers';
import Home from './routes/Home';

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import CreateBeer from './routes/CreateBeer';
import InfoPage from './routes/InfoPage';
import EditInfo from './routes/EditInfo';
import Login from './routes/Login';

import PageHeader from './components/PageHeader';
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
					<Route path='/logout' element={<>{localStorage.clear()}</>} />
					<Route path='/register' element={<Register />} />
				</Routes>
			</ThemeProvider>
		</BrowserRouter>
	);
};

ReactDOM.render(<App />, document.querySelector('#root'));
