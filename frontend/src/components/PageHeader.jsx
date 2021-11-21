import { Container, Grid, Header, Segment, Button } from 'semantic-ui-react';

const PageHeader = () => {
	return (
		<Segment style={{ marginTop: '100px' }}>
			<Header as='h1' size='huge'>
				The Beer App
				<Header.Subheader>by Aaron Po</Header.Subheader>
			</Header>
		</Segment>
	);
};

export default PageHeader;
