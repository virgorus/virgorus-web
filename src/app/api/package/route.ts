import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();
const supabase = createClient(
	`${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL}`,
	`${process.env.NEXT_PUBLIC_SUPABASE_API_KEY}`
);

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

export async function POST(req: any, res: any) {
	const formData = await req.formData();
	const uniqueId = uuidv4();
	const files = formData.getAll('photos');
	if (!files) {
		return NextResponse.json({ error: 'No files received.' }, { status: 400 });
	}

	for (let file of files) {
		const { data, error } = await supabase.storage
			.from('virgorus-package-images')
			.upload(`packages/${uniqueId}/${file.name}`, file, {
				cacheControl: '3600',
				upsert: false,
			});

		if (error) {
			console.error('Supabase storage error:', error);
			return NextResponse.json({ error }, { status: 500 });
		}
	}
	const photoUrls = await Promise.all(
		files.map(async (file: File) => {
			const { data } = await supabase.storage
				.from('virgorus-package-images')
				.getPublicUrl(`packages/${uniqueId}/${file.name}`);
			return data?.publicUrl || '';
		})
	);
	const packageData = {
		id: uniqueId,
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
	const createdPackage = await prisma.package.create({
		data: {
			id: uniqueId,
			name: packageData.name,
			description: packageData.description,
			type: packageData.type,
			location: packageData.location,
			duration: packageData.duration,
			cancellation: packageData.cancellation,
			availability: packageData.availability,
			language: packageData.language,
			inclusions: {
				set: packageData.inclusions,
			},
			exclusions: {
				set: packageData.exclusions,
			},
			notice: packageData.notice,
			rates: {
				create: packageData?.rates?.map((rate: Rates) => ({
					numberOfPax: rate.numberOfPax,
					ratePerPax: rate.ratePerPax,
				})),
			},
			itinerary: {
				create: packageData?.itinerary?.map((daySchedule: DaySchedule) => ({
					day: daySchedule.day,
					itineraries: {
						create: daySchedule?.itineraries?.map((itinerary: Itinerary) => ({
							time: itinerary.time,
							activity: itinerary.activity,
						})),
					},
				})),
			},
			photos: { set: photoUrls },
		},
		include: {
			rates: true,
			itinerary: {
				include: {
					itineraries: true,
				},
			},
		},
	});

	await prisma.$disconnect();
	return NextResponse.json(createdPackage, { status: 200 });
}

export async function GET(req: NextRequest) {
	try {
		const packages = await prisma.package.findMany({
			include: {
				rates: true,
				itinerary: {
					include: {
						itineraries: true,
					},
				},
			},
		});
		return NextResponse.json(packages, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json(error, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
}
