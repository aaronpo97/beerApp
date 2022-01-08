import { useState } from 'react';
import { Container, Button, Select, MenuItem } from '@mui/material';

import BeerList from '../components/beerIndex/BeerList';

const Beers = () => {
	return (
		<Container maxWidth={'xl'}>
			<BeerList />
		</Container>
	);
};

export default Beers;
