import { Form } from 'semantic-ui-react';

const FormField = ({ label, setState }) => {
	return (
		<Form.Field>
			<label>{label}</label>
			<input placeholder={label} onChange={e => setState(e.target.value)} />
		</Form.Field>
	);
};

export default FormField;
