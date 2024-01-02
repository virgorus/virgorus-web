'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPackages } from '@/queries/fetchPackages';
import { IAddPackage, Photo } from '@/types/types';
import { Spacer, Skeleton } from '@nextui-org/react';
import { CarouselList, CarouselImage } from '@/components/Guest/Carousel';
import { EmblaOptionsType, EmblaPluginType } from 'embla-carousel-react';
import { Catalog } from '@/components/Guest/Catalog';
import { convertPhotos } from '@/components/Guest/Booking/PackageDetails';
import AutoPlay from 'embla-carousel-autoplay';
import { locationData } from '@/utils/data';
import { CatalogSuspense } from '@/components/Guest/CatalogSuspense';

const autoplayOptions = {
	delay: 8000,
	stopOnInteraction: false,
	AutoPlay: true,
	rootNode: (emblaRoot: HTMLElement) => emblaRoot.parentElement,
};

const DestinationPage = ({ params }: { params: { destination: string } }) => {
  	const destination = decodeURIComponent(params.destination.replace(/\+/g, ' '));
	const matchingLocation = locationData.find((location) => location.value === destination);
	const destinationDescription = matchingLocation?.description ?? 'Description not found';	

	const [packages, setPackages] = useState<IAddPackage[]>([]);
	const [photos, setPhotos] = useState<Photo[]>([]);
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

	useEffect(() => {
		if (!packagesLoading && packagesData) {
			let selectedPackages: IAddPackage[];

			selectedPackages = shuffleArray(
				packagesData
				.filter((pd: IAddPackage) => pd.location === destination)
				.map((pd: IAddPackage) => ({
					id: pd.id,
					name: pd.name,
					description: pd.description,
					type: pd.type,
					location: pd.location,
					rates: pd.rates,
					photos: pd.photos,
				}))
			)
			setPackages(selectedPackages);	
			const photos = selectedPackages.flatMap((p) => {
				return p.photos.filter((photo) => typeof photo === 'string');
			  });
			setPhotos(convertPhotos(photos as string[]));
		}
	}, [packagesLoading, packagesData, destination]);


	const [slidesToScroll, setSlidesToScroll] = useState<number>(0);
	useEffect(() => {
		const handleResize = () => {
		  if (window.innerWidth < 600) {
			setSlidesToScroll(1);
		  } else if (window.innerWidth >= 600 && window.innerWidth < 1200) {
			setSlidesToScroll(2);
		  } else {
			setSlidesToScroll(4);
		  }
		};
	
		window.addEventListener('resize', handleResize);
		return () => {
		  window.removeEventListener('resize', handleResize);
		};
	  }, []);

	const SLIDE_COUNT = packages.length;
	const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
	const OPTIONS: EmblaOptionsType = { loop: false, slidesToScroll: slidesToScroll};

	const PHOTO_COUNT = photos.length
	const PHOTOS = Array.from(Array(PHOTO_COUNT).keys());
	const OPTIONS_PHOTOS: EmblaOptionsType = { loop: false, containScroll: 'trimSnaps', dragFree: false, watchDrag: true};
	const PLUGINS: EmblaPluginType = OPTIONS_PHOTOS ? [AutoPlay(autoplayOptions)] : [];

	return (
		<main className='flex min-h-screen flex-col items-center justify-between bg-white text-black'>
			<section className='flex flex-col h-fit items-center mx-6 max-w-7xl w-full px-0 sm:px-10 pb-10'>
				<div className='w-full text-3xl sm:text-5xl md:text-7xl font-semibold font-playfair my-2 sm:my-8 px-2 sm:px-0'>Discover {destination}</div>
				<div className='bg-nude rounded-none sm:rounded-2xl'>
					<div className='w-full'>
						{packagesLoading && (
							<Skeleton className="rounded-t-2xl h-[200px] md:h-[350px] lg:h-[500px]"/>
						)}
   					  	{PHOTOS.length > 0 && <CarouselImage slides={PHOTOS} photos={photos} options={OPTIONS_PHOTOS} plugins={PLUGINS}/>}
					</div>
					<div className='p-6 sm:p-12 lg:p-24'>
						<div className='w-full text-lg md:text-3xl font-semibold font-playfair mb-4 md:mb-8'>About</div>
						<p className='w-full lg:w-2/3 text-justify text-xs md:text-sm'>{destinationDescription}</p>
					</div>
				</div>
				<Spacer y={12} />
				<>
					<div className='visible w-full px-2 sm:px-0'>
						<CarouselList slides={SLIDES} options={OPTIONS} packages={packages} />
					</div>
					{packagesLoading && (
						<div className='flex w-full px-4'>
							<div className='hidden md:grid grid-cols-3 gap-10 w-full pb-10'>
								<CatalogSuspense numberOfCards={9} />
							</div>
							<div className='hidden sm:grid md:hidden grid-cols-2 gap-10 w-full pb-10'>
								<CatalogSuspense numberOfCards={9} />
							</div>
							<div className='grid sm:hidden grid-cols-1 gap-10 w-full pb-10'>
								<CatalogSuspense numberOfCards={9} />
							</div>
						</div>
					)}
				</>
			</section>
		</main>
	);
}

export default DestinationPage;
