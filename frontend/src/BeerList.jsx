import { useEffect, useState } from 'react';
import { Grid, Image, Button, Segment, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
const BeerList = ({ beers, setBeers }) => {
	useEffect(() => {
		const getData = async () => {
			const res = await fetch('http://localhost:5000/beer');
			const data = await res.json();
			if (data.length !== beers.length) setBeers(data);

			return;
		};

		getData();
	}, [beers, setBeers]);

	if (!beers.length) return null;

	return beers.map(beer => {
		return (
			<div>
				<Segment>
					<Grid key={beer._id}>
						<Grid.Column width={12}>
							<Header as='h1'>
								<Link to={`${beer._id}`}> {beer.name}</Link>
								<Header.Subheader>{beer.brewery}</Header.Subheader>
								<Header.Subheader>{beer.location}</Header.Subheader>
							</Header>
						</Grid.Column>
						<Grid.Column width={4}>{beer.image ? <Image src={beer.image} /> : null}</Grid.Column>
					</Grid>
				</Segment>
			</div>
		);
	});
};

export default BeerList;
