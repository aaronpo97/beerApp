import { Card, CardContent, CardMedia, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Stack } from '@mui/material';

const BeerCard = ({ beer, size = 'large' }) => {
	const navigate = useNavigate();
	return (
		<Stack spacing={1}>
			<Card sx={{ marginTop: '1em' }}>
				<CardMedia
					component='img'
					height={Math.floor(Math.random() * 100 + 400)}
					onClick={() => navigate(`/beers/${beer._id}`)}
					image={beer.images[0].url}
				/>
				<CardContent>
					<Typography variant={'h3'}>
						<Link underline='hover' onClick={() => navigate(`/beers/${beer._id}`)}>
							{beer.name}
						</Link>
					</Typography>

					{beer.brewery.name ? (
						<Typography variant='h4' gutterBottom>
							<Link underline='hover' onClick={() => navigate(`/breweries/${beer.brewery._id}`)}>
								{beer.brewery.name}
							</Link>
						</Typography>
					) : null}
					<Typography variant='body1' sx={{ mt: '1em' }} color='text.secondary'>
						{beer.description}
					</Typography>
					<Typography variant='body1' sx={{ mt: '1em' }} color='text.secondary'>
						{beer.abv}% ABV{beer.ibu ? `, ${beer.ibu} IBU` : null}
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
