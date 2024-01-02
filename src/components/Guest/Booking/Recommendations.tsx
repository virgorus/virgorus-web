'use client';

import React from 'react';
import { Catalog } from '@/components/Guest/Catalog';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPackages } from '@/queries/fetchPackages';
import { IAddPackage } from '@/types/types';
import { CatalogSuspense } from '../CatalogSuspense';
import { CarouselShowcase } from '../Carousel';
import { EmblaOptionsType, EmblaPluginType } from 'embla-carousel-react';
import AutoPlay from 'embla-carousel-autoplay';

const autoplayOptions = {
	delay: 4000,
	stopOnInteraction: false,
	AutoPlay: true,
	rootNode: (emblaRoot: HTMLElement) => emblaRoot.parentElement,
};

export const Recommendations = ({ location, count }: { location: string | null | undefined, count: number | null | undefined }) => {
	const [packages, setPackages] = useState<IAddPackage[]>([]);
	const { data: packagesData, isLoading: packagesLoading } = useQuery({
		queryKey: ['packages'],
		queryFn: fetchPackages,
	});

	// Function to shuffle the array
	const shuffleArray = (array: IAddPackage[]) => {
		const newArray = [...array];
		for (let i = newArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
		}
		return newArray;
	};

	let selectedPackages: IAddPackage[] = [];
	if (count == null || count == undefined) {
		if (!packagesLoading && packagesData) {
			selectedPackages = shuffleArray(
				packagesData
					.filter((pd: IAddPackage) => pd.location === location)
					.map((pd: IAddPackage) => ({
						id: pd.id,
						name: pd.name,
						description: pd.description,
						type: pd.type,
						location: pd.location,
						rates: pd.rates,
						photos: pd.photos,
					}))
			);
		}
		count = selectedPackages.length;
	}

	useEffect(() => {
		if (!packagesLoading && packagesData && count) {
			let selectedPackages: IAddPackage[];

			if (location) {
				// Filter and shuffle packages for the specified location
				selectedPackages = shuffleArray(
					packagesData
						.filter((pd: IAddPackage) => pd.location === location)
						.map((pd: IAddPackage) => ({
							id: pd.id,
							name: pd.name,
							description: pd.description,
							type: pd.type,
							location: pd.location,
							rates: pd.rates,
							photos: pd.photos,
						}))
						.slice(0, count) // Take up to n packages for the specified location
				);
			} else {
				// Randomly select n packages from the entire list
				selectedPackages = shuffleArray(
					packagesData.map((pd: IAddPackage) => ({
						id: pd.id,
						name: pd.name,
						description: pd.description,
						type: pd.type,
						location: pd.location,
						rates: pd.rates,
						photos: pd.photos,
					}))
				).slice(0, count);
			}

			setPackages(selectedPackages);
		}
	}, [packagesLoading, packagesData, location, count]);


	const SLIDE_COUNT = packages.length;
	const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
	const OPTIONS: EmblaOptionsType = { loop: false, align: 'center', containScroll: false, dragFree: false};
	const PLUGINS: EmblaPluginType = OPTIONS ? [AutoPlay(autoplayOptions)] : [];

	return (
		<main className='flex flex-col w-full items-center justify-between bg-transparent'>
			<section className='flex flex-col h-fit items-center md:mx-6 mx-0 p-0 max-w-7xl w-full'>
				{!packagesLoading ? (
					<>
						<div className='hidden lg:grid grid-cols-3 gap-10 w-full'>
							<Catalog packages={packages} />
						</div>
						<div className='w-full lg:hidden'>
							{SLIDES.length > 0 && <CarouselShowcase slides={SLIDES} options={OPTIONS} plugins={PLUGINS} packages={packages} />}
						</div>
					</>
				) : (
					<>
						<div className='hidden lg:grid grid-cols-3 gap-10 w-full'>
							<CatalogSuspense numberOfCards={3} />
						</div>
						<div className='lg:hidden w-full px-4'>
							<CatalogSuspense numberOfCards={1} />
						</div>
					</>
				)}
			</section>
		</main>
	);
};
