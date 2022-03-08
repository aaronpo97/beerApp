import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { FormControl, TextField, Grid, MenuItem, Button, Box } from '@mui/material';
import FormErrorAlert from '../../utilities/FormErrorAlert';
import FileDropzone from '../../utilities/FileDropzone';
import InputAdornment from '@mui/material/InputAdornment';
const CreateBeerForm = ({
  setIsNewBeerLoading,
}: {
  setIsNewBeerLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();

  type FormValuesI = {
    name: string;
    type: string;
    description: string;
    abv: string;
    ibu: string;
    brewery: string;
  };

  type FormErrorsI = {
    name?: string;
    type?: string;
    abv?: string;
    ibu?: string;
    description?: string;
    brewery?: string;
  };

  const [formValues, setFormValues] = useState<FormValuesI>({
    name: '',
    type: '',
    description: '',
    abv: '',
    ibu: '',
    brewery: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrorsI>({});

  const [images, setImages] = useState([]);

  //get brewery list
  const [breweryList, setBreweryList] = useState([]);

  const validateData = async () => {
    const errors: FormErrorsI = {};
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
    if (!breweryList.map((brewery) => brewery._id).includes(formValues.brewery)) {
      errors.brewery = 'Invalid brewery.';
    }

    if (Object.keys(errors).length) {
      setFormErrors(errors);
      throw new Error('Form validation failed.');
    }
  };
  const uploadImages = async () => {
    setIsNewBeerLoading(true);
    if (!images.length) return;
    const formData = new FormData();
    Array.from(images).forEach((image) => {
      formData.append('files', image);
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        'x-access-token': localStorage['access-token'],
        'x-auth-token': localStorage['refresh-token'],
      },
      body: formData,
    };

    const response = await fetch('/api/images/', requestOptions);

    const data = await response.json();
    return data;
  };
  const postBeerData = async (imageData) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'x-access-token': localStorage['access-token'],
        'x-auth-token': localStorage['refresh-token'],
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        ...formValues,
        images: imageData ? imageData.payload.map((image) => image._id) : [],
      }),
    };
    const response = await fetch('/api/beers/', requestOptions);
    const data = await response.json();
    if (!data.payload) return;
    const post = data.payload;
    navigate(`/beers/${post._id}`);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    validateData()
      .then(() => uploadImages())
      .then((imageData) => postBeerData(imageData))
      .catch((error) => console.error(error));
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
      const url = `/api/breweries`;
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      setBreweryList(data.payload || []);

      // @ts-expect-error
      localStorage['access-token'] = response.newAccessToken || localStorage['access-token'];
      if (response.status === 401) {
        localStorage.clear();
      }
    };
    fetchData();
  }, []);

  const handleFormInputChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    console.log(images);
  }, [images]);

  return (
    <Box component='form' onSubmit={onFormSubmit}>
      {/* @ts-expect-error */}
      <FormControl fullWidth variant='outlined' noValidate>
        <TextField
          required
          value={formValues.name}
          id='name'
          label='Beer name'
          name='name'
          autoComplete='Beer name'
          autoFocus
          sx={{ mb: 0 }}
          error={!!formErrors.name}
          onChange={handleFormInputChange}
          margin='normal'
          fullWidth
        />
        {formErrors.name && <FormErrorAlert error={formErrors.name} />}
        <Grid container spacing={3}>
          <Grid item md={8}>
            <TextField
              required
              value={formValues.type}
              id='type'
              label='Beer type'
              name='type'
              autoComplete='Beer type'
              autoFocus
              sx={{ mb: 0 }}
              error={!!formErrors.type}
              onChange={handleFormInputChange}
              margin='normal'
              fullWidth
            />
          </Grid>
          {formErrors.type && <FormErrorAlert error={formErrors.type} />}
          <Grid item md={2}>
            <TextField
              variant='outlined'
              value={formValues.abv}
              id='outlined-adornment-abv'
              label='ABV'
              name='abv'
              error={!!formErrors.abv}
              onChange={handleFormInputChange}
              margin='normal'
              required
              fullWidth
              InputProps={{
                endAdornment: <InputAdornment position='end'>%</InputAdornment>,
              }}
              sx={{ mb: 0 }}
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              variant='outlined'
              value={formValues.ibu}
              id='outlined-adornment-abv'
              required
              label='IBU'
              name='ibu'
              error={!!formErrors.ibu}
              onChange={handleFormInputChange}
              margin='normal'
              fullWidth
              InputProps={{
                endAdornment: <InputAdornment position='end'>IBU</InputAdornment>,
              }}
              sx={{ mb: 0 }}
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
          error={!!formErrors.description}
          onChange={handleFormInputChange}
          sx={{ mb: 0 }}
          margin='normal'
          multiline
          rows={10}
          fullWidth
        />
        {formErrors.description && <FormErrorAlert error={formErrors.description} />}
        <TextField
          select
          sx={{ mt: 2 }}
          label='Brewery'
          value={formValues.brewery}
          fullWidth
          name='brewery'
          onChange={handleFormInputChange}
          required
        >
          {breweryList.map((brewery) => {
            return (
              <MenuItem key={brewery.name} value={brewery._id}>
                {brewery.name}
              </MenuItem>
            );
          })}
        </TextField>

        {formErrors.brewery && <FormErrorAlert error={formErrors.brewery} />}

        <FileDropzone images={images} setImages={setImages} />
        <Button type='submit' fullWidth sx={{ mt: 3, mb: 2 }} variant='contained'>
          Post a beer!
        </Button>
      </FormControl>
    </Box>
  );
};

export default CreateBeerForm;
