import { FormControl, TextField, Grid, Select, MenuItem, Button } from '@mui/material';
import FormErrorAlert from '../utilities/FormErrorAlert';

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
            sx={{ mb: 0 }}
            error={formErrors.name}
            onChange={handleFormInputChange}
            margin='normal'
            fullWidth
         />
         {formErrors.name && <FormErrorAlert error={formErrors.name} />}
         <TextField
            required
            value={formValues.type}
            id='type'
            label='Beer type'
            name='type'
            autoComplete='Beer type'
            autoFocus
            sx={{ mb: 0 }}
            error={formErrors.type}
            onChange={handleFormInputChange}
            margin='normal'
            fullWidth
         />
         {formErrors.type && <FormErrorAlert error={formErrors.type} />}
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
                  sx={{ mb: 0 }}
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
            error={formErrors.description}
            onChange={handleFormInputChange}
            sx={{ mb: 0 }}
            margin='normal'
            multiline
            rows={10}
            fullWidth
         />
         {formErrors.description && <FormErrorAlert error={formErrors.description} />}
         <Select
            sx={{ mt: 2 }}
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
         {formErrors.brewery && <FormErrorAlert error={formErrors.brewery} />}

         <Button type='submit' fullWidth sx={{ mt: 3, mb: 2 }} variant='contained'>
            Post a beer!
         </Button>
      </FormControl>
   );
};

export default CreateBeerForm;
