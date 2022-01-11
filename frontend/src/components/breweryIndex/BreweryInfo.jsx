import { LinearProgress, Typography, Box, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BeerCard from '../misc/BeerCard';
import { Masonry } from '@mui/lab';

export default function ({ breweryData }) {
	const navigate = useNavigate();
	return !breweryData ? (
		<LinearProgress />
	) : (
		<Box>
			<Box sx={{ mt: '2em' }}>
				<Typography variant='h1'>{breweryData.name}</Typography>
				<Typography gutterBottom variant='h2'>
					{breweryData.location.place_name}
				</Typography>
			</Box>
			<Box sx={{ mt: '2em' }}>
				<Typography gutterBottom variant='h3'>
					Submitted by:{' '}
					<Link
						underline='hover'
						onClick={() => navigate(`/profile/${breweryData.postedBy._id}`)}>
						{breweryData.postedBy.username}
					</Link>
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

			<Masonry columns={{ xs: 1, sm: 1, md: 2, lg: 3, xl: 4 }} spacing={2} sx={{ mb: 0 }}>
				{breweryData.beers.map(beer => {
					return <BeerCard key={beer._id} beer={beer} size={'small'} />;
				})}
			</Masonry>
		</Box>
	);
}
