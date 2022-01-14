import { Grid, Container } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import ms from 'ms';

import RegistrationForm from '../components/registration/RegistrationForm';

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
        try {
          const response = await fetch(`http://localhost:5000/users/doesuserexist?username=${usernameQuery}&email=${emailQuery}`);
          const data = await response.json();
          return data.payload;
        } catch (error) {
          return { message: 'username and/or email was blank.' };
        }
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

      if (Object.keys(errors).length) {
        setFormErrors(errors);
        throw new Error('Form validation failed.');
      }
    };

    const registerUser = async () => {
      const url = 'http://localhost:5000/users/register';
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationFormValues),
      };

      const response = await fetch(url, requestOptions);

      if (response.status !== 201) throw new Error('Oops!');
    };

    const handleLoginAndRedirect = data => {
      //login user with new credentials
      localStorage['access-token'] = data.payload.accessToken;
      localStorage['refresh-token'] = data.payload.refreshToken;

      //take user to profile page, where they are prompted to check email for confirmation link
      navigate(`/users/${data.payload.newUser._id}`);
    };

    //function calls
    validateData()
      .then(() => registerUser())
      .then(data => handleLoginAndRedirect(data))
      .catch(err => console.log(err));
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
};

export default Register;
