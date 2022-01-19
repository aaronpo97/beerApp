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

const CreateBeerForm = ({
   formValues,
   formErrors,
   handleSubmit,
   handleFormInputChange,
   breweryList,
}) => {
   return (
      <FormControl fullWidth component='form' onSubmit={handleSubmit} variant='outlined' noValidate>
         <TextField
            required
            value={formValues.name}
            id='name'
            label='Beer name'
            name='name'
            autoComplete='Beer name'
            autoFocus
            error={formErrors.name}
            onChange={handleFormInputChange}
            margin='normal'
            fullWidth
         />
         <TextField
            required
            value={formValues.type}
            id='type'
            label='Beer type'
            name='type'
            autoComplete='Beer type'
            autoFocus
            error={formErrors.type}
            onChange={handleFormInputChange}
            margin='normal'
            fullWidth
         />

         <Grid container spacing={3}>
            <Grid item md={6}>
               <TextField
                  variant='outlined'
                  value={formValues.abv}
                  id='outlined-adornment-abv'
                  label='ABV (alcohol by volume)'
                  name='abv'
                  error={formErrors.abv}
                  onChange={handleFormInputChange}
                  margin='normal'
                  fullWidth
               />
            </Grid>
            <Grid item md={6}>
               <TextField
                  variant='outlined'
                  value={formValues.ibu}
                  id='outlined-adornment-abv'
                  label='IBU (international bitterness units)'
                  name='ibu'
                  error={formErrors.ibu}
                  onChange={handleFormInputChange}
                  margin='normal'
                  fullWidth
               />
            </Grid>
         </Grid>
         <TextField
            required
            variant='outlined'
            value={formValues.description}
            id='outlined-adornment-abv'
            label='Description'
            name='description'
            error={formErrors.description}
            onChange={handleFormInputChange}
            sx={{ mb: 2 }}
            margin='normal'
            multiline
            rows={10}
            fullWidth
         />

         <Select
            labelId='brewery-select'
            label='brewery'
            value={formValues.brewery}
            fullWidth
            name='brewery'
            onChange={handleFormInputChange}
         >
            {breweryList.map(brewery => {
               return (
                  <MenuItem key={brewery.name} value={brewery._id}>
                     {brewery.name}
                  </MenuItem>
               );
            })}
         </Select>

         <Button type='submit' fullWidth sx={{ mt: 3, mb: 2 }} variant='contained'>
            Post a beer!
         </Button>
      </FormControl>
   );
};

const CreateBeer = () => {
   const navigate = useNavigate();
   const [formValues, setFormValues] = useState({
      name: '',
      type: '',
      description: '',
      abv: '',
      ibu: '',
      brewery: '',
   });
   const [formErrors, setFormErrors] = useState({});

   //get brewery list
   const [breweryList, setBreweryList] = useState([]);

   const onFormSubmit = event => {
      event.preventDefault();
      const validateData = async () => {
         const errors = {};

         if (!formValues.name) {
            errors.name = 'Beer name is required.';
         }
         if (!formValues.type) {
            errors.type = 'Beer type is required.';
         }

         if (formValues.abv && !parseFloat(formValues.abv)) {
            errors.abv = 'ABV must be a number.';
         }
         if (formValues.ibu && !parseFloat(formValues.ibu)) {
            errors.ibu = 'IBU must be a number.';
         }

         if (!formErrors.description) {
            errors.description = 'Description is required.';
         }
         if (!breweryList.map(brewery => brewery._id).includes(formValues.brewery)) {
            errors.brewery = 'Invalid brewery.';
         }

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
            const response = await fetch('http://localhost:5000/api/beers/', requestOptions);
            const data = await response.json();
            if (!data.payload) return;
            const post = data.payload;
            navigate(`/beers/${post._id}`);
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
                     Beers
                  </Typography>
               </Grid>
               <Grid md={2} sm={12} item>
                  <Button
                     startIcon={<ArrowBackIcon />}
                     onClick={() => navigate('/beers')}
                     variant='contained'
                     sx={{ width: '100%' }}
                  >
                     Go back
                  </Button>
               </Grid>
            </Grid>
            <CreateBeerForm
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
export default CreateBeer;
