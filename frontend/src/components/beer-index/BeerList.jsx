import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Grid, Typography, Link, LinearProgress, Button } from '@mui/material';

const BeerList = () => {
	const [sortingParam, setSortingParam] = useState('default');
	const [sortingDirection, setSortingDirection] = useState('default');

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

	return !beers.length ? (
		<LinearProgress />
	) : (
		<>
			<Button
				onClick={e => {
					setSortingDirection('ascending');
					setSortingParam('name');
				}}
				variant='contained'>
				Sort by name (ascending)
			</Button>
			<Button
				onClick={e => {
					setSortingDirection('descending');
					setSortingParam('name');
				}}
				variant='contained'>
				Sort by name (descending)
			</Button>
			<Button
				onClick={e => {
					setSortingDirection('default');
					setSortingParam('default');
				}}
				variant='contained'>
				No sorting!
			</Button>
			<Grid container spacing={1}>
				{beers.map(beer => (
					<Grid item xs={12} md={6} md={4}>
						<Card sx={{ marginTop: '1em' }}>
							<CardMedia
								component='img'
								height='300'
								onClick={() => navigate(`/beers/${beer._id}`)}
								image='https://images.unsplash.com/photo-1615332579037-3c44b3660b53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80'
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
								<Typography sx={{ mt: '1em' }} variant='body1'>
									{beer.type}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</>
	);
};

export default BeerList;
