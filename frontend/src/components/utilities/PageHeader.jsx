import { useContext, useState } from 'react';
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

import { UserContext } from '../../util/UserContext';

const PageHeader = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [currentUser, dispatch] = useContext(UserContext);

  const pagesLoggedIn = [
    { name: 'beers', link: '/beers' },
    { name: 'breweries', link: '/breweries' },
  ];
  const pagesNotLoggedIn = [
    { name: 'login', link: '/login' },
    { name: 'register', link: '/register' },
  ];
  const settings = [
    { name: 'Profile', action: () => navigate(`/profile/${currentUser?._id}`) },
    { name: 'Account Settings', action: () => navigate(`/account-settings`) },
    {
      name: 'Logout',
      action: () => {
        localStorage.clear();
        dispatch({ type: 'UPDATE_CURRENT_USER', payload: {} });
        navigate('/login');
      },
    },
  ];

  const navigate = useNavigate();

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
              {currentUser ? (
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
              {currentUser && (
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
                      <MenuItem key={setting}>
                        <Typography component='a' textAlign='center' onClick={setting.action}>
                          {setting.name}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                  <Typography sx={{ mb: 0.5 }}>
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

export default PageHeader;
