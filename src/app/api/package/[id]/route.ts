import { PrismaClient, PrismaPromise } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const prisma = new PrismaClient();
const supabase = createClient(
	`${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL}`,
	`${process.env.NEXT_PUBLIC_SUPABASE_API_KEY}`
);

interface Rates {
	id?: string;
	packageId?: string;
	numberOfPax: string;
	ratePerPax: string;
}

interface DaySchedule {
	id?: string;
	packageId?: string;
	day: string;
	itineraries: [Itinerary];
}

interface Itinerary {
	id?: string;
	time?: string;
	activity?: string;
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

const bookingsInitial = {
	fullName: '',
	email: '',
	contactNumber: '',
	numLocalGuests: '',
	numForeignGuests: '',
	tourDate: new Date(),
	pickupInfo: '',
	packageId: '',
}

export async function GET(req: NextRequest, context: any) {
	const { id } = context.params;
	try {
		const tourPackage = await prisma.package.findUnique({
			where: { id: id },
			include: {
				rates: true,
				itinerary: {
					include: {
						itineraries: true,
					},
				},
			},
		});
		return NextResponse.json(tourPackage, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json(error, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
}

export async function PATCH(req: any, context: any) {
	const { id } = context.params;
	const formData = await req.formData();
	const files = formData.getAll('photos');
	let photoUrls: string[] = [];
	if (!files) {
		return NextResponse.json({ error: 'No files received.' }, { status: 400 });
	}

	const { data: currentImages } = await supabase.storage.from('virgorus-package-images').list(`packages/${id}`);

	for (let file of files) {
		const fileNames = currentImages?.map((image: any) => image.name);

		if (!fileNames?.includes(file.name)) {
			const { data, error } = await supabase.storage
				.from('virgorus-package-images')
				.upload(`packages/${id}/${file.name}`, file, {
					cacheControl: '3600',
					upsert: false,
				});

			if (error) {
				console.error('Supabase storage error:', error);
				return NextResponse.json({ error }, { status: 500 });
			}
		} else {
			const { data: existingUrls } = await supabase.storage
				.from('virgorus-package-images')
				.getPublicUrl(`packages/${id}/${file.name}`);
			photoUrls.push(existingUrls?.publicUrl || '');
			console.log('File already exists');
		}
	}

	photoUrls = await Promise.all(
		files.map(async (file: File) => {
			const { data } = await supabase.storage
				.from('virgorus-package-images')
				.getPublicUrl(`packages/${id}/${file.name}`);
			return data?.publicUrl || '';
		})
	);

	const packageData = {
		id: id,
		name: formData.get('name').replace(/^"(.*)"$/, '$1'),
		description: formData.get('description').replace(/^"(.*)"$/, '$1'),
		type: formData.get('type').replace(/^"(.*)"$/, '$1'),
		location: formData.get('location').replace(/^"(.*)"$/, '$1'),
		duration: formData.get('duration').replace(/^"(.*)"$/, '$1'),
		cancellation: formData.get('cancellation').replace(/^"(.*)"$/, '$1'),
		availability: formData.get('availability').replace(/^"(.*)"$/, '$1'),
		language: formData.get('language').replace(/^"(.*)"$/, '$1'),
		inclusions: JSON.parse(formData.getAll('inclusions')[0]),
		exclusions: JSON.parse(formData.getAll('exclusions')[0]),
		notice: formData.get('notice').replace(/^"(.*)"$/, '$1'),
		rates: JSON.parse(formData.getAll('rates')[0]),
		itinerary: JSON.parse(formData.getAll('itinerary')[0]),
		photos: photoUrls,
	};

	try {
		const updatedPackage = await prisma.$transaction([
			prisma.package.update({
				  where: { id: id },
				  data: {
					...packageData,
					rates: {
					  deleteMany: { packageId: id },
					  create: packageData.rates.map((rate: Rates) => ({
						numberOfPax: rate.numberOfPax,
						ratePerPax: rate.ratePerPax,
					  })),
					},
					itinerary: {
					  deleteMany: { packageId: id },
					  create: packageData.itinerary.map((item: DaySchedule) => ({
						day: item.day,
						itineraries: {
						  create: item.itineraries.map((subItem: Itinerary) => ({
							time: subItem.time,
							activity: subItem.activity,
						  })),
						},
					  })),
					},
					photos: { set: photoUrls },
				  },
			
				  include: {
					rates: true,
					bookings: true,
					itinerary: {
					  include: {
						itineraries: true,
					  },
					},
				  },
			}) 
		]);

		return NextResponse.json(updatedPackage, { status: 200 });
	} catch (error) {
		return NextResponse.json(error, { status: 500 });
	} finally {
		// Close the Prisma client connection
		await prisma.$disconnect();
	}
}

export async function DELETE(req: NextRequest, context: any) {
	const { id } = context.params;
	try {
		await prisma.package.delete({
			where: { id: id },
		});
		return NextResponse.json({ status: 200 });
	} catch (error) {
		return NextResponse.json(error, { status: 500 });
	}
}
