import { StrictMode, useReducer } from 'react';
import { AuthContext } from './util/AuthContext';

import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import theme from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';

import Boilerplate from './pages/PageBoilerplate';

/* Beer Pages */
import BeerIndex from './pages/beerPages/BeerIndex';
import BeerInfoPage from './pages/beerPages/BeerInfoPage';
import CreateBeer from './pages/beerPages/CreateBeer';
import EditBeer from './pages/beerPages/EditBeerPage';

/* User and Account Pages */
import AccountSettingsPage from './pages/userAccountPages/AccountSettingsPage';
import ConfirmAccount from './pages/userAccountPages/ConfirmAccount';
import EditName from './pages/userAccountPages/EditName';
import EditUsername from './pages/userAccountPages/EditUsername';
import Login from './pages/userAccountPages/Login';
import PasswordResetPage from './pages/userAccountPages/PasswordResetPage';
import ProfilePage from './pages/userAccountPages/ProfilePage';
import Register from './pages/userAccountPages/Register';

/* Brewery Pages */
import BreweryIndex from './pages/breweryPages/BreweryIndex';
import BreweryInfoPage from './pages/breweryPages/BreweryInfoPage';
import CreateBrewery from './pages/breweryPages/CreateBrewery';
import EditBrewery from './pages/breweryPages/EditBrewery';

/* Misc. Pages */
import Home from './pages/miscPages/Home';
import NotFound from './pages/miscPages/NotFound';

const App = () => {
  const reducer = (currentUser, action) => {
    switch (action.type) {
      case 'UPDATE_EMAIL':
        return { ...currentUser, email: action.payload.email };
      case 'UPDATE_USERNAME':
        return { ...currentUser, username: action.payload.username };
      case 'UPDATE_CURRENT_USER':
        return { ...action.payload };
      case 'CONFIRM_USER_ACCOUNT': {
        return { ...currentUser, isAccountConfirmed: action.payload.isAccountConfirmed };
      }
      default:
        return { ...currentUser };
    }
  };

  return (
    <StrictMode>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <AuthContext.Provider value={useReducer(reducer, {})}>
            <Routes>
              <Route path='/' element={<Boilerplate />}>
                <Route path='' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/beers' element={<BeerIndex />} />
                <Route path='/beers/create' element={<CreateBeer />} />
                <Route path='/beers/:id' element={<BeerInfoPage />} />
                <Route path='/beers/:id/edit' element={<EditBeer />} />
                <Route path='/beers/search' element={<></>} />
                <Route path='/breweries' element={<BreweryIndex />} />
                <Route path='/breweries/create' element={<CreateBrewery />} />
                <Route path='/breweries/:id' element={<BreweryInfoPage />} />
                <Route path='/breweries/:id/edit' element={<EditBrewery />} />
                <Route path='/profile/:id' element={<ProfilePage />} />
                <Route path='/account-settings' element={<AccountSettingsPage />} />
                <Route path='/updateusername' element={<EditUsername />} />
                <Route path='/updatename' element={<EditName />} />
                <Route path='/updateemail' element={<EditUsername />} />
                <Route path='/confirmaccount/:userId/:confirmationToken' element={<ConfirmAccount />} />
                <Route path='/forgotpassword' element={<PasswordResetPage />} />

                <Route path='*' element={<NotFound />} />
              </Route>
            </Routes>
          </AuthContext.Provider>
        </ThemeProvider>
      </BrowserRouter>
    </StrictMode>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
