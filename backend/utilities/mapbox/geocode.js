import dotenv from 'dotenv';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding.js';

dotenv.config();

const { MAPBOX_TOKEN: accessToken } = process.env;

const geocoder = mbxGeocoding({ accessToken });

const geocode = async query => {
	const geoData = await geocoder.forwardGeocode({ query, limit: 1 }).send();

	return geoData.body.features[0];
};

export default geocode;
