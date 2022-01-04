import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Grid, Typography, Link } from '@mui/material';

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
			const result = await response.json();

			localStorage['access-token'] =
				result.payload.newAccessToken || localStorage['access-token'];

			setBeers(result.payload);
		};

		fetchData();
	}, [sortingParam, sortingDirection]);

	if (!beers) return null;

	return (
		<>
			<Grid container spacing={1}>
				{beers.map(beer => (
					<Grid item xs={3}>
						<Card sx={{ marginTop: '1em' }}>
							<CardMedia
								component='img'
								height='300'
								image='https://source.unsplash.com/random'
							/>
							<CardContent>
								<Typography variant='h4'>
									{/* onClick={() => navigate(`/beers/${beer._id}`)} */}
									<Link
										underline='hover'
										onClick={() => navigate(`/beers/${beer._id}`)}>
										{beer.name}
									</Link>
								</Typography>
								<Typography variant='h5'>{beer.brewery.name}</Typography>
								<Typography
									variant='body1'
									sx={{ mt: '1em' }}
									color='text.secondary'>
									{beer.description}
								</Typography>
								<Typography variant='body1'>{beer.type}</Typography>
								{/* <Typography variant='body3'>IBU: {beer.ibu}</Typography>
								ABV: {beer.abv}% */}
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</>
	);
};

export default BeerList;
