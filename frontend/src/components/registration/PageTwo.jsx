import { Link } from 'react-router-dom';

import { Grid, Avatar, Button, TextField, Paper, Box, Typography } from '@mui/material';

const PageTwo = ({
	password,
	setPassword,
	email,
	setEmail,
	confirmPassword,
	setConfirmPassword,
	setPageNum,
}) => {
	const handleSubmit = () => {
		if (password === confirmPassword) return setPageNum(3);

		setPassword('');
		setConfirmPassword('');
	};
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
					sx={{ mt: 1, display: 'flex', flexDirection: 'column', width: '90%' }}
					onSubmit={e => {
						e.preventDefault();
						handleSubmit();
					}}>
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

					<Box>
						<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
							Create an Account
						</Button>
					</Box>
				</Box>
			</Box>
		</Grid>
	);
};

export default PageTwo;
