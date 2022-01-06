import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Container, Link, LinearProgress } from '@mui/material';

import { useNavigate } from 'react-router-dom';

const BreweryInfo = ({ breweryData }) => {
	const navigate = useNavigate();
	return !breweryData ? (
		<LinearProgress />
	) : (
		<div>
			<h1>{breweryData.name}</h1>
			<h2>{breweryData.location.place_name}</h2>
			<h3>About</h3>
			<p>{breweryData.description}</p>
			<h3>Beers</h3>
			{breweryData.beers.map(beer => {
				return (
					<div key={beer._id}>
						<Link underline='hover' onClick={() => navigate(`/beers/${beer._id}`)}>
							<h4>{beer.name}</h4>
						</Link>

						<p>{beer.abv}% ABV</p>
						<p>{beer.ibu} IBU</p>
						<p>Type: {beer.type}</p>
					</div>
				);
			})}
		</div>
	);
};

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

				setBreweryData(data.payload);
			} catch (error) {
				console.error(error);
			}
		};
		getBeerData();
	}, []);

	return (
		<Container maxWidth={'xl'}>
			<BreweryInfo breweryData={breweryData} />
		</Container>
	);
};

export default BreweryInfoPage;
