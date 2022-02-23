import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, FormControl } from '@mui/material';

import FormErrorAlert from '../utilities/FormErrorAlert';
import FileDropzone from '../utilities/FileDropzone';

const CreateBreweryForm = ({ setIsNewBreweryLoading }) => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    address: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const [images, setImages] = useState([]);

  const validateData = async () => {
    const errors = {};

    if (!formValues.name) {
      errors.name = 'Brewery name is required.';
    }

    if (!formValues.description) {
      errors.description = 'Description is required.';
    }
    if (formValues.description.length < 20) {
      errors.description = 'Description must be greater than 20 characters.';
    }

    if (!formValues.address) {
      errors.address = 'Address is required.';
    }

    if (Object.keys(errors).length) {
      setFormErrors(errors);
      throw new Error('Form validation failed.');
    }
  };

  const uploadImages = async () => {
    setIsNewBreweryLoading(true);
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

  const postData = async (imageData) => {
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
    const response = await fetch('/api/breweries/', requestOptions);
    const data = await response.json();
    if (!data.payload) return;
    const post = data.payload;
    navigate(`/breweries/${post._id}`);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    validateData()
      .then(() => uploadImages())
      .then((imageData) => postData(imageData))
      .catch((error) => console.error(error));
  };

  const handleFormInputChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };
  return (
    <FormControl fullWidth component='form' onSubmit={onFormSubmit} variant='outlined' noValidate>
      <TextField
        required
        value={formValues.name}
        id='name'
        label='Brewery name'
        name='name'
        autoComplete='Brewery name'
        autoFocus
        sx={{ mb: 0 }}
        error={formErrors.name}
        onChange={handleFormInputChange}
        margin='normal'
        fullWidth
      />
      {formErrors.name && <FormErrorAlert error={formErrors.name} />}

      <TextField
        required
        variant='outlined'
        value={formValues.description}
        id='outlined-adornment-abv'
        label='Description'
        name='description'
        error={formErrors.description}
        onChange={handleFormInputChange}
        sx={{ mb: 0 }}
        margin='normal'
        multiline
        rows={10}
        fullWidth
      />
      {formErrors.description && <FormErrorAlert error={formErrors.description} />}

      <TextField
        required
        value={formValues.address}
        id='name'
        label='Address'
        name='address'
        autoComplete='Beer name'
        sx={{ mb: 0 }}
        autoFocus
        error={formErrors.address}
        onChange={handleFormInputChange}
        margin='normal'
        fullWidth
      />
      {formErrors.address && <FormErrorAlert error={formErrors.address} />}

      <FileDropzone images={images} setImages={setImages} />
      <Button type='submit' fullWidth sx={{ mt: 3, mb: 2 }} variant='contained'>
        Post a brewery!
      </Button>
    </FormControl>
  );
};

export default CreateBreweryForm;
