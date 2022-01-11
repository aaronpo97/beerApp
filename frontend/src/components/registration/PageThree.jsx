import { Grid, Paper, Box, Avatar, Typography, Button, Link } from '@mui/material';

const PageThree = () => {
	return (
		<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
			<Box
				sx={{
					my: 8,
					mx: 4,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				<Avatar sx={{ m: 1, bgcolor: 'primary.main' }}></Avatar>
				<Typography component='h1' variant='h5'>
					Create an Account
				</Typography>

				<Box
					component='form'
					onSubmit={e => {
						e.preventDefault();
					}}
					noValidate
					sx={{
						mt: 1,
						display: 'flex',
						flexDirection: 'column',
						width: '90%',
					}}>
					<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
						Create an Account
					</Button>

					<Grid container>
						<Grid item>
							<Link to={'/login'}>{'Already have an account?'}</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Grid>
	);
};

export default PageThree;
