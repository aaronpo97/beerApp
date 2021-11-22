import { Segment, Grid, Header, Button, Image } from 'semantic-ui-react';
import { useEffect, useState } from 'react';

const BeerInfo = ({ beerID }) => {
	//
	// handle beer deletion
	const [deletedBeer, setDeletedBeer] = useState(null);

	useEffect(() => {
		const deleteRequest = async () => {
			try {
				if (!deletedBeer) return;

				const url = `http://localhost:5000/beer/${deletedBeer._id}`;
				const data = deletedBeer;
				const response = await fetch(url, {
					method: 'DELETE',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(data),
				});
				if (response.status !== 200) throw new Error('Unable to delete.');
			} catch (error) {
				console.log(`Something went wrong: ${error}`);
			}
		};

		deleteRequest();
	}, [deletedBeer]);

	const handleDelete = beer => {
		setDeletedBeer(beer);
	};

	//Get the selected beer data (as per currentBeer)

	const [currentBeer, setCurrentBeer] = useState(undefined);

	useEffect(() => {
		const getBeerData = async () => {
			try {
				const url = `http://localhost:5000/beer/${beerID}`;
				const response = await fetch(url);
				if (response.status !== 200) setCurrentBeer(null);

				const data = await response.json();
				setCurrentBeer(data);
			} catch (error) {
				console.error(error);
			}
		};

		getBeerData();
	}, [beerID]);

	return !currentBeer ? (
		<div>404 cannot find a beer with that name</div>
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
					{/* <Button onClick={() => handleEdit(currentBeer)}>Edit '{currentBeer.name}'</Button> */}
				</Grid.Column>
				<Grid.Column width={4}>{currentBeer.image ? <Image src={currentBeer.image} /> : null}</Grid.Column>
			</Grid>
		</Segment>
	);
};

export default BeerInfo;
