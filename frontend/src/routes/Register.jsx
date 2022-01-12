import { Grid } from '@mui/material';
import { useState } from 'react';
import SideImage from '../components/misc/SideImage';

import PageOne from '../components/registration/PageOne';
import PageTwo from '../components/registration/PageTwo';
import PageThree from '../components/registration/PageThree';

const RegisterPageSelection = () => {
	const [username, setUsername] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState(null);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [email, setEmail] = useState('');
	const [pageNum, setPageNum] = useState(1);

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

	switch (pageNum) {
		case 1:
			return (
				<PageOne
					username={username}
					setUsername={setUsername}
					dateOfBirth={dateOfBirth}
					setDateOfBirth={setDateOfBirth}
					pageNum={pageNum}
					setPageNum={setPageNum}
					firstName={firstName}
					setFirstName={setFirstName}
					lastName={lastName}
					setLastName={setLastName}
				/>
			);
		case 2:
			return (
				<PageTwo
					password={password}
					setPassword={setPassword}
					email={email}
					setEmail={setEmail}
					confirmPassword={confirmPassword}
					setConfirmPassword={setConfirmPassword}
					pageNum={pageNum}
					setPageNum={setPageNum}
				/>
			);
		case 3:
			return <PageThree />;
	}
};
const Register = () => {
	return (
		<Grid container component='main' sx={{ height: '100vh' }}>
			<SideImage
				imageUrl={
					'https://images.pexels.com/photos/5659494/pexels-photo-5659494.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
				}
			/>
			<RegisterPageSelection />
		</Grid>
	);
};

export default Register;
