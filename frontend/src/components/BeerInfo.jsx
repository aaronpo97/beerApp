import { Typography, LinearProgress, Link, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BeerInfo = ({ currentBeer }) => {
	const navigate = useNavigate();
	const likeCount = !currentBeer ? null : currentBeer.likedBy.length;

	return !currentBeer ? (
		<LinearProgress />
	) : (
		<Box key={currentBeer._id}>
			<div width={12}>
				<Typography variant='h1'>{currentBeer.beerName}</Typography>

				<Typography gutterBottom variant='h2'>
					<Link
						underline='hover'
						onClick={() => navigate(`/breweries/${currentBeer.brewery._id}`)}>
						{currentBeer.brewery.name}
					</Link>
				</Typography>

				<Typography gutterBottom variant='h3'>
					<Link
						underline='hover'
						onClick={() => navigate(`/profile/${currentBeer.postedBy._id}`)}>
						{currentBeer.postedBy.username}
					</Link>
				</Typography>
				<Typography variant='h3' gutterBottom>
					About
				</Typography>
				<Typography variant='h4'>Type: {currentBeer.type}</Typography>
				<Typography variant='h4'>{currentBeer.abv}% ABV </Typography>
				<Typography variant='h4' gutterBottom>
					{currentBeer.ibu} IBU{' '}
				</Typography>

				<div>
					{likeCount} like{likeCount > 1 ? 's' : ''}
				</div>
				{currentBeer.likedBy.map(like => (
					<div>{like.username} likes this!</div>
				))}

				<Typography variant='body1'>{currentBeer.description}</Typography>
			</div>
		</Box>
	);
};

export default BeerInfo;
