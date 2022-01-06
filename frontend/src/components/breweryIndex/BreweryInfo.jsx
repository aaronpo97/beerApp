import {
	Link,
	LinearProgress,
	Grid,
	Card,
	CardMedia,
	CardContent,
	Typography,
	CardActions,
	Button,
	Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BeerCard from '../BeerCard';
import { Masonry } from '@mui/lab';

export default function ({ breweryData }) {
	const navigate = useNavigate();
	return !breweryData ? (
		<LinearProgress />
	) : (
		<Box>
			<Box sx={{ mt: '2em' }}>
				<Typography gutterBottom variant='h1'>
					{breweryData.name}
				</Typography>
				<Typography gutterBottom variant='h2'>
					{breweryData.location.place_name}
				</Typography>
			</Box>
			<Box sx={{ mt: '1em', mb: '2em' }}>
				<Typography gutterBottom variant='h3'>
					About
				</Typography>
				<Typography variant='body1' color='text.secondary'>
					{breweryData.description}
				</Typography>
			</Box>
			<Typography gutterBottom variant='h3'>
				Beers
			</Typography>

			<Masonry columns={3} spacing={2} sx={{ mb: 0 }}>
				{breweryData.beers.map(beer => {
					return <BeerCard key={beer._id} beer={beer} size={'small'} />;
				})}
			</Masonry>
		</Box>
	);
}
