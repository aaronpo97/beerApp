import { useParams } from 'react-router';

import { Container } from 'semantic-ui-react';
import BeerInfo from '../components/BeerInfo';
import PageHeader from '../components/PageHeader';

const InfoPage = () => {
	const { id } = useParams();
	return (
		<Container>
			<PageHeader />
			<BeerInfo beerID={id} />
		</Container>
	);
};

export default InfoPage;
