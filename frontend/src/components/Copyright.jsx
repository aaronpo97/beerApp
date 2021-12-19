import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Copyright = props => {
	return (
		<Typography variant='body2' color='text.secondary' align='center' {...props}>
			<Link to={'/'}>the beer app</Link>
			<br />
			<br />
			Copyright Aaron William Po © {new Date().getFullYear()}
		</Typography>
	);
};

export default Copyright;
