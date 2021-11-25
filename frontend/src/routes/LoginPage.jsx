import { useState } from 'react';
import { Button, Container, Form, Grid, Header, Segment } from 'semantic-ui-react';

import PageHeader from '../components/PageHeader';

import { useNavigate } from 'react-router';

const LoginForm = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	// const navigate = useNavigate();
	const handleLogin = async () => {
		const response = await fetch('http://localhost:5000/login', {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify({ username, password }),
		});

		const data = await response.json();
		console.log(data);

		localStorage.setItem('token', data.token);

		// navigate('/beers');
	};

	return (
		<Grid textAlign='center' verticalAlign='middle'>
			<Grid.Column style={{ maxWidth: 450 }}>
				<Header as='h2' color='black' textAlign='center'>
					Log-in to your account
				</Header>
				<Form
					size='large'
					onSubmit={e => {
						e.preventDefault();
						handleLogin();
					}}>
					<Segment>
						<Form.Input
							fluid
							icon='user'
							iconPosition='left'
							placeholder='Username'
							onChange={e => setUsername(e.target.value)}
							value={username}
						/>
						<Form.Input
							fluid
							icon='lock'
							iconPosition='left'
							placeholder='Password'
							type='password'
							onChange={e => setPassword(e.target.value)}
							value={password}
						/>

						<Button color='black' fluid size='large'>
							Login
						</Button>
					</Segment>
				</Form>
			</Grid.Column>
		</Grid>
	);
};

const Login = () => (
	<Container>
		<PageHeader currentPage='login' />
		<LoginForm />
	</Container>
);

export default Login;
