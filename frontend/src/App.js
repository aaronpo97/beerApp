import 'semantic-ui-css/semantic.min.css';

import BeerList from './BeerList.js';
import CreateBeerForm from './CreateBeerForm.js';
import { Container } from 'semantic-ui-react';

const App = () => {
	return (
		<Container>
			<BeerList />
			<CreateBeerForm />
		</Container>
	);
};

export default App;
