import { useEffect, useState } from 'react';
import { Grid, Image, Button, Segment, Header } from 'semantic-ui-react';

const BeerList = ({ beers, setBeers }) => {
	const [deletedBeer, setDeletedBeer] = useState(null);
	const handleDelete = beer => {
		setDeletedBeer(beer);
	};
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
				console.log(response.status);
			} catch (error) {}
		};

		deleteRequest();
		setBeers([]);
	}, [deletedBeer]);

	useEffect(() => {
		const getData = async () => {
			const res = await fetch('http://localhost:5000/beer');
			const data = await res.json();
			if (data.length !== beers.length) setBeers(data);

			return;
		};

		getData();
	}, [beers, setBeers]);

	return beers.length
		? beers.map(beer => {
				return (
					<Segment>
						<Grid key={beer._id}>
							<Grid.Column width={12}>
								<Header as='h1'>
									{beer.name}
									<Header.Subheader>
										{beer.brewery}
									</Header.Subheader>
									<Header.Subheader>
										{beer.location}
									</Header.Subheader>
								</Header>

								<b>Type: {beer.type}</b>
								<p>{beer.description}</p>
								<Button onClick={() => handleDelete(beer)}>
									Delete '{beer.name}'
								</Button>
							</Grid.Column>
							<Grid.Column width={4}>
								<Image src={beer.image} />
							</Grid.Column>
						</Grid>
					</Segment>
				);
		  })
		: null;
};

export default BeerList;
