import { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BreweryList from './BreweryList';

const BreweryIndex = () => {
	const [breweries, setBreweries] = useState([]);
	const [sortingParam, setSortingParam] = useState('default');
	const [sortingDirection, setSortingDirection] = useState('default');

	const navigate = useNavigate();

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
		<Container maxWidth={'xl'}>
			<BreweryList
				breweries={breweries}
				setBreweries={setBreweries}
				sortingParam={sortingParam}
				setSortingParam={setSortingParam}
				sortingDirection={sortingDirection}
				setSortingDirection={setSortingDirection}
			/>
		</Container>
	);
};
export default BreweryIndex;
