import { Card, CardContent, CardMedia, CardActions, Typography, Link, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Stack } from '@mui/material';

const BeerCard = ({ beer, size = 'large' }) => {
	const navigate = useNavigate();
	return (
		<Stack spacing={1}>
			<Card sx={{ marginTop: '1em' }}>
				<CardMedia
					component='img'
					height='350'
					onClick={() => navigate(`/beers/${beer._id}`)}
					image='https://cdn2.justwineapp.com/assets/article/2017/05/free-images-beer-pouring-creative-commons-cc-commercial-royalty-free-photo.jpg'
				/>
				<CardContent>
					<Typography variant={size === 'small' ? 'h3' : 'h2'}>
						<Link underline='hover' onClick={() => navigate(`/beers/${beer._id}`)}>
							{beer.name}
						</Link>
					</Typography>

					{beer.brewery.name ? (
						<Typography variant='h3' gutterBottom>
							<Link underline='hover' onClick={() => navigate(`/breweries/${beer.brewery._id}`)}>
								{beer.brewery.name}
							</Link>
						</Typography>
					) : null}
					<Typography variant='body1' sx={{ mt: '1em' }} color='text.secondary'>
						{beer.description}
					</Typography>
					<Typography sx={{ mt: '1em' }} variant='h4'>
						<Link underline='hover' onClick={() => navigate(``)}>
							{beer.type}
						</Link>
					</Typography>
				</CardContent>
			</Card>
		</Stack>
	);
};

export default BeerCard;
