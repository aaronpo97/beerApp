import { useState, useEffect } from 'react';
import { Container, Box, TextField, Typography, Select, MenuItem, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const CreateBeer = () => {
	const navigate = useNavigate();
	const [name, setName] = useState('');
	const [type, setType] = useState('');
	const [description, setDescription] = useState('');
	const [abv, setABV] = useState('');
	const [ibu, setIBU] = useState('');
	const [brewery, setBrewery] = useState('');
	const [beer, setBeer] = useState({
		name,
		type,
		description,
		abv,
		ibu,
		brewery,
	});
	useEffect(
		() => setBeer({ name, type, description, abv, ibu, brewery, images: [] }),
		[name, type, description, abv, ibu, brewery]
	);
	//get brewery list
	const [breweryList, setBreweryList] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			const requestOptions = {
				method: 'GET',
				headers: {
					'x-access-token': localStorage['access-token'],
					'x-auth-token': localStorage['refresh-token'],
				},
			};
			const url = `http://localhost:5000/breweries`;
			const response = await fetch(url, requestOptions);
			const data = await response.json();
			setBreweryList(data.payload || []);
			localStorage['access-token'] = response.newAccessToken || localStorage['access-token'];
			if (response.status === 401) {
				localStorage.clear();
			}
		};
		fetchData();
	}, []);
	const handleChange = event => setBrewery(event.target.value);
	const handleSubmit = () => {
		const postData = async () => {
			const requestOptions = {
				method: 'POST',
				headers: {
					'x-access-token': localStorage['access-token'],
					'x-auth-token': localStorage['refresh-token'],
					'Content-type': 'application/json',
				},
				body: JSON.stringify(beer),
			};
			const response = await fetch('http://localhost:5000/beers/', requestOptions);
			const data = await response.json();
			if (!data.payload) return;
			const post = data.payload;
			navigate(`/beers/${post._id}`);
		};
		postData();
	};
	return (
		<Container>
			<Typography variant='h1'>Post a Beer</Typography>
			<Box
				component='form'
				onSubmit={e => {
					e.preventDefault();
					handleSubmit();
				}}
				noValidate>
				<TextField
					margin='normal'
					required
					fullWidth
					autoFocus
					label='name'
					type='text'
					id='name'
					value={name}
					autoComplete='name'
					onChange={e => setName(e.target.value)}
				/>
				<TextField
					margin='normal'
					required
					fullWidth
					autoFocus
					label='beer type'
					type='text'
					id='type'
					value={type}
					onChange={e => setType(e.target.value)}
				/>
				<TextField
					margin='normal'
					required
					fullWidth
					autoFocus
					multiline
					rows={10}
					label='description'
					type='text'
					id='description'
					value={description}
					onChange={e => setDescription(e.target.value)}
				/>
				<TextField
					margin='normal'
					required
					fullWidth
					autoFocus
					label='abv'
					type='text'
					id='abv'
					value={abv}
					onChange={e => setABV(e.target.value)}
				/>
				<TextField
					margin='normal'
					required
					fullWidth
					autoFocus
					label='ibu'
					type='text'
					id='ibu'
					value={ibu}
					onChange={e => setIBU(e.target.value)}
				/>
				<Select labelId='brewery-select' label='brewery' value={brewery} fullWidth onChange={handleChange}>
					{breweryList.map(brewery => {
						return (
							<MenuItem key={brewery.name} value={brewery._id}>
								{brewery.name}
							</MenuItem>
						);
					})}
				</Select>
				<Button type='submit' fullWidth sx={{ mt: 3, mb: 2 }} variant='contained'>
					Post a beer!
				</Button>
			</Box>
		</Container>
	);
};
export default CreateBeer;
