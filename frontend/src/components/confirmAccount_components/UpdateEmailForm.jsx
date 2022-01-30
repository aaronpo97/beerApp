import { Box, TextField, Button } from '@mui/material';

const UpdateEmailForm = ({ handleSubmit, updatedEmail, setUpdatedEmail }) => {
  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        required
        value={updatedEmail}
        id="Email"
        label="Email"
        name="Email"
        autoComplete="Beer name"
        autoFocus
        onChange={(e) => setUpdatedEmail(e.target.value)}
        margin="normal"
        fullWidth
        variant="filled"
      />
      <Button variant="contained" type="submit">
        Update Email Address
      </Button>
    </Box>
  );
};

export default UpdateEmailForm;
