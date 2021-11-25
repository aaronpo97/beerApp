import { Segment, Grid, Header, Button, Image, Loader } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const BeerInfo = ({ currentBeer, handleDelete, handleEdit }) => {
	return !currentBeer ? (
		<Loader active inline='centered' />
	) : (
		<Segment>
			<Grid key={currentBeer._id}>
				<Grid.Column width={12}>
					<Header as='h1'>
						{currentBeer.name}
						<Header.Subheader>{currentBeer.brewery}</Header.Subheader>
						<Header.Subheader>{currentBeer.location}</Header.Subheader>
					</Header>

					<Header>
						About
						<Header.Subheader>Type: {currentBeer.type}</Header.Subheader>
						{currentBeer.abv ? <Header.Subheader>{currentBeer.abv}% ABV </Header.Subheader> : null}
						{currentBeer.ibu ? <Header.Subheader>{currentBeer.ibu} IBU </Header.Subheader> : null}
					</Header>

					<p>{currentBeer.description}</p>
					<Button onClick={() => handleDelete(currentBeer)}>Delete '{currentBeer.name}'</Button>
					<Button onClick={() => handleEdit(currentBeer)}>Edit '{currentBeer.name}'</Button>
				</Grid.Column>
				<Grid.Column width={4}>{currentBeer.image ? <Image src={currentBeer.image} /> : null}</Grid.Column>
			</Grid>
		</Segment>
	);
};

export default BeerInfo;
