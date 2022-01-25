import { useState, useEffect, useContext } from 'react';
import { Container, Box, Typography, Button, Grid } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';

import EditBeerForm from '../components/beer_components/EditBeerForm';
import { UserContext } from '../util/UserContext';

const EditBeer = () => {
   const navigate = useNavigate();
   const { id } = useParams();

   const currentUser = useContext(UserContext);

   const [formValues, setFormValues] = useState({
      name: '',
      type: '',
      description: '',
      abv: '',
      ibu: '',
   });
   const [formErrors, setFormErrors] = useState({});

   useEffect(() => {
      const fetchData = async () => {
         const requestOptions = {
            method: 'GET',
            headers: {
               'x-access-token': localStorage['access-token'],
               'x-auth-token': localStorage['refresh-token'],
            },
         };
         const url = `/api/beers/${id}`;
         const response = await fetch(url, requestOptions);
         if (response.status !== 200) navigate('/notfound');
         const data = await response.json();

         const { name, type, abv, ibu, description } = data.payload;
         setFormValues({ name, type, abv, ibu, description });

         localStorage['access-token'] = response.newAccessToken || localStorage['access-token'];
         if (response.status === 401) {
            localStorage.clear();
         }

         return data;
      };

      const checkAuthStatus = data => {
         if (currentUser._id !== data.payload.postedBy._id || !currentUser) {
            navigate(`/beers/${id}`);
            return;
         }
         return;
      };
      fetchData().then(data => checkAuthStatus(data));
   }, [currentUser, id, navigate]);

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

         if (!formValues.description) {
            errors.description = 'Description is required.';
         }

         if (Object.keys(errors).length) {
            setFormErrors(errors);
            throw new Error('Form validation failed.');
         }
      };

      const handleSubmit = () => {
         const postData = async () => {
            const requestOptions = {
               method: 'PUT',
               headers: {
                  'x-access-token': localStorage['access-token'],
                  'x-auth-token': localStorage['refresh-token'],
                  'Content-type': 'application/json',
               },
               body: JSON.stringify(formValues),
            };
            const response = await fetch(`/api/beers/${id}`, requestOptions);
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

   const handleFormInputChange = event => {
      setFormValues({ ...formValues, [event.target.name]: event.target.value });
   };

   const handleDelete = () => {
      const sendDeleteRequest = async () => {
         const requestOptions = {
            method: 'DELETE',
            headers: {
               'x-access-token': localStorage['access-token'],
               'x-auth-token': localStorage['refresh-token'],
            },
         };

         const response = await fetch(`/api/beers/${id}`, requestOptions);
         if (response.status === 200) navigate('/beers');
      };
      sendDeleteRequest();
   };

   return (
      <Box>
         <Container sx={{ marginTop: 4 }}>
            <Grid container sx={{ mt: 5 }}>
               <Grid item md={10} sm={12}>
                  <Typography variant='h1'>The Biergarten Index</Typography>
                  <Typography variant='h2' gutterBottom sx={{ mb: '1em' }}>
                     Edit
                  </Typography>
               </Grid>
               <Grid md={2} sm={12} item>
                  <Button
                     startIcon={<ArrowBackIcon />}
                     onClick={() => navigate(`/beers/${id}`)}
                     variant='contained'
                     sx={{ width: '100%' }}
                  >
                     Discard edits
                  </Button>
               </Grid>
            </Grid>
            <EditBeerForm
               formValues={formValues}
               formErrors={formErrors}
               handleFormInputChange={handleFormInputChange}
               handleSubmit={onFormSubmit}
               handleDelete={handleDelete}
            />
         </Container>
      </Box>
   );
};
export default EditBeer;
