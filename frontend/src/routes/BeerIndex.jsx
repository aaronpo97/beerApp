import { useState } from 'react';
import { Container, Box } from '@mui/material';

import BeerList from '../components/beerIndex/BeerList';

const Beers = () => {
	return (
		<Box>
			<Box>
				<img
					style={{ height: '30em', width: '100%', objectFit: 'cover' }}
					src={
						'https://media.blogto.com/articles/20190621-TheHomeway1.jpg?w=2048&cmd=resize_then_crop&height=1365&quality=70'
					}
				/>
			</Box>
			<Container maxWidth={'xl'}>
				<BeerList />
			</Container>
		</Box>
	);
};

export default Beers;
