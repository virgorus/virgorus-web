interface IAddPackage {
	id: any;
	name: string;
	description: string;
	type: string;
	location: string;
	duration: string;
	cancellation: string;
	availability: string;
	language: string;
	notice: string;
	rates?: [Rates];
	itinerary: [DaySchedule];
	inclusions: [string];
	exclusions: [string];
	photos: File[] | string[];
	bookings?: Booking[]
}

interface Booking {
	fullName: string;
	email: string;
	contactNumber: string;
	numLocalGuests: number;
	numForeignGuests: number;
	tourDate: Date;
	pickupInfo: string;
	packageId: string;
}

interface Rates {
	numberOfPax: string;
	ratePerPax: string;
}

interface DaySchedule {
	day: string;
	itineraries: Itinerary[];
}

interface Itinerary {
	time: string;
	activity: string;
}

interface Photo {
	src: string;
	width: number;
	height: number;
}

export type { IAddPackage, Rates, DaySchedule, Itinerary, Booking, Photo };
