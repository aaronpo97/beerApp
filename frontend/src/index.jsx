import React from 'react';
import ReactDOM from 'react-dom';
import Beers from './routes/Beers';
import Home from './routes/Home';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateBeerForm from './routes/CreateBeerForm';
import BeerInfo from './components/BeerInfo';

ReactDOM.render(
	<BrowserRouter>
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/beers' element={<Beers />} />
			<Route path='/beers/:id' element={<BeerInfo />} />
			<Route path='/create' element={<CreateBeerForm />} />
		</Routes>
	</BrowserRouter>,
	document.getElementById('root')
);
