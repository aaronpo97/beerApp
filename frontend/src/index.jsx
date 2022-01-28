import { StrictMode, useState, useEffect } from 'react';

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
import ConfirmPage from './routes/ConfirmPage';
import ProfilePage from './routes/ProfilePage';
import CreateBrewery from './routes/CreateBrewery';
import EditBrewery from './routes/EditBrewery';

import SearchBeers from './routes/SearchBeers';
import EditBeer from './routes/EditBeerPage';

import { UserContext } from './util/UserContext';

const UserProvider = ({ value, children }) => <UserContext.Provider value={value} children={children} />;

const NotFound = () => {
   return <div>404 not found</div>;
};
const App = () => {
   const [currentUser, setCurrentUser] = useState(null);

   useEffect(() => {
      if (currentUser) return;
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
         if (response.status === 200) setCurrentUser(data.payload);
      };
      checkCredentials();
   }, [currentUser]);

   return (
      <StrictMode>
         <BrowserRouter>
            <ThemeProvider theme={theme}>
               <CssBaseline />

               <UserProvider value={currentUser}>
                  <Routes>
                     <Route path='/' element={<PageHeader setCurrentUser={setCurrentUser} />}>
                        <Route path='' element={<Home />} />
                        <Route path='/login' element={<Login setCurrentUser={setCurrentUser} />} />
                        <Route path='/register' element={<Register setCurrentUser={setCurrentUser} />} />
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
                        <Route
                           path='/confirmaccount/:userId/:confirmationToken'
                           element={<ConfirmAccount />}
                        />
                        <Route path='/confirmaccount/' element={<ConfirmPage />} />
                        <Route path='*' element={<NotFound />} />
                     </Route>
                  </Routes>
               </UserProvider>
            </ThemeProvider>
         </BrowserRouter>
      </StrictMode>
   );
};
ReactDOM.render(<App />, document.querySelector('#root'));
