import { useParams, Outlet, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

import { Container } from 'semantic-ui-react';
import BeerInfo from '../components/BeerInfo';
import PageHeader from '../components/PageHeader';

const InfoPage = () => {
	const { id: beerID } = useParams();
	const [currentBeer, setCurrentBeer] = useState(undefined);
	const [deletedBeer, setDeletedBeer] = useState(null);

	const navigate = useNavigate();

	//fetch beer data
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

	//handle beer deletion
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
				navigate('/beers');
			} catch (error) {
				console.log(`Something went wrong: ${error}`);
			}
		};
		deleteRequest();
	}, [deletedBeer, navigate]);

	return (
		<Container>
			<PageHeader />
			<BeerInfo currentBeer={currentBeer} handleDelete={beer => setDeletedBeer(beer)} handleEdit={() => navigate(`edit`)} />
			<Outlet />
		</Container>
	);
};

export default InfoPage;
