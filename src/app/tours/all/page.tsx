'use client';

import React, { useEffect, useState } from 'react';
import {
	Divider
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { fetchPackages } from '@/queries/fetchPackages';
import { IAddPackage } from '@/types/types';
import { Catalog } from '@/components/Guest/Catalog';
import { ToursList } from '@/components/Guest/ToursList';
import { Spacer } from '@nextui-org/react';
import { EmblaOptionsType, EmblaPluginType } from 'embla-carousel-react';
import Image from 'next/image';
import toursImage from '@/assets/images/all-packages.jpg';
import { CatalogSuspense } from '@/components/Guest/CatalogSuspense';
import Footer from '@/components/Guest/Footer';

type Package = {
	id: number;
	name: string;
	type: string;
	location: string;
};

interface Location {
	key: string;
	name: string;
}

function getLocations(packages: Package[]): Location[] {
	const locations: Location[] = [];

	packages.forEach((ipackage) => {
		const { location } = ipackage;

		const existingPackageSection = locations.find((section) => section.name === location);
		if (!existingPackageSection) {
			locations.push({ key: location, name: location });
		}
	});

	return locations;
}


export default function Tours() {
	const [packages, setPackages] = useState<IAddPackage[]>([]);
	const { data: packagesData, isLoading: packagesLoading } = useQuery({
		queryKey: ['packages'],
		queryFn: fetchPackages,
	});
	const locations = getLocations(packages);


	useEffect(() => {
		if (!packagesLoading && packagesData) {
			const shuffledPackages = shuffleArray(
				packagesData.map((pd: any) => ({
					id: pd.id,
					name: pd.name,
					description: pd.description,
					type: pd.type,
					location: pd.location,
					rates: pd.rates,
					photos: pd.photos,
				}))
			);
			setPackages(shuffledPackages);
		}
	}, [packagesLoading, packagesData]);

	// Function to shuffle the array
	const shuffleArray = (array: IAddPackage[]) => {
		const newArray = [...array];
		for (let i = newArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
		}
		return newArray;
	};

	const SLIDE_COUNT = packages.length;
	const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
	const OPTIONS: EmblaOptionsType = { loop: false, containScroll: 'trimSnaps', dragFree: true};

	return (
		<main className='flex min-h-screen flex-col items-center justify-between bg-white text-black'>
			<div className="flex min-w-fit h-96 relative my-2 w-full items-center justify-center">
				<Image
					src={toursImage}
					alt="tours image"
					style={{
					objectFit: 'cover',
					width: '100%',
					height: '100%',
					}}
					sizes='auto'
				/>
				<div className="absolute inset-0 text-white z-10 w-full flex h-full items-center justify-center bg-black/30">
					<div className='flex flex-col max-w-6xl h-full w-full justify-end mx-16 '>
						<h1 className='text-center xl:text-start text-xl sm:text-3xl md:text-5xl xl:text-6xl font-bold mt-10 font-poppins'>
							Explore, Discover, Wander
						</h1>
						<span className='bg-white h-[2px] rounded-full my-3'></span>
						<div className='text-center xl:text-start text-lg sm:text-xl md:text-3xl xl:text-4xl font-regular mb-10 font-poppins'>
							All Tours
						</div>
					</div>
				</div>
			</div>

			<section className='flex flex-col h-fit items-center mx-6 max-w-7xl w-full px-4 lg:px-10'>
				<div className='mb-10'>
					<div className='w-full text-center md:text-start text-xl md:text-2xl xl:text-3xl font-semibold font-playfair px-0 my-8'>- The Complete Catalog -</div>
					<div className='font-light text-justify md:text-left mb-6 xl:w-1/2'>
						Where will your next adventure take you? Delve into our treasure trove of curated tours, spanning across breathtaking landscapes, vibrant cultures, and hidden gems. Uncover ancient mysteries, embark on culinary journeys, or reconnect with nature&apos;s wonders. We offer experiences that touch the soul, inspire the mind, and leave you yearning for more.
					</div>
					<div className='font-light text-justify md:text-left mb-10 xl:w-1/2'>
						What are you waiting for? It&apos;s time to find your perfect getaway now from our full list below.
					</div>
					<Divider />
				</div>
				{!packagesLoading ? (
					<>
						<div className='hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-4 mx-auto pb-10'>
							<Catalog packages={packages} />
						</div>
						<div className='visible lg:hidden w-full'>
							{locations.map((location: Location) => (
								<ToursList key={location.key} location={location.name} />
							))}
						</div>
					</>
				) : (
					<>
						<div className='hidden md:grid grid-cols-3 gap-10 w-full pb-10'>
							<CatalogSuspense numberOfCards={9} />
						</div>
						<div className='hidden sm:grid md:hidden grid-cols-2 gap-10 w-full pb-10'>
							<CatalogSuspense numberOfCards={9} />
						</div>
						<div className='grid sm:hidden grid-cols-1 gap-10 w-full pb-10'>
							<CatalogSuspense numberOfCards={9} />
						</div>
					</>
				)}
			</section>
			<Footer />
		</main>
	);
}
