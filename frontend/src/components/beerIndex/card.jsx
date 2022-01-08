import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';

import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';

import { Link } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { useNavigate } from 'react-router-dom';

import { useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExpandMore = styled(props => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
	marginLeft: 'auto',
	transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	}),
}));

export default function RecipeReviewCard({ beer }) {
	const navigate = useNavigate();
	const [expanded, setExpanded] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardMedia
				component='img'
				height='350'
				onClick={() => navigate(`/beers/${beer._id}`)}
				image='https://cdn2.justwineapp.com/assets/article/2017/05/free-images-beer-pouring-creative-commons-cc-commercial-royalty-free-photo.jpg'
			/>
			<CardContent>
				<Typography variant='h2'>
					<Link underline='hover' onClick={() => navigate(`/beers/${beer._id}`)}>
						{beer.name}
					</Link>
				</Typography>
				<Typography variant='h3' gutterBottom>
					<Link underline='hover' onClick={() => navigate(`/breweries/${beer.brewery._id}`)}>
						{beer.brewery.name}
					</Link>
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<ExpandMore
					expand={expanded}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label='show more'>
					<ExpandMoreIcon />
				</ExpandMore>
			</CardActions>
			<Collapse in={expanded} timeout='auto' unmountOnExit>
				<CardContent>
					<Typography variant='body1' sx={{ mt: '1em' }} color='text.secondary'>
						{beer.description}
					</Typography>
					<Typography sx={{ mt: '1em' }} variant='h4'>
						<Link underline='hover' onClick={() => navigate(``)}>
							{beer.type}
						</Link>
					</Typography>
				</CardContent>
			</Collapse>
		</Card>
	);
}
