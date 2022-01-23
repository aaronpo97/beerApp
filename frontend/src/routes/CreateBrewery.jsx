import { useState, useEffect } from 'react';
import {
   Container,
   Box,
   TextField,
   Typography,
   Select,
   MenuItem,
   Button,
   Grid,
   FormControl,
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import CreateBreweryForm from '../components/brewery_components/CreateBreweryForm';

const CreateBrewery = () => {
   const navigate = useNavigate();
   const [formValues, setFormValues] = useState({
      name: '',
      description: '',
      address: '',
   });
   const [formErrors, setFormErrors] = useState({});

   //get brewery list
   const [breweryList, setBreweryList] = useState([]);

   const onFormSubmit = event => {
      event.preventDefault();
      const validateData = async () => {
         const errors = {};

         if (!formValues.name) {
            errors.name = 'Brewery name is required.';
         }

         if (!formValues.description) {
            errors.description = 'Description is required.';
         }
         if (formValues.description.length < 20) {
            console.log(formValues.description.length);
            errors.description = 'Description must be greater than 20 characters.';
         }

         if (!formValues.address) {
            errors.address = 'Address is required.';
         }
         console.log(errors);
         if (Object.keys(errors).length) {
            setFormErrors(errors);
            throw new Error('Form validation failed.');
         }
      };

      const handleSubmit = () => {
         const postData = async () => {
            const requestOptions = {
               method: 'POST',
               headers: {
                  'x-access-token': localStorage['access-token'],
                  'x-auth-token': localStorage['refresh-token'],
                  'Content-type': 'application/json',
               },
               body: JSON.stringify(formValues),
            };
            const response = await fetch('/api/breweries/', requestOptions);
            const data = await response.json();
            if (!data.payload) return;
            const post = data.payload;
            navigate(`/breweries/${post._id}`);
         };
         postData();
      };

      validateData()
         .then(() => handleSubmit())
         .catch(error => console.error(error));
   };

   useEffect(() => {
      const fetchData = async () => {
         const requestOptions = {
            method: 'GET',
            headers: {
               'x-access-token': localStorage['access-token'],
               'x-auth-token': localStorage['refresh-token'],
            },
         };
         const url = `http://localhost:5000/api/breweries`;
         const response = await fetch(url, requestOptions);
         const data = await response.json();
         setBreweryList(data.payload || []);
         localStorage['access-token'] = response.newAccessToken || localStorage['access-token'];
         if (response.status === 401) {
            localStorage.clear();
         }
      };
      fetchData();
   }, []);

   const handleFormInputChange = event => {
      setFormValues({ ...formValues, [event.target.name]: event.target.value });
   };

   return (
      <Box>
         <Box>
            <img
               style={{ height: '30em', width: '100%', objectFit: 'cover' }}
               src={'https://source.unsplash.com/random?biergarten'}
               alt={'A drinking patio at a bar'}
            />
         </Box>
         <Container sx={{ marginTop: 4 }}>
            <Grid container sx={{ mt: 5 }}>
               <Grid item md={10} sm={12}>
                  <Typography variant='h1'>The Biergarten Index</Typography>
                  <Typography variant='h2' gutterBottom sx={{ mb: '1em' }}>
                     Breweries
                  </Typography>
               </Grid>
               <Grid md={2} sm={12} item>
                  <Button
                     startIcon={<ArrowBackIcon />}
                     onClick={() => navigate('/breweries')}
                     variant='contained'
                     sx={{ width: '100%' }}
                  >
                     Go back
                  </Button>
               </Grid>
            </Grid>
            <CreateBreweryForm
               formValues={formValues}
               formErrors={formErrors}
               handleFormInputChange={handleFormInputChange}
               handleSubmit={onFormSubmit}
               breweryList={breweryList}
            />
         </Container>
      </Box>
   );
};
export default CreateBrewery;
