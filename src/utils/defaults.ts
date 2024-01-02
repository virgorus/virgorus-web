import { IAddPackage } from '../types/types';

const addPackageDefault: IAddPackage = {
	name: '',
	description: '',
	type: '',
	location: '',
	duration: '',
	cancellation: '',
	availability: '',
	language: '',
	notice: '',
	inclusions: [''],
	exclusions: [''],
	photos: [],
	rates: [
		{
			numberOfPax: '',
			ratePerPax: '',
		},
	],
	itinerary: [
		{
			day: '',
			itineraries: [
				{
					time: '',
					activity: '',
				},
			],
		},
	],
	id: undefined,
};

export default addPackageDefault;
