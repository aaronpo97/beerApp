import { useParams, Outlet, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

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
				const headers = { 'x-access-token': localStorage.token };
				const response = await fetch(url, { headers });
				const data = await response.json();

				const {
					author,
					brewery: breweryInfo,
					description,
					ibu,
					image,
					name: beerName,
					type,
					abv,
				} = data;

				const { name: breweryName } = breweryInfo;

				const beer = { author, breweryName, description, ibu, image, beerName, type, abv };
				setCurrentBeer(beer);
			} catch (error) {
				console.error(error);
			}
		};
		getBeerData();
	}, [beerID]);

	return (
		<>
			<BeerInfo
				currentBeer={currentBeer}
				handleDelete={beer => setDeletedBeer(beer)}
				handleEdit={() => navigate(`edit`)}
			/>
			<Outlet />
		</>
	);
};

export default InfoPage;
