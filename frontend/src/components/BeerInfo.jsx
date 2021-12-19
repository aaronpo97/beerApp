import { Image } from 'semantic-ui-react';

import { Container, Typography } from '@mui/material';

const BeerInfo = ({ currentBeer, handleDelete, handleEdit }) => {
	console.log(currentBeer);
	return !currentBeer ? (
		<p>Not found.</p>
	) : (
		<div key={currentBeer._id}>
			<div width={12}>
				<Typography variant='h1'>{currentBeer.beerName}</Typography>
				<p>{currentBeer.breweryName}</p>
				<p>{currentBeer.location}</p>

				<p>About</p>
				<p>Type: {currentBeer.type}</p>
				<p>{currentBeer.abv}% ABV </p>
				<p>{currentBeer.ibu} IBU </p>

				<p>{currentBeer.description}</p>
			</div>
		</div>
	);
};

export default BeerInfo;
