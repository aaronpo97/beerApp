import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Form, Button } from 'semantic-ui-react';

import FormField from '../FormField';

const EditInfoForm = () => {
	const { id: beerID } = useParams();
	const [currentBeer, setCurrentBeer] = useState(null);

	const [updatedBeer, setUpdatedBeer] = useState(null);

	const [name, setName] = useState('');
	const [type, setType] = useState('');
	const [description, setDescription] = useState('');
	const [brewery, setBrewery] = useState('');
	const [location, setLocation] = useState('');
	const [image, setImage] = useState('');

	const navigate = useNavigate();

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
		if (!currentBeer) return;

		setName(currentBeer.name);
		setType(currentBeer.type);
		setDescription(currentBeer.description);
		setBrewery(currentBeer.brewery);
		setLocation(currentBeer.location);
		setImage(currentBeer.image);
	}, [currentBeer]);

	useEffect(() => {
		if (!updatedBeer) return;

		const updateBeerPost = async () => {
			try {
				console.log(updatedBeer);
				if (!updatedBeer) return;

				const url = `http://localhost:5000/beer/${currentBeer._id}`;
				const data = updatedBeer;

				const response = await fetch(url, {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(data),
				});

				const resData = await response.json();

				console.log(resData);
				const { _id: newBeerID } = resData;

				// navigate(`/beers/${newBeerID}`);
			} catch (error) {}
		};

		updateBeerPost();
	}, [updatedBeer]);
   //infinite loop problem when posting edit


	return (
		<Form
			onSubmit={() => {
				setUpdatedBeer({ name, brewery, location, type, description, image });
			}}>
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
