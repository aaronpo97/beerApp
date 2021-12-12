import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Form, Button } from 'semantic-ui-react';

import FormField from '../FormField';

const EditInfoForm = () => {
	const navigate = useNavigate();
	const { id: beerID } = useParams();

	const [name, setName] = useState('');
	const [type, setType] = useState('');
	const [description, setDescription] = useState('');
	const [brewery, setBrewery] = useState('');
	const [location, setLocation] = useState('');
	const [abv, setAbv] = useState('');
	const [ibu, setIbu] = useState('');
	const [image, setImage] = useState('');

	useEffect(() => {
		const getBeerData = async () => {
			try {
				const url = `http://localhost:5000/beer/${beerID}`;
				const response = await fetch(url);
				if (response.status !== 200) return;
				const data = await response.json();

				console.log(data);

				setName(data.name);
				setType(data.type);
				setDescription(data.description);
				setBrewery(data.brewery);
				setLocation(data.location);
				setAbv(data.abv);
				setIbu(data.ibu);
				setImage(data.image);
			} catch (error) {
				console.error(error);
			}
		};
		getBeerData();
	}, [beerID]);

	const handleSubmit = e => {
		e.preventDefault();
		const formData = { name, brewery, location, type, description, image, abv, ibu };

		const updateBeerPost = async () => {
			if (!formData) return alert('Cannot submit');
			const url = `http://localhost:5000/beer/${beerID}`;
			const response = await fetch(url, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			});

			const resData = await response.json();
			console.log(resData);

			navigate('/');
		};

		updateBeerPost();
	};
	return (
		<Form onSubmit={e => handleSubmit(e)}>
			<FormField label='Name' setValue={setName} value={name} />
			<FormField label='Brewery' setValue={setBrewery} value={brewery} />
			<FormField label='Location' setValue={setLocation} value={location} />
			<FormField label='Type' setValue={setType} value={type} />
			<FormField label='Description' setValue={setDescription} value={description} />
			<FormField label='IBU' setValue={setIbu} value={ibu} />
			<FormField label='ABV' setValue={setAbv} value={abv} />
			<FormField label='Image' setValue={setImage} value={image} />

			<Button type='submit'>Submit</Button>
		</Form>
	);
};

export default EditInfoForm;
