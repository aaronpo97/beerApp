import { useState, useEffect } from 'react';
import { Grid, Image } from 'semantic-ui-react';

const BeerList = () => {
	const [beers, setBeers] = useState([]);

	useEffect(() => {
		const getData = async () => {
			const res = await fetch('http://localhost:5000/beer');
			const data = await res.json();
			if (data.length !== beers.length) setBeers(data);

			return;
		};

		getData();
	}, [beers]);

	return beers.map(beer => {
		return (
			<Grid key={beer._id}>
				<Grid.Column width={4}>
					<Image src={beer.image} />
				</Grid.Column>
				<Grid.Column width={12}>
					<h1>{beer.name}</h1>
					<b>{beer.brewery}</b>
					<p>{beer.description}</p>
				</Grid.Column>
			</Grid>
		);
	});
};

export default BeerList;
