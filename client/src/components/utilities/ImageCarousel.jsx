import Paper from '@mui/material/Paper';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const ImageCarousel = ({ images, imageHeight = '400px' }) => {
  return (
    <Paper>
      <Carousel autoPlay infiniteLoop showIndicators={false} showThumbs={false}>
        {images.map((image) => {
          return (
            <img
              key={image.url}
              style={{ maxHeight: imageHeight, width: '100%', objectFit: 'cover' }}
              src={image.url}
              alt={''}
            />
          );
        })}
      </Carousel>
    </Paper>
  );
};

export default ImageCarousel;
