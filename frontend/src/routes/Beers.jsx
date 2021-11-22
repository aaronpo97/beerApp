import 'semantic-ui-css/semantic.min.css';

import BeerList from '../components/BeerList';

import PageHeader from '../components/PageHeader';

import { Container, Grid } from 'semantic-ui-react';
import { useState } from 'react';

const Beers = () => {
	const [beers, setBeers] = useState([]);
	const [updateToggle, setUpdateToggle] = useState(false);

	return (
		<div>
			<Container>
				<PageHeader />

				<Grid>
					<Grid.Column width={16}>
						<BeerList beers={beers} setBeers={setBeers} updateToggle={updateToggle} setUpdateToggle={setUpdateToggle} />
					</Grid.Column>
				</Grid>
			</Container>
		</div>
	);
};

export default Beers;
