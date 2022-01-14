import { Grid } from '@mui/material';
import { useState } from 'react';
<<<<<<< HEAD
import { useNavigate } from 'react-router';

import RegistrationForm from '../components/registration/RegistrationForm';
import { Grid, Container } from '@mui/material';
=======
import SideImage from '../components/misc/SideImage';
>>>>>>> 9ec18256559f920e60b5af3b3ef5deb92c13b31b

import PageOne from '../components/registration/PageOne';
import PageTwo from '../components/registration/PageTwo';
import PageThree from '../components/registration/PageThree';

<<<<<<< HEAD
const Register = () => {
  const blocklistedWords = ['1^Ce9T]Re-J|']; //test phrase

  const initialRegistrationData = {
    username: '',
    dateOfBirth: null,
    password: '',
    confirmPassword: '',
    email: '',
    firstName: '',
    lastName: '',
  };

  const [registrationFormValues, setRegistrationFormValues] = useState(initialRegistrationData);

  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();

    const validateData = async () => {
      const { firstName, lastName, password, username, email, dateOfBirth, confirmPassword } = registrationFormValues;
      const errors = {};
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

      const checkUserInDB = async (usernameQuery, emailQuery) => {
        const response = await fetch(`http://localhost:5000/users/doesuserexist?username=${usernameQuery}&email=${emailQuery}`);
        const data = await response.json();
        return data.payload;
      };

      const checkDateOfBirth = () => {
        if (!dateOfBirth) return false;
        const minimumDOB = Date.now() - ms('19 years');

        return dateOfBirth <= minimumDOB;
      };

      const userQueryResponse = await checkUserInDB(username, email);

      if (!username) {
        errors.username = 'username is required.';
      } else if (blocklistedWords.includes(username)) {
        errors.username = 'that username is not allowed.';
      } else if (userQueryResponse.usernameExists) {
        errors.username = 'that username is taken';
      }

      if (!dateOfBirth) {
        errors.dateOfBirth = 'date of birth is required.';
      } else if (!checkDateOfBirth()) {
        errors.dateOfBirth = `You're not old enough to use this application.`;
      }

      if (!password) {
        errors.password = 'password is required.';
      } else if (password !== confirmPassword) {
        errors.password = 'Password and confirm password do not match.';
      }

      if (!email) {
        errors.email = 'email is required.';
      } else if (!emailRegex.test(email)) {
        errors.email = 'that email is invalid.';
      }

      if (!firstName) {
        errors.firstName = 'first name is required.';
      }
      if (!lastName) {
        errors.lastName = 'last name is required.';
      }

      setFormErrors(errors);
    };

    // const registerUser = async () => {
    //   const url = 'http://localhost:5000/users/register';
    //   const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(registrationFormValues),
    //   };

    //   const response = await fetch(url, requestOptions);

    //   if (response.status !== 201) throw new Error('Oops!');

    //   const data = await response.json();

    //   //login user with new credentials
    //   localStorage['access-token'] = data.payload.accessToken;
    //   localStorage['refresh-token'] = data.payload.refreshToken;

    //   //take user to profile page, where they are prompted to check email for confirmation link
    //   navigate(`/users/${data.payload.newUser._id}`);
    // };

    validateData().then(() => {
      console.log('suh dude');
    });
  };

  return (
    <Container>
      <Grid container component='main' sx={{ height: '100vh' }}>
        {/* <SideImage
        imageUrl={
          'https://images.pexels.com/photos/5659494/pexels-photo-5659494.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        }
      /> */}
        <RegistrationForm
          registrationFormValues={registrationFormValues}
          setRegistrationFormValues={setRegistrationFormValues}
          handleSubmit={handleSubmit}
          formErrors={formErrors}
        />
      </Grid>
    </Container>
  );
=======
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
>>>>>>> 9ec18256559f920e60b5af3b3ef5deb92c13b31b
};

export default Register;
