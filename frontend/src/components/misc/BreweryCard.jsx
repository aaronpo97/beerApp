import { Card, CardContent, CardMedia, Typography, Link, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Stack } from '@mui/material';

const BreweryCard = ({ brewery, size = 'large' }) => {
	const navigate = useNavigate();

	return (
		<Stack spacing={1}>
			<Card sx={{ marginTop: '1em' }}>
				<Grid container>
					<Grid item md={4}>
						<CardMedia
							component='img'
							height={'100%'}
							onClick={() => navigate(`/brewerys/${brewery._id}`)}
							image={brewery.headerImage.url}
						/>
					</Grid>
					<Grid item md={8}>
						<CardContent sx={{ padding: '2em' }}>
							<Typography variant={size === 'small' ? 'h3' : 'h2'}>
								<Link underline='hover' onClick={() => navigate(`/breweries/${brewery._id}`)}>
									{brewery.name}
								</Link>
							</Typography>
							<Typography variant={'h3'}>
								<Link underline='hover' onClick={() => navigate(`/breweries/${brewery._id}`)}>
									{brewery.location.place_name}
								</Link>
							</Typography>
							<Typography variant='body1' sx={{ mt: '1em' }} color='text.secondary'>
								{brewery.description}
							</Typography>
						</CardContent>
					</Grid>
				</Grid>
			</Card>
		</Stack>
	);
};

export default BreweryCard;
