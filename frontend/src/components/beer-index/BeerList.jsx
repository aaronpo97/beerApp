import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Grid, Typography, Link, Skeleton } from '@mui/material';

const BeerList = ({ sortingDirection, sortingParam }) => {
	const navigate = useNavigate();
	const [beers, setBeers] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const requestOptions = {
				method: 'GET',
				headers: {
					'x-access-token': localStorage['access-token'],
					'x-auth-token': localStorage['refresh-token'],
				},
			};
			const url = `http://localhost:5000/beers?populate=true&sort=${sortingDirection}&param=${sortingParam}`;

			const response = await fetch(url, requestOptions);
			if (response.status === 401) {
				localStorage.clear();
				navigate('/login');
			}
			const result = await response.json();

			if (!result.payload) return;

			localStorage['access-token'] = result.payload.newAccessToken || localStorage['access-token'];

			setBeers(result.payload || []);
		};

		fetchData();
	}, [sortingParam, sortingDirection]);

	return (
		<Grid container spacing={1}>
			{beers.map(beer => (
				<Grid item xs={3}>
					<Card sx={{ marginTop: '1em' }}>
						<CardMedia
							component='img'
							height='300'
							onClick={() => navigate(`/beers/${beer._id}`)}
							image='https://source.unsplash.com/random'
						/>
						<CardContent>
							<Typography variant='h4'>
								<Link underline='hover' onClick={() => navigate(`/beers/${beer._id}`)}>
									{beer.name}
								</Link>
							</Typography>
							<Typography variant='h5'>
								<Link underline='hover' onClick={() => navigate(`/breweries/${beer.brewery._id}`)}>
									{beer.brewery.name}
								</Link>
							</Typography>
							<Typography variant='body1' sx={{ mt: '1em' }} color='text.secondary'>
								{beer.description}
							</Typography>
							<Typography variant='body1'>{beer.type}</Typography>
						</CardContent>
					</Card>
				</Grid>
			))}
		</Grid>
	);
};

export default BeerList;
