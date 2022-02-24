import { useNavigate } from 'react-router-dom';
import { Link, Typography, Box, Tooltip, IconButton } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../../util/AuthContext';
import EditIcon from '@mui/icons-material/Edit';

const BeerInfoHeader = ({ currentBeer }) => {
  const navigate = useNavigate();
  const [currentUser] = useContext(AuthContext);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box>
        <Typography variant='h1'>{currentBeer.name}</Typography>
        <Typography variant='h2' sx={{ mb: 1 }}>
          <Link underline='hover' onClick={() => navigate(`/breweries/${currentBeer.brewery._id}`)}>
            {currentBeer.brewery.name}
          </Link>
        </Typography>
      </Box>
      <Box>
        {currentUser?._id === currentBeer.postedBy._id && (
          <Tooltip
            title={`Edit '${currentBeer.name}'`}
            onClick={() => navigate(`/beers/${currentBeer._id}/edit`)}
          >
            <IconButton>
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};

export default BeerInfoHeader;
