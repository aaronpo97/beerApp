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
                    <Typography variant='h6'>
                      <Button variant='contained' onClick={() => navigate(page.link)}>
                        {page.name}
                      </Button>
                    </Typography>
                  ))}
                  <Button variant='contained' onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                pagesNotLoggedIn.map(page => (
                  <Typography variant='h6'>
                    <Button variant='contained' onClick={() => navigate(page.link)}>
                      {page.name}
                    </Button>
                  </Typography>
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
