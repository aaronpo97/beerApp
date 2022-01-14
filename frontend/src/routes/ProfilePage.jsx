import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Box, Container, Typography, Avatar, Grid, Card } from '@mui/material';
import BeerCard from '../components/misc/BeerCard';

const ProfilePage = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [user, setUser] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const requestOptions = {
				method: 'GET',
				headers: {
					'x-access-token': localStorage['access-token'],
					'x-auth-token': localStorage['refresh-token'],
				},
			};
			const url = `http://localhost:5000/users/profile/${id}`;
			const response = await fetch(url, requestOptions);
			if (response.status === 404) return;
			if (response.status === 401) {
				localStorage.clear();
				navigate('/login');
			}
			const result = await response.json();
			if (!result.payload) return;
			localStorage['access-token'] =
				result.payload.newAccessToken || localStorage['access-token'];

			setUser(result.payload);
		};
		fetchData();
	}, []);

	useEffect(() => console.log(user), [user]);
	return (
		<Box>
			<Container maxWidth='xl'>
				{user ? (
					<>
						<Box sx={{ border: '1px solid black' }}>
							<Grid container sx={{ mt: '2em' }}>
								<Grid item xs={2}>
									<Avatar
										alt={user.username}
										src={user.displayImage.url}
										sx={{ width: 150, height: 150 }}
									/>
								</Grid>
								<Grid item xs={10}>
									<Typography variant={'h1'}>
										{`${user.firstName} ${user.lastName}`}
									</Typography>
									<Typography variant={'h2'} gutterBottom>
										{`${user.username}`}
									</Typography>
									<p>from {user.currentCity}</p>
								</Grid>
							</Grid>
						</Box>

						<Grid container>
							<Grid item xs={4}>
								{user.likes.map(beer => (
									<BeerCard beer={beer} size='small' />
								))}
							</Grid>
						</Grid>
					</>
				) : null}
			</Container>
		</Box>
	);
};

export default ProfilePage;
