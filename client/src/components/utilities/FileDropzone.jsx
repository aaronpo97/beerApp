import { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Paper, Button, Grid } from '@mui/material';

const FileDropzone = ({ images, setImages }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setImages([
        ...images,
        ...acceptedFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) })),
      ]);
    },
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    images.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [images]);

  const removeImage = (imageToDelete) => {
    setImages(images.filter((image) => image.path !== imageToDelete.path));
  };
  return (
    <>
      <Paper
        sx={{
          backgroundColor: 'white',
          height: '100px',
          mt: 2,
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        className='container'
        {...getRootProps({ className: 'dropzone' })}
      >
        <input {...getInputProps()} />
        <Typography variant='body2'>Drag and drop, or click me to add images to upload!</Typography>
      </Paper>

      <Grid container sx={{ mt: 2 }} spacing={1}>
        {images.map((file) => (
          <Grid item key={file.name} md={4} sm={6} xs={12} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'inline-flex', width: '100%', height: '200px' }}>
              <Paper
                component='img'
                src={file.preview}
                sx={{ height: '100%', width: '100%', objectFit: 'cover' }}
                alt=''
              />
            </Box>
            <Button onClick={() => removeImage(file)} variant='outlined'>
              Delete Image
            </Button>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default FileDropzone;
