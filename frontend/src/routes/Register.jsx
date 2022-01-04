import { Grid } from '@mui/material';
import RegisterPageOne from '../components/registration/RegisterPageOne';
import { useState } from 'react';
import SideImage from '../components/misc/SideImage';
import RegisterPageTwo from '../components/registration/RegisterPageTwo';

const checkUsername = username => {
	return username ? true : false;
};
const checkDateOfBirth = dateOfBirth => {
	if (!dateOfBirth) return false;
	const minimumDOB = Date.now() - 599_594_400_000;
	return dateOfBirth <= minimumDOB;
};
const Register = () => {
	const checkData = event => {
		event.preventDefault();
		const isUsernameAvailable = checkUsername(username);
		const isOldEnough = checkDateOfBirth(dateOfBirth);

		if (!isUsernameAvailable) {
			console.log('your username got taken bruv');
			return;
		}
		if (!isOldEnough) {
			console.log(`You're too young to use this app buckaroo`);
			return;
		}

		setIsDataVerified(true);
	};
	const [username, setUsername] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [email, setEmail] = useState('');
	const [confirmEmail, setConfirmEmail] = useState('');

	const [isDataVerified, setIsDataVerified] = useState(false);

	return (
		<Grid container component='main' sx={{ height: '100vh' }}>
			<SideImage
				imageUrl={
					'https://images.pexels.com/photos/5659494/pexels-photo-5659494.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
				}
			/>

			{!isDataVerified ? (
				<RegisterPageOne
					checkData={checkData}
					username={username}
					setUsername={setUsername}
					dateOfBirth={dateOfBirth}
					setDateOfBirth={setDateOfBirth}
				/>
			) : (
				<RegisterPageTwo
					password={password}
					setPassword={setPassword}
					email={email}
					setEmail={setEmail}
					setConfirmEmail={setConfirmEmail}
					confirmPassword={confirmPassword}
					setConfirmPassword={setConfirmPassword}
				/>
			)}
		</Grid>
	);
};

export default Register;
