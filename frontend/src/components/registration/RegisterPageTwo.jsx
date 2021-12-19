import { Link } from 'react-router-dom';

import { Grid, Avatar, Button, TextField, Paper, Box, Typography } from '@mui/material';

const RegisterForm = ({
	password,
	setPassword,
	email,
	setEmail,
	confirmPassword,
	setConfirmPassword,
	confirmEmail,
	setConfirmEmail,
}) => {
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
					noValidate
					sx={{ mt: 1, display: 'flex', flexDirection: 'column', width: '90%' }}>
					<TextField
						margin='normal'
						required
						fullWidth
						id='email'
						label='Email'
						name='email'
						value={email}
						type='email'
						autoComplete='email'
						autoFocus
						onChange={e => setEmail(e.target.value)}
					/>
					<TextField
						margin='normal'
						required
						fullWidth
						id='password'
						label='Password'
						name='password'
						value={password}
						type='password'
						autoComplete='password'
						autoFocus
						onChange={e => setPassword(e.target.value)}
					/>
					<TextField
						margin='normal'
						required
						type='password'
						fullWidth
						id='confirm-password'
						label='Confirm Password'
						name='confirm-password'
						value={confirmPassword}
						autoComplete='password'
						autoFocus
						onChange={e => setConfirmPassword(e.target.value)}
					/>

					<>
						<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
							Create an Account
						</Button>
					</>
				</Box>
			</Box>
		</Grid>
	);
};

export default RegisterForm;
