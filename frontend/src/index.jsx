import { StrictMode, useState, useEffect, useReducer } from 'react';

import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import theme from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';

import PageHeader from './components/utilities/PageHeader';

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
import CreateBrewery from './routes/CreateBrewery';
import EditBrewery from './routes/EditBrewery';

import SearchBeers from './routes/SearchBeers';
import EditBeer from './routes/EditBeerPage';
import NotFound from './routes/NotFound';

import AccountSettingsPage from './routes/AccountSettingsPage';

import { UserContext } from './util/UserContext';

const App = () => {
  const reducer = (currentUser, action) => {
    switch (action.type) {
      case 'UPDATE_EMAIL':
        return { ...currentUser, email: action.payload.email };
      case 'UPDATE_CURRENT_USER':
        return { ...action.payload };
      case 'CONFIRM_USER_ACCOUNT': {
        return { ...currentUser, isAccountConfirmed: action.payload.isAccountConfirmed };
      }
      default:
        return { ...currentUser };
    }
  };

  const [currentUser, dispatch] = useReducer(reducer, {});

  useEffect(() => {
    const checkCredentials = async () => {
      if (!(localStorage['access-token'] && localStorage['refresh-token'])) return;
      const requestOptions = {
        method: 'GET',
        headers: {
          'x-access-token': localStorage['access-token'],
          'x-auth-token': localStorage['refresh-token'],
        },
      };
      const response = await fetch('/api/users/verifytoken', requestOptions);
      const data = await response.json();

      dispatch({ type: 'UPDATE_CURRENT_USER', payload: data.payload });
    };
    checkCredentials();
  }, []);

  return (
    <StrictMode>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <UserContext.Provider value={[currentUser, dispatch]}>
            <Routes>
              <Route path='/' element={<PageHeader />}>
                <Route path='' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/beers' element={<BeerIndex />} />
                <Route path='/beers/create' element={<CreateBeer />} />
                <Route path='/beers/:id' element={<BeerInfoPage />} />
                <Route path='/beers/:id/edit' element={<EditBeer />} />
                <Route path='/beers/search' element={<SearchBeers />} />
                <Route path='/breweries' element={<BreweryIndex />} />
                <Route path='/breweries/create' element={<CreateBrewery />} />
                <Route path='/breweries/:id' element={<BreweryInfoPage />} />
                <Route path='/breweries/:id/edit' element={<EditBrewery />} />
                <Route path='/profile/:id' element={<ProfilePage />} />
                <Route path='/account-settings' element={<AccountSettingsPage />} />
                <Route
                  path='/confirmaccount/:userId/:confirmationToken'
                  element={<ConfirmAccount />}
                />

                <Route path='*' element={<NotFound />} />
              </Route>
            </Routes>
          </UserContext.Provider>
        </ThemeProvider>
      </BrowserRouter>
    </StrictMode>
  );
};
ReactDOM.render(<App />, document.querySelector('#root'));
