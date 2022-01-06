import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Container, Box } from '@mui/material';

import BreweryInfo from '../components/breweryIndex/BreweryInfo';

const BreweryInfoPage = () => {
	const { id } = useParams();
	const [breweryData, setBreweryData] = useState(null);

	useEffect(() => {
		const getBeerData = async () => {
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
		getBeerData();
	}, []);

	return (
		<Box>
			<Box>
				<img
					style={{ height: '40em', width: '100%', objectFit: 'cover' }}
					src={
						'https://images.squarespace-cdn.com/content/v1/58d1e3e66a4963c19a0ab3d5/1580226516577-XUJNTGU4GVSB3X5YK6TQ/BREWSYSTEM_SJ.jpg?format=2500w'
					}
				/>
			</Box>
			<Container maxWidth={'xl'}>
				<BreweryInfo breweryData={breweryData} />
			</Container>
		</Box>
	);
};

export default BreweryInfoPage;
