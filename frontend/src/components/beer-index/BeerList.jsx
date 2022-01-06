import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, LinearProgress, Button, Typography, Box } from '@mui/material';
import BeerCard from '../BeerCard';
import { Masonry } from '@mui/lab';
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
		<Box>
			<Button
				sx={{ margin: 1, ml: 0 }}
				onClick={e => {
					setSortingDirection('ascending');
					setSortingParam('name');
				}}
				variant='contained'>
				Sort by name (ascending)
			</Button>
			<Button
				sx={{ margin: 1 }}
				onClick={e => {
					setSortingDirection('descending');
					setSortingParam('name');
				}}
				variant='contained'>
				Sort by name (descending)
			</Button>
			<Button
				sx={{ margin: 1 }}
				onClick={e => {
					setSortingDirection('default');
					setSortingParam('default');
				}}
				variant='contained'>
				No sorting!
			</Button>
			<Masonry columns={3} spacing={2} sx={{ mb: 0 }}>
				{beers.map(beer => (
					<BeerCard beer={beer} />
				))}
			</Masonry>
		</Box>
	);
};
export default BeerList;
