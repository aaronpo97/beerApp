import { TextField, Button, FormControl } from '@mui/material';

import FormErrorAlert from '../utilities/FormErrorAlert';

const CreateBreweryForm = ({ formValues, formErrors, handleSubmit, handleFormInputChange }) => {
   return (
      <FormControl fullWidth component='form' onSubmit={handleSubmit} variant='outlined' noValidate>
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
         {formErrors.name && <FormErrorAlert children={formErrors.name} />}

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
         {formErrors.description && <FormErrorAlert children={formErrors.description} />}

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
         {formErrors.address && <FormErrorAlert children={formErrors.address} />}

         <Button type='submit' fullWidth sx={{ mt: 3, mb: 2 }} variant='contained'>
            Post a brewery!
         </Button>
      </FormControl>
   );
};

export default CreateBreweryForm;
