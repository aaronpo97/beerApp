import { Container } from 'semantic-ui-react';
import PageHeader from '../components/PageHeader';
import EditInfoForm from '../components/EditInfoForm.jsx';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';

const EditInfo = () => {
	return (
		<Container>
			<EditInfoForm />
		</Container>
	);
};

export default EditInfo;
