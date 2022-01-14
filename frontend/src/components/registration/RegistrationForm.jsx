import { Link } from 'react-router-dom';

import { Grid, Avatar, Button, TextField, Paper, Box, Typography } from '@mui/material';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

const PageOne = ({
	username,
	setUsername,
	dateOfBirth,
	setDateOfBirth,
	firstName,
	setFirstName,
	lastName,
	setLastName,
	email,
	setEmail,
	password,
	setPassword,
	confirmPassword,
	setConfirmPassword,
	handleSubmit,
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
					onSubmit={handleSubmit}
					noValidate
					sx={{
						mt: 1,
						display: 'flex',
						flexDirection: 'column',
						width: '90%',
					}}>
					<Box>
						<Grid container spacing={2}>
							<Grid item md={6}>
								<TextField
									margin='normal'
									required
									fullWidth
									id='first-name'
									label='First Name'
									name='first-name'
									value={firstName}
									autoComplete='firstName'
									autoFocus
									onChange={e => setFirstName(e.target.value)}
								/>
							</Grid>
							<Grid item md={6}>
								<TextField
									margin='normal'
									required
									fullWidth
									id='last-name'
									label='Last Name'
									name='last-name'
									value={lastName}
									autoComplete='lastName'
									autoFocus
									onChange={e => setLastName(e.target.value)}
								/>
							</Grid>
						</Grid>
					</Box>
					<Box>
						<TextField
							margin='normal'
							required
							fullWidth
							id='username'
							label='Username'
							name='username'
							value={username}
							autoComplete='username'
							autoFocus
							onChange={e => setUsername(e.target.value)}
						/>
					</Box>

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
						sx={{ mb: '1.5em' }}
					/>

					<>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								label='Date of Birth'
								value={dateOfBirth}
								onChange={newValue => setDateOfBirth(newValue)}
								renderInput={params => <TextField {...params} />}
								sx={{ width: '100%' }}
							/>
						</LocalizationProvider>
					</>

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
						sx={{ mt: '1.5em' }}
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

					<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
						Register Account
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

export default PageOne;
