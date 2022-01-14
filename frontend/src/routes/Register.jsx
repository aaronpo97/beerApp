import { useState } from 'react';
import { useNavigate } from 'react-router';

import SideImage from '../components/misc/SideImage';
import RegistrationForm from '../components/registration/RegistrationForm';
import { Grid } from '@mui/material';

import ms from 'ms'; // converts time into milliseconds

const Register = () => {
	const [username, setUsername] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState(null);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [email, setEmail] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

	const navigate = useNavigate();

	const handleSubmit = event => {
		event.preventDefault();

		const checkUserInDB = async () => {
			const response = await fetch(`http://localhost:5000/users/doesuserexist?username=${username}&email=${email}`);
			const data = await response.json();
			return data.payload;
		};

		const checkDateOfBirth = () => {
			if (!dateOfBirth) return false;
			const minimumDOB = Date.now() - ms('19 years');

			console.log(new Date(minimumDOB));
			return dateOfBirth <= minimumDOB;
		};

		const checkData = async () => {
			const { emailExists, usernameExists } = await checkUserInDB();
			const isOldEnough = checkDateOfBirth();

			if (usernameExists) return alert('That username is taken.');
			if (emailExists) return alert('An account with the given email is already registered.');
			if (!isOldEnough) return alert('You are not old enough to use that app. ');
		};

		const registerUser = async () => {
			const url = 'http://localhost:5000/users/register';
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, dateOfBirth, password, email, firstName, lastName }),
			};

			const response = await fetch(url, requestOptions);

			if (response.status !== 201) throw new Error('Oops!');

			const data = await response.json();

			//login user with new credentials
			localStorage['access-token'] = data.payload.accessToken;
			localStorage['refresh-token'] = data.payload.refreshToken;

			//take user to profile page, where they are prompted to check email for confirmation link
			navigate(`/users/${data.payload.newUser._id}`);
		};

		const submit = async () => {
			try {
				await checkData();
				await registerUser();
			} catch (error) {
				console.log(error);
			}
		};

		submit();
	};

	return (
		<Grid container component='main' sx={{ height: '100vh' }}>
			<SideImage
				imageUrl={
					'https://images.pexels.com/photos/5659494/pexels-photo-5659494.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
				}
			/>
			<RegistrationForm
				username={username}
				setUsername={setUsername}
				dateOfBirth={dateOfBirth}
				setDateOfBirth={setDateOfBirth}
				firstName={firstName}
				setFirstName={setFirstName}
				lastName={lastName}
				setLastName={setLastName}
				email={email}
				setEmail={setEmail}
				password={password}
				setPassword={setPassword}
				confirmPassword={confirmPassword}
				setConfirmPassword={setConfirmPassword}
				handleSubmit={handleSubmit}
			/>
		</Grid>
	);
};

export default Register;
