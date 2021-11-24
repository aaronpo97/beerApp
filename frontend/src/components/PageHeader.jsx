import { Header, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const PageHeader = ({ currentPage }) => {
	return (
		<Segment style={{ marginTop: '100px' }}>
			<Header as='h1' size='huge'>
				The Beer App
				<Header.Subheader>by Aaron Po</Header.Subheader>
			</Header>
			<Link to='/beers'>Home</Link>
			<Link to='/create'>Create</Link>
			<Link to='/login'>Login</Link>
			<Link to='/register'>Register</Link>
		</Segment>
	);
};

export default PageHeader;
