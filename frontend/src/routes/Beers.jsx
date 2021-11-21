import 'semantic-ui-css/semantic.min.css';

import BeerList from '../BeerList';
import CreateBeerForm from './CreateBeerForm';

import PageHeader from '../components/PageHeader';

import { Container, Grid, Header, Segment, Button } from 'semantic-ui-react';

import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

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
