import { useEffect, useState } from 'react';
import { Container, Button } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Grid, Typography, Link, Skeleton } from '@mui/material';

const BreweryList = ({ sortingDirection, sortingParam }) => {
	const navigate = useNavigate();
	const [breweries, setBreweries] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const requestOptions = {
				method: 'GET',
				headers: {
					'x-access-token': localStorage['access-token'],
					'x-auth-token': localStorage['refresh-token'],
				},
			};
			const url = `http://localhost:5000/breweries?populate=true&sort=${sortingDirection}&param=${sortingParam}`;

			const response = await fetch(url, requestOptions);
			if (response.status === 401) {
				localStorage.clear();
				navigate('/login');
			}
			const result = await response.json();

			if (!result.payload) return;

			localStorage['access-token'] = result.payload.newAccessToken || localStorage['access-token'];

			setBreweries(result.payload || []);
		};

		fetchData();
	}, [sortingParam, sortingDirection]);

	return (
		<Grid container spacing={1}>
			{breweries.map(brewery => (
				<Grid item xs={12} sm={6} md={4}>
					<Card sx={{ marginTop: '1em' }}>
						<CardMedia
							component='img'
							height='300'
							onClick={() => navigate(`/breweries/${brewery._id}`)}
							image='https://images.unsplash.com/photo-1615332579037-3c44b3660b53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80'
						/>
						<CardContent>
							<Typography variant='h4'>
								<Link underline='hover' onClick={() => navigate(`/breweries/${brewery._id}`)}>
									{brewery.name}
								</Link>
							</Typography>
							<Typography variant='body1' sx={{ mt: '1em' }} color='text.secondary'>
								{brewery.description}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
			))}
		</Grid>
	);
};

const BreweryIndex = () => {
	const [sortingParam, setSortingParam] = useState('default');
	const [sortingDirection, setSortingDirection] = useState('default');
	return (
		<Container maxWidth={'xl'}>
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
			<BreweryList sortingParam={sortingParam} sortingDirection={sortingDirection} />
		</Container>
	);
};

export default BreweryIndex;
