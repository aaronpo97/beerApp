import React from 'react';
import { Button, Container, Form, Grid, Header, Segment } from 'semantic-ui-react';
import PageHeader from '../components/PageHeader';

const LoginForm = () => (
	<Container>
		<PageHeader />
		<Grid textAlign='center' verticalAlign='middle'>
			<Grid.Column style={{ maxWidth: 450 }}>
				<Header as='h2' color='black' textAlign='center'>
					Log-in to your account
				</Header>
				<Form size='large'>
					<Segment>
						<Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
						<Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password' />

						<Button color='black' fluid size='large'>
							Login
						</Button>
					</Segment>
				</Form>
			</Grid.Column>
		</Grid>
	</Container>
);

export default LoginForm;
