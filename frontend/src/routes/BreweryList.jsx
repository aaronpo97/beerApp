import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Grid, Typography, Link } from '@mui/material';

export default ({ breweries, setSortingDirection, setSortingParam }) => {
	const navigate = useNavigate();
	return (
		<>
			<Button
				onClick={e => {
					setSortingDirection('ascending');
					setSortingParam('name');
				}}
				variant='contained'>
				Sort by name (ascending)
			</Button>
			<Button
				onClick={e => {
					setSortingDirection('descending');
					setSortingParam('name');
				}}
				variant='contained'>
				Sort by name (descending)
			</Button>
			<Button
				onClick={e => {
					setSortingDirection('default');
					setSortingParam('default');
				}}
				variant='contained'>
				No sorting!
			</Button>
			<Grid container spacing={1}>
				{breweries.map(brewery => (
					<Grid item xs={12} sm={6} md={4}>
						<Card sx={{ marginTop: '1em' }}>
							<CardMedia
								component='img'
								height='300'
								onClick={() => navigate(`/breweries/${brewery._id}`)}
								image='https://images.unsplash.com/photo-1615332579037-3c44b3660b53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80'
							/>
							<CardContent>
								<Typography variant='h4'>
									<Link underline='hover' onClick={() => navigate(`/breweries/${brewery._id}`)}>
										{brewery.name}
									</Link>
								</Typography>
								<Typography variant='body1' sx={{ mt: '1em' }} color='text.secondary'>
									{brewery.description}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</>
	);
};
