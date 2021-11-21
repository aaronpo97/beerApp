import { Form } from 'semantic-ui-react';

const FormField = ({ label, value, setValue }) => {
	return (
		<Form.Field>
			<label>{label}</label>
			<input placeholder={label} onChange={e => setValue(e.target.value)} value={value} />
		</Form.Field>
	);
};

export default FormField;
