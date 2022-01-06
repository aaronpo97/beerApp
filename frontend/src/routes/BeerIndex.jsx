import { useState } from 'react';
import { Container, Button, Select, MenuItem } from '@mui/material';

import BeerList from '../components/beer-index/BeerList';

const Beers = () => {
	return (
		<Container maxWidth={'xl'}>
			<BeerList />
		</Container>
	);
};

export default Beers;
