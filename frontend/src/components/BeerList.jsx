import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ThemeProvider, Grid, CssBaseline } from '@mui/material';
import theme from '../theme';

import { useNavigate } from 'react-router-dom';

const BeerList = () => {
	const navigate = useNavigate();
	const [beers, setBeers] = useState([]);
	useEffect(() => {
		const requestOptions = {
			method: 'GET',
			headers: {
				'x-access-token': localStorage['access-token'],
				'x-auth-token': localStorage['refresh-token'],
			},
		};

		fetch('http://localhost:5000/beers?populate=true', requestOptions)
			.then(response => response.json())
			.then(result => {
				setBeers(result.payload);
			})
			.catch(error => console.log('error', error));
	}, []);

	return !beers
		? null
		: beers.map(beer => {
				return (
					<Card sx={{ marginTop: '1em' }}>
						<CardMedia
							component='img'
							height='400'
							image='https://res.cloudinary.com/dxie9b7na/image/upload/v1639796820/BeerApp/bsdi8bxgy5mlayjyabld.jpg'
							alt='green iguana'
						/>
						<CardContent>
							<Typography variant='h4'>{beer.brewery.name}</Typography>
							<Typography gutterBottom variant='h2' component='div'>
								{beer.name}
							</Typography>
							<Typography variant='body2' color='text.secondary'>
								{beer.description}
							</Typography>
						</CardContent>
						<CardActions>
							<Button
								size='small'
								onClick={e => navigate(`/beers/${beer._id}`)}>
								Learn More
							</Button>
						</CardActions>
					</Card>
				);
		  });
};

export default BeerList;
