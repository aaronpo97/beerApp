import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import theme from './theme';
import { CssBaseline, ThemeProvider, Box, Container } from '@mui/material';

import PageHeader from './components/misc/PageHeader';

import BeerInfoPage from './routes/BeerInfoPage';
import BeerIndex from './routes/BeerIndex';
import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';
import CreateBeer from './routes/CreateBeer';
import BreweryIndex from './routes/BreweryIndex';
import BreweryInfoPage from './routes/BreweryInfoPage';

import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
const UserInfoPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [user, setUser] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const requestOptions = {
				method: 'GET',
				headers: {
					'x-access-token': localStorage['access-token'],
					'x-auth-token': localStorage['refresh-token'],
				},
			};
			const url = `http://localhost:5000/users/${id}`;
			const response = await fetch(url, requestOptions);
			if (response.status === 404) return;
			if (response.status === 401) {
				localStorage.clear();
				navigate('/login');
			}
			const result = await response.json();
			if (!result.payload) return;
			localStorage['access-token'] = result.payload.newAccessToken || localStorage['access-token'];

			setUser(result.payload);
		};
		fetchData();
	}, []);

	useEffect(() => console.log(user), [user]);
	return (
		<Box>
			<Container maxWidth='xl'>{/* <h1>User: {user ? JSON.parse(user.payload) : null} </h1> */}</Container>
		</Box>
	);
};

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
					<Route path='/users/:id' element={<UserInfoPage />} />
				</Routes>
			</ThemeProvider>
		</BrowserRouter>
	);
};
ReactDOM.render(<App />, document.querySelector('#root'));
