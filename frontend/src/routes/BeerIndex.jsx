import { useState } from 'react';
import { Container, Button } from '@mui/material';

import BeerList from '../components/beer-index/BeerList';

const Beers = () => {
	const [sortingParam, setSortingParam] = useState('default');
	const [sortingDirection, setSortingDirection] = useState('default');
	return (
		<Container maxWidth={'xl'}>
			<Button
				onClick={e => {
					setSortingDirection('ascending');
					setSortingParam('name');
				}}
				variant='contained'>
				Sort by name (ascending)
			</Button>
			<Button
				onClick={e => {
					setSortingDirection('descending');
					setSortingParam('name');
				}}
				variant='contained'>
				Sort by name (descending)
			</Button>
			<Button
				onClick={e => {
					setSortingDirection('default');
					setSortingParam('default');
				}}
				variant='contained'>
				No sorting!
			</Button>
			<BeerList sortingParam={sortingParam} sortingDirection={sortingDirection} />
		</Container>
	);
};

export default Beers;
