import { useNavigate } from 'react-router-dom';
import { Box, Link, Typography } from '@mui/material';

const BeerInfoHeader = ({ currentBeer }) => {
   const navigate = useNavigate();
   return (
      <Box>
         <Typography variant='h1'>{currentBeer.name}</Typography>
         <Typography variant='h2' sx={{ mb: '1em' }}>
            <Link underline='hover' onClick={() => navigate(`/breweries/${currentBeer.brewery._id}`)}>
               {currentBeer.brewery.name}
            </Link>
         </Typography>
      </Box>
   );
};

export default BeerInfoHeader;
