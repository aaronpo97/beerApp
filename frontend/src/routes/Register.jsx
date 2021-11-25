import { useState } from 'react';
import { Button, Container, Form, Grid, Header, Segment } from 'semantic-ui-react';

import PageHeader from '../components/PageHeader';

import { useNavigate } from 'react-router';

const RegisterForm = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');

	return (
		<Grid textAlign='center' verticalAlign='middle'>
			<Grid.Column style={{ maxWidth: 450 }}>
				<Header as='h2' color='black' textAlign='center'>
					Register an account!
				</Header>
				<Form
					size='large'
					onSubmit={e => {
						e.preventDefault();
						// handleLogin();
					}}>
					<Segment>
						<Form.Input
							fluid
							icon='mail'
							iconPosition='left'
							placeholder='email'
							type='email'
							onChange={e => setEmail(e.target.value)}
							value={email}
						/>
						<Form.Input
							fluid
							icon='user'
							iconPosition='left'
							placeholder='username'
							onChange={e => setUsername(e.target.value)}
							value={username}
						/>
						<Form.Input
							fluid
							icon='lock'
							iconPosition='left'
							placeholder='password'
							type='password'
							onChange={e => setPassword(e.target.value)}
							value={password}
						/>

						<Button color='black' fluid size='large'>
							Register
						</Button>
					</Segment>
				</Form>
			</Grid.Column>
		</Grid>
	);
};

const Register = () => (
	<Container>
		<PageHeader currentPage='register' />
		<RegisterForm />
	</Container>
);

export default Register;
