import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Form, Button } from 'semantic-ui-react';

import FormField from '../FormField';

const EditInfoForm = () => {
	const { id: beerID } = useParams();
	const [currentBeer, setCurrentBeer] = useState({});

	const [name, setName] = useState('');
	const [type, setType] = useState('');
	const [description, setDescription] = useState('');
	const [brewery, setBrewery] = useState('');
	const [location, setLocation] = useState('');
	const [image, setImage] = useState('');

	useEffect(() => {
		const getBeerData = async () => {
			try {
				const url = `http://localhost:5000/beer/${beerID}`;
				const response = await fetch(url);
				if (response.status !== 200) setCurrentBeer(null);
				const data = await response.json();
				setCurrentBeer(data);
			} catch (error) {
				console.error(error);
			}
		};
		getBeerData();
	}, [beerID]);

	useEffect(() => {
		setName(currentBeer.name);
		setType(currentBeer.type);
		setDescription(currentBeer.description);
		setBrewery(currentBeer.brewery);
		setLocation(currentBeer.location);
		setImage(currentBeer.image);
	}, [currentBeer]);

	return (
		<Form>
			<FormField label='Name' setValue={setName} value={name} />
			<FormField label='Brewery' setValue={setBrewery} value={brewery} />
			<FormField label='Location' setValue={setLocation} value={location} />
			<FormField label='Type' setValue={setType} value={type} />
			<FormField label='Description' setValue={setDescription} value={description} />
			<FormField label='Image' setValue={setImage} value={image} />

			<Button type='submit'>Submit</Button>
		</Form>
	);
};

export default EditInfoForm;
