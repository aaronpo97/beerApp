import 'semantic-ui-css/semantic.min.css';

import BeerList from './BeerList.js';
import CreateBeerForm from './CreateBeerForm.js';
import { Container, Grid, Header, Segment } from 'semantic-ui-react';

import { useState } from 'react';

const App = () => {
	const [beers, setBeers] = useState([]);

	return (
		<Container>
			<Segment style={{ marginTop: '100px' }}>
				<Header as='h1' size='huge'>
					The Beer App
				</Header>
			</Segment>
			<Grid>
				<Grid.Column width={5}>
					<Segment>
						<CreateBeerForm beers={beers} setBeers={setBeers} />
					</Segment>
				</Grid.Column>
				<Grid.Column width={11}>
					<BeerList beers={beers} setBeers={setBeers} />
				</Grid.Column>
			</Grid>
		</Container>
	);
};

export default App;
