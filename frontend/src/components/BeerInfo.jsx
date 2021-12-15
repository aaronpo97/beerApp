import { Segment, Grid, Header, Button, Image } from 'semantic-ui-react';

const BeerInfo = ({ currentBeer, handleDelete, handleEdit }) => {
	console.log(currentBeer);
	return !currentBeer ? (
		<p>Not found.</p>
	) : (
		<Segment>
			<Grid key={currentBeer._id}>
				<Grid.Column width={12}>
					<Header as='h1'>
						{currentBeer.beerName}
						<Header.Subheader>{currentBeer.breweryName}</Header.Subheader>
						<Header.Subheader>{currentBeer.location}</Header.Subheader>
					</Header>

					<Header>
						About
						<Header.Subheader>Type: {currentBeer.type}</Header.Subheader>
						<Header.Subheader>{currentBeer.abv}% ABV </Header.Subheader>
						<Header.Subheader>{currentBeer.ibu} IBU </Header.Subheader>
					</Header>

					<p>{currentBeer.description}</p>
				</Grid.Column>
				<Grid.Column width={4}>
					{currentBeer.image ? <Image src={currentBeer.image} /> : null}
				</Grid.Column>
			</Grid>
		</Segment>
	);
};

export default BeerInfo;
