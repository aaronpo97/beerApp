import Carousel from 'react-material-ui-carousel';
import Box from '@mui/material/Box';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ImageCarousel = ({ images, imageHeight = '400px' }) => {
  return (
    <Box component='div' className='Carousel'>
      <Carousel
        navButtonsProps={{
          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
          style: {
            backgroundColor: 'rgba(0,0,0,0)',
            borderRadius: 0,
          },
        }}
        PrevIcon={<ArrowBackIosNewIcon />}
        NextIcon={<ArrowForwardIosIcon />}
        indicators={false}
        navButtonsAlwaysVisible
      >
        {images.map((image) => {
          return (
            <img
              style={{ maxHeight: imageHeight, width: '100%', objectFit: 'cover' }}
              src={image.url}
              alt={''}
              key={image._id}
            />
          );
        })}
      </Carousel>
    </Box>
  );
};

export default ImageCarousel;
