import 'semantic-ui-css/semantic.min.css';

import BeerList from '../components/BeerList';

import PageHeader from '../components/PageHeader';

import { Container, Grid } from 'semantic-ui-react';
import { useState } from 'react';

const Beers = () => {
	return (
		<div>
			<Container>
				<Grid>
					<Grid.Column width={16}>
						<BeerList />
					</Grid.Column>
				</Grid>
			</Container>
		</div>
	);
};

export default Beers;
