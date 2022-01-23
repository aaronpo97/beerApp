import { Grid, Container } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import ms from 'ms';

import RegistrationForm from '../components/user_functions/RegistrationForm';
const blocklistedWords = ['1^Ce9T]Re-J|']; //test phrase

const Register = () => {
   const initialRegistrationData = {
      username: '',
      dateOfBirth: null,
      password: '',
      confirmPassword: '',
      email: '',
      firstName: '',
      lastName: '',
   };

   const navigate = useNavigate();

   const [formValues, setFormValues] = useState(initialRegistrationData);
   const [formErrors, setFormErrors] = useState({});

   const handleSubmit = event => {
      event.preventDefault();

      const validateData = async () => {
         const { firstName, lastName, password, username, email, dateOfBirth, confirmPassword } = formValues;
         const errors = {};
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

         const checkUserInDB = async (usernameQuery, emailQuery) => {
            try {
               const response = await fetch(
                  `/api/users/checkifuserexists?username=${usernameQuery}&email=${emailQuery}`
               );
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
            errors.username = 'Username is required.';
         } else if (blocklistedWords.includes(username)) {
            errors.username = 'That username is not allowed.';
         } else if (userQueryResponse.usernameExists) {
            errors.username = 'That username is taken.';
         }

         if (!dateOfBirth) {
            errors.dateOfBirth = 'Date of birth is required.';
         } else if (!checkDateOfBirth()) {
            errors.dateOfBirth = `You are not old enough to use this application.`;
         }

         if (!password) {
            errors.password = 'Password is required.';
         }
         if (!confirmPassword) {
            errors.confirmPassword = 'Please confirm your password.';
         } else if (password !== confirmPassword) {
            errors.confirmPassword = 'Password and confirm password do not match.';
         }

         if (!email) {
            errors.email = 'Email is required.';
         } else if (!emailRegex.test(email)) {
            errors.email = 'That email is invalid.';
         }

         if (!firstName) {
            errors.firstName = 'First name is required.';
         }
         if (!lastName) {
            errors.lastName = 'Last name is required.';
         }

         if (Object.keys(errors).length) {
            setFormErrors(errors);
            throw new Error('Form validation failed.');
         }
      };

      const registerUser = async () => {
         const url = '/api/users/register';
         const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formValues),
         };

         const response = await fetch(url, requestOptions);
         if (response.status !== 201) throw new Error('Oops!');
         const data = await response.json();

         return data;
      };

      const handleLoginAndRedirect = data => {
         //login user with new credentials
         localStorage['access-token'] = data.payload.accessToken;
         localStorage['refresh-token'] = data.payload.refreshToken;

         //take user to profile page, where they are prompted to check email for confirmation link
         navigate(`/profile/${data.payload.newUser._id}`);
      };

      //function calls
      validateData()
         .then(() => registerUser())
         .then(data => handleLoginAndRedirect(data))
         .catch(err => console.log(err));
   };

   const handleFormInputChange = event => {
      setFormValues({ ...formValues, [event.target.name]: event.target.value });
   };

   const handleDatePickerChange = value => {
      setFormValues({ ...formValues, dateOfBirth: value });
   };
   return (
      <Container>
         <Grid container component='main' sx={{ height: '100vh' }}>
            <RegistrationForm
               formValues={formValues}
               setFormValues={setFormValues}
               handleSubmit={handleSubmit}
               formErrors={formErrors}
               handleFormInputChange={handleFormInputChange}
               handleDatePickerChange={handleDatePickerChange}
            />
         </Grid>
      </Container>
   );
};

export default Register;
