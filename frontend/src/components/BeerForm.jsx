import { Form } from 'semantic-ui-react';
import FormField from '../FormField';

const BeerForm = () => {
	return (
		<Form onSubmit={() => handleSubmit()}>
			<FormField label='Name' setValue={setName} value={name} />
			<FormField label='Brewery' setValue={setBrewery} value={brewery} />
			<FormField label='Location' setValue={setLocation} value={location} />
			<FormField label='Type' setValue={setType} value={type} />
			<FormField label='Description' setValue={setDescription} value={description} />
			<FormField label='IBU' setValue={setIbu} value={ibu} />
			<FormField label='ABV' setValue={setAbv} value={abv} />
			<FormField label='Image' setValue={setImage} value={image} />

			<Button type='submit'>Submit</Button>
		</Form>
	);
};
