import React from 'react';
import ReactDOM from 'react-dom';
import Beers from './routes/Beers';
import Home from './routes/Home';

import LoginPage from './routes/LoginPage';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateBeer from './routes/CreateBeer';
import InfoPage from './routes/InfoPage';

import Register from './routes/Register';

ReactDOM.render(
	<BrowserRouter>
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/beers' element={<Beers />} />
			<Route path='/register' element={<Register />} />
			<Route path='/beers/:id' element={<InfoPage />} />
			<Route path='/beers/:id/edit' element={<InfoPage />} />
			<Route path='/create' element={<CreateBeer />} />
			<Route path='/login' element={<LoginPage />} />
		</Routes>
	</BrowserRouter>,
	document.getElementById('root')
);
