import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LinearProgress, InputLabel, Box, Select, MenuItem, FormControl, Typography } from '@mui/material';
import BreweryCard from '../components/misc/BreweryCard';
import { Masonry } from '@mui/lab';

const BeerList = () => {
	const [sortingParam, setSortingParam] = useState('default');
	const [sortingDirection, setSortingDirection] = useState('default');
	const [sortingOption, setSortingOption] = useState(0);

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

	useEffect(() => {
		switch (sortingOption) {
			case 1:
				setSortingParam('name');
				setSortingDirection('ascending');
				break;
			case 2:
				setSortingParam('name');
				setSortingDirection('descending');
				break;
			default:
				setSortingParam('default');
				setSortingDirection('default');
				break;
		}
	}, [sortingOption]);

	return !breweries.length ? (
		<LinearProgress />
	) : (
		<Box sx={{ mt: '2em' }}>
			<Typography variant='h1'>The Biergarten Index</Typography>
			<Typography variant='h2' gutterBottom sx={{ mb: '1em' }}>
				Breweries
			</Typography>
			<FormControl variant='standard' fullWidth>
				<InputLabel id='select-sorting-method'>Sort</InputLabel>
				<Select
					labelId='select-sorting-method'
					id='select-sort'
					value={sortingOption}
					label='Sort'
					onChange={e => setSortingOption(e.target.value)}>
					<MenuItem value={0}>Default sorting</MenuItem>
					<MenuItem value={1}>Sort by name (ascending)</MenuItem>
					<MenuItem value={2}>Sort by name (descending)</MenuItem>
				</Select>
			</FormControl>
			<Masonry columns={1} spacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }} sx={{ mb: 0 }}>
				{breweries.map(brewery => (
					<BreweryCard brewery={brewery} />
				))}
			</Masonry>
		</Box>
	);
};
export default BeerList;
