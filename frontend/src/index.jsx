import React from 'react';
import ReactDOM from 'react-dom';
import Beers from './routes/Beers';
import Home from './routes/Home';

import LoginPage from './routes/LoginPage';

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import CreateBeer from './routes/CreateBeer';
import InfoPage from './routes/InfoPage';
import EditInfo from './routes/EditInfo';
import PageHeader from './components/PageHeader';
import Register from './routes/Register';
import { Container } from 'semantic-ui-react';

const App = () => {
	return (
		<BrowserRouter>
			<Container>
				<PageHeader />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/beers' element={<Beers />} />
					<Route path='/register' element={<Register />} />
					<Route path='/beers/:id' element={<InfoPage />} />
					<Route path='/beers/:id/edit' element={<EditInfo />} />

					<Route path='/create' element={<CreateBeer />} />
					<Route path='/login' element={<LoginPage />} />
				</Routes>
			</Container>
		</BrowserRouter>
	);
};

ReactDOM.render(<App />, document.querySelector('#root'));
