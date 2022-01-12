import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Container, Box } from '@mui/material';

import BreweryInfo from '../components/breweryIndex/BreweryInfo';

const BreweryInfoPage = () => {
	const { id } = useParams();
	const [breweryData, setBreweryData] = useState(null);

	useEffect(() => {
		const getBreweryData = async () => {
			try {
				const url = `http://localhost:5000/breweries/${id}?populate=true`;
				const headers = {
					'x-access-token': localStorage['access-token'],
					'x-auth-token': localStorage['refresh-token'],
				};
				const response = await fetch(url, { headers });
				const data = await response.json();
				console.log(data);

				setBreweryData(data.payload);
			} catch (error) {
				console.error(error);
			}
		};
		getBreweryData();
	}, []);

	return !breweryData ? null : (
		<Box>
			<Box>
				<img style={{ height: '35em', width: '100%', objectFit: 'cover' }} src={breweryData.headerImage.url} />
			</Box>
			<Container maxWidth={'lg'}>
				<BreweryInfo breweryData={breweryData} />
			</Container>
		</Box>
	);
};

export default BreweryInfoPage;
