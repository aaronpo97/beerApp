import { Typography, LinearProgress, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BeerInfo = ({ currentBeer }) => {
	const navigate = useNavigate();
	return !currentBeer ? (
		<LinearProgress />
	) : (
		<div key={currentBeer._id}>
			<div width={12}>
				<h1>{currentBeer.beerName}</h1>

				<Link underline='hover' onClick={() => navigate(`/breweries/${currentBeer.brewery._id}`)}>
					<h2>{currentBeer.brewery.name}</h2>
				</Link>

				<h3>About</h3>
				<h4>Type: {currentBeer.type}</h4>
				<h4>{currentBeer.abv}% ABV </h4>
				<h4>{currentBeer.ibu} IBU </h4>

				<p>{currentBeer.description}</p>
			</div>
		</div>
	);
};

export default BeerInfo;
