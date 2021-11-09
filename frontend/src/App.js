import 'semantic-ui-css/semantic.min.css';
import { Container, Header, Grid, Image, Segment } from 'semantic-ui-react';

import React, { useState, useEffect } from 'react';

const App = () => {
	const [beers, setBeers] = useState([]);

	useEffect(() => {
		const getData = async () => {
			const res = await fetch('http://localhost:5000/beer');
			const data = await res.json();
			return setBeers(data);
		};

		getData();
	}, []);

	// const renderedBeers = beers.map(beer => <div>beer.name</div>);
	// return <Container>{renderedBeers}</Container>;
	const allBeers = beers.map(beer => (
		<Grid.Row key={beer._id}>
			<Header as='h1'>{beer.name}</Header>
			<Header as='h2'> {beer.brewery}</Header>
		</Grid.Row>
	));

	return (
		<Container>
			<Header as='h1'>Beers I like!</Header>

			<Segment>
				<Grid>{allBeers}</Grid>
			</Segment>
		</Container>
	);
};

export default App;
