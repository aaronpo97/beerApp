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
import ConfirmAccount from './routes/ConfirmAccount';

import ProfilePage from './routes/ProfilePage';

const { StrictMode } = React;
const App = () => {
  return (
    <StrictMode>
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
            <Route path='/profile/:id' element={<ProfilePage />} />
            <Route path='/confirmaccount/:userId/:confirmationToken' element={<ConfirmAccount />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </StrictMode>
  );
};
ReactDOM.render(<App />, document.querySelector('#root'));
