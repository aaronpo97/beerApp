import 'semantic-ui-css/semantic.min.css';
import { Container, Form, Grid, Image, Button } from 'semantic-ui-react';

import React, { useState, useEffect } from 'react';

import axios from 'axios';

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
		<Grid key={beer.name}>
			<Grid.Column width={4}>
				<Image src={beer.img} />
			</Grid.Column>
			<Grid.Column width={12}>
				<h1>{beer.name}</h1>
				<b>{beer.brewery}</b>
				<p>{beer.description}</p>
			</Grid.Column>
		</Grid>
	));

	const [name, setName] = useState('');
	const [type, setType] = useState('');
	const [description, setDescription] = useState('');
	const [brewery, setBrewery] = useState('');

	const [newBeer, setNewBeer] = useState({
		name,
		type,
		description,
		brewery,
	});

	const handleSubmit = e => {
		setNewBeer({ name, type, description, brewery });
	};

	useEffect(() => {
		const createBeerPost = async () => {
			try {
				const config = {
					method: 'post',
					url: 'http://localhost:5000',
					data: newBeer,
				};

				const response = await axios.request(config);
				console.log(response);
				// const data = await response.json();
				// console.log(data);
			} catch (error) {
				console.log(error);
			}
		};

		createBeerPost();
	}, [newBeer]);

	const createBeer = (
		<Form onSubmit={e => handleSubmit(e)}>
			<Form.Field>
				<label>Name</label>
				<input placeholder='Name' onChange={e => setName(e.target.value)} />
			</Form.Field>
			<Form.Field>
				<label>Type</label>
				<input placeholder='Type' onChange={e => setType(e.target.value)} />
			</Form.Field>
			<Form.Field>
				<label>Description</label>
				<input placeholder='Description' onChange={e => setDescription(e.target.value)} />
			</Form.Field>
			<Form.Field>
				<label>Brewery</label>
				<input placeholder='Brewery' onChange={e => setBrewery(e.target.value)} />
			</Form.Field>

			<Button type='submit'>Submit</Button>
		</Form>
	);

	return (
		<Container text>
			<h1>beer</h1>

			{allBeers}
			{createBeer}
		</Container>
	);
};

export default App;
