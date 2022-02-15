import { Box } from '@mui/material';
import ImageCarousel from '../../components/utilities/ImageCarousel';
import images from '../../util/images';
const Home = () => {
  return (
    <Box>
      <ImageCarousel images={images} imageHeight='100vh' />
    </Box>
  );
};

export default Home;
