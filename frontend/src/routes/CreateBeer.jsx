import { Container } from 'semantic-ui-react';
import PageHeader from '../components/PageHeader';
import CreateBeerForm from '../components/CreateBeerForm';

const CreateBeer = () => {
	return (
		<Container>
			<PageHeader currentPage='create' />
			<CreateBeerForm />
		</Container>
	);
};

export default CreateBeer;
