import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BreweryInfoPage = () => {
	const { id } = useParams();

	const [breweryData, setBreweryData] = useState({ name: '', location: {}, beers: [] });

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
				console.log(breweryData);
			} catch (error) {
				console.error(error);
			}
		};
		getBeerData();
	}, []);

	return !breweryData ? null : (
		<div>
			<h1>{breweryData.name}</h1>
			<h2>{breweryData.location.place_name}</h2>
			<p>{breweryData.description}</p>

			<ul>
				{breweryData.beers.map(beer => (
					<li key={beer._id}>
						<a href={`/beers/${beer._id}`} key={beer._id}>
							{beer.name}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default BreweryInfoPage;
