import { Header, Segment, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const PageHeader = ({ currentPage }) => {
	console.log(currentPage);
	return (
		<>
			<Header as='h1' size='huge' style={{ marginTop: '100px' }}>
				The Beer App
			</Header>

			<Menu>
				<Menu.Item name='Home' active={currentPage === 'beers'}>
					<Link to='/beers'>Home</Link>
				</Menu.Item>
				<Menu.Item name='Create' active={currentPage === 'create'}>
					<Link to='/create'>Create</Link>
				</Menu.Item>
				<Menu.Item name='Login' active={currentPage === 'login'}>
					<Link to='/login'>Login</Link>
				</Menu.Item>
				<Menu.Item name='Register' active={currentPage === 'register'}>
					<Link to='/register'>Register</Link>
				</Menu.Item>
			</Menu>
		</>
	);
};

export default PageHeader;
