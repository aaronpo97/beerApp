import { useState, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';
import FormField from './FormField.js';

const BeerForm = () => {
	const [beerInfo, setBeerInfo] = useState(null);

	const [name, setName] = useState('');
	const [type, setType] = useState('');
	const [description, setDescription] = useState('');
	const [brewery, setBrewery] = useState('');
	const [image, setImage] = useState('');

	const handleSubmit = e => {
		setBeerInfo({ name, type, description, brewery, image });
	};

	useEffect(() => {
		const createBeerPost = async () => {
			try {
				if (!beerInfo) return;

				const url = 'http://localhost:5000/beer';
				const data = beerInfo;
				const response = await fetch(url, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(data),
				});

				console.log(response.status);
			} catch (error) {}
		};

		createBeerPost();
	}, [beerInfo]);

	return (
		<Form onSubmit={e => handleSubmit(e)}>
			<FormField label='Name' setState={setName} />
			<FormField label='Type' setState={setType} />
			<FormField label='Description' setState={setDescription} />
			<FormField label='Image' setState={setImage} />
			<FormField label='Brewery' setState={setBrewery} />

			<Button type='submit'>Submit</Button>
		</Form>
	);
};

export default BeerForm;
