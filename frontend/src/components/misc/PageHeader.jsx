import { useNavigate } from 'react-router-dom';

import { AppBar, Toolbar, Container, Typography, Grid, Button } from '@mui/material';

const PageHeader = () => {
   const pagesLoggedIn = [
      { name: 'beers', link: '/beers' },
      { name: 'breweries', link: '/breweries' },
   ];
   const pagesNotLoggedIn = [
      { name: 'login', link: '/login' },
      { name: 'register', link: '/register' },
   ];

   const navigate = useNavigate();

   const handleLogout = () => {
      localStorage.clear();
      navigate('/login');
   };
   return (
      <>
         <AppBar position='fixed'>
            <Container maxWidth='xl'>
               <Toolbar sx={{ flexWrap: 'wrap' }}>
                  <>
                     {localStorage['access-token'] && localStorage['refresh-token'] ? (
                        <>
                           {pagesLoggedIn.map(page => (
                              <Button
                                 key={page.name}
                                 variant='contained'
                                 onClick={() => navigate(page.link)}
                              >
                                 <Typography variant='h6'>{page.name}</Typography>
                              </Button>
                           ))}
                           <Button variant='contained' onClick={handleLogout}>
                              <Typography variant='h6'>Logout</Typography>
                           </Button>
                        </>
                     ) : (
                        pagesNotLoggedIn.map(page => (
                           <Button
                              key={page.name}
                              variant='contained'
                              onClick={() => navigate(page.link)}
                           >
                              <Typography variant='h6'>{page.name}</Typography>
                           </Button>
                        ))
                     )}
                  </>
               </Toolbar>
            </Container>
         </AppBar>
         <Toolbar />
      </>
   );
};

export default PageHeader;
