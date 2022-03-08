import { useContext, useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Button,
  Box,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';

import { AuthContext } from '../util/AuthContext';
import checkCredentials from '../api/checkCredentials';

const PageBoilerplate = (): JSX.Element => {
  const [currentUser, dispatch] = useContext(AuthContext);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event): void => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = (): void => setAnchorElUser(null);

  const pagesLoggedIn = [
    { name: 'beers', link: '/beers' },
    { name: 'breweries', link: '/breweries' },
  ];
  const pagesNotLoggedIn = [
    { name: 'login', link: '/login' },
    { name: 'register', link: '/register' },
    { name: 'beers', link: '/beers' },
    { name: 'breweries', link: '/breweries' },
  ];
  const settings = [
    {
      name: 'Profile',
      action: (): void => navigate(`/profile/${currentUser?._id}`),
    },
    {
      name: 'Account Settings',
      action: (): void => navigate(`/account-settings`),
    },
    {
      name: 'Logout',
      action: (): void => {
        localStorage.clear();
        dispatch({ type: 'UPDATE_CURRENT_USER', payload: {} });
        navigate('/login');
      },
    },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    checkCredentials(dispatch);
  }, [dispatch]);

  return (
    <>
      <AppBar position='fixed' elevation={12}>
        <Container maxWidth='xl'>
          <Toolbar sx={{ flexWrap: 'wrap' }}>
            <Typography
              variant='h6'
              noWrap
              component='a'
              sx={{ mr: 5, display: { xs: 'none', md: 'flex' }, cursor: 'pointer' }}
              onClick={() => navigate('/')}
            >
              The Biergarten Index
            </Typography>
            <Box sx={{ flexGrow: 1, display: 'flex' }}>
              {currentUser._id ? (
                <>
                  {pagesLoggedIn.map((page) => (
                    <Button
                      key={page.name}
                      variant='contained'
                      disableElevation
                      onClick={() => navigate(page.link)}
                    >
                      <Typography variant='h6'>{page.name}</Typography>
                    </Button>
                  ))}
                </>
              ) : (
                pagesNotLoggedIn.map((page) => (
                  <Button
                    key={page.name}
                    variant='contained'
                    disableElevation
                    onClick={() => navigate(page.link)}
                  >
                    <Typography variant='h6'>{page.name}</Typography>
                  </Button>
                ))
              )}
            </Box>
            <Box>
              {currentUser._id && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Tooltip title='Open settings'>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mt: 1 }}>
                      <Avatar
                        alt={`${currentUser.firstName} ${currentUser.lastName}`}
                        src={currentUser?.profile?.displayImage?.url ?? ''}
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id='menu-appbar'
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting.name}>
                        <Typography component='a' textAlign='center' onClick={setting.action}>
                          {setting.name}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                  <Typography sx={{ mb: 0.5, fontSize: '10pt' }}>
                    {currentUser ? currentUser.username : ''}
                  </Typography>
                </Box>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />

      <Outlet />
    </>
  );
};

export default PageBoilerplate;
