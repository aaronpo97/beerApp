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
	setPageNum,
	firstName,
	setFirstName,
	lastName,
	setLastName,
}) => {
	const checkUsername = () => {
		return username ? true : false;
	};
	const checkDateOfBirth = () => {
		if (!dateOfBirth) return false;
		const minimumDOB = Date.now() - 599_594_400_000;
		return dateOfBirth <= minimumDOB;
	};

	const checkData = () => {
		if (checkUsername() && checkDateOfBirth()) {
			setPageNum(2);
		}

		if (!checkUsername) console.log('something is up with your username dude');
		if (!checkDateOfBirth) console.log(`you're too young to use this app dude`);
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
					onSubmit={e => {
						e.preventDefault();
						checkData();
					}}
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
									// required
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
									// required
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
					<Box sx={{ mb: '1em' }}>
						<TextField
							margin='normal'
							// required
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

					<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
						go to next step
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
