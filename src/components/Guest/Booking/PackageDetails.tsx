'use client';

import React, { useState, useEffect } from 'react';
import { Accordion, AccordionItem, Divider, Spacer, Tooltip, Skeleton } from '@nextui-org/react';
import Image from 'next/image';
import { RatesTable } from './RatesTable';
import { BookingForm } from './BookingForm';
import { Recommendations } from './Recommendations';
import { getContactIcon } from '../ContactBar';
import { FaExclamationCircle } from 'react-icons/fa';
import { MdTimelapse, MdCancel, MdLanguage, MdOutlineGroups } from 'react-icons/md';
import { IAddPackage } from '@/types/types';
import { contactsData } from '@/utils/data';
import { useQuery } from '@tanstack/react-query';
import { fetchPackage } from '@/queries/fetchPackages';
import { Itinerary } from './Itinerary';
import useEmblaCarousel, { EmblaOptionsType, EmblaPluginType, EmblaCarouselType } from 'embla-carousel-react';
import { CarouselGallery } from '@/components/Guest/Carousel';
import AutoPlay from 'embla-carousel-autoplay';

interface Photo {
	src: string;
	width: number;
	height: number;
}

const autoplayOptions = {
	delay: 8000,
	stopOnInteraction: false,
	AutoPlay: true,
	rootNode: (emblaRoot: HTMLElement) => emblaRoot.parentElement,
};

export const convertPhotos = (photos: string[]): Photo[] => {
	return photos.map((photoUrl) => {
		// Extract width and height from the URL
		const match = photoUrl.match(/\/(\d+)x(\d+)\.jpg$/);
		const width = match ? parseInt(match[1], 10) : 21;
		const height = match ? parseInt(match[2], 10) : 9;

		// Create Photo object
		const photo: Photo = {
			src: photoUrl,
			width: width,
			height: height,
		};

		return photo;
	});
};

export default function PackageDetails({ id }: Readonly<{ id: number }>) {
	/* ====================         STATES         ====================*/

	const [showDescription, setShowDescription] = useState(false);
	const [isLoaded, setIsLoaded] = React.useState(false);
	const [selectedAccordion, setSelectedAccordion] = React.useState(new Set(['1']));
	const [photos, setPhotos] = useState<Photo[]>([]);
	const [availability, setAvailability] = useState<string>('');
	const [languages, setLanguages] = useState<string>('');
	const [Package, setPackage] = useState<IAddPackage>();
	const { data: packageData, isLoading: packageLoading } = useQuery({
		queryKey: ['package'],
		queryFn: () => {
			return fetchPackage(id); // Pass the id to the fetchPackage function
		},
	});

	const formatAvailability = (availability: string): string => {
		if (availability) {
			const availabilityArray = availability.split(',');
			const formattedAvailability = availabilityArray.join(', ');
			return formattedAvailability;
		} else {
			return 'n/a';
		}
	};

	const formatLanguages = (languages: string): string => {
		if (languages) {
			const languagesArray = languages.split(',');
			const formattedLanguages = languagesArray.join(', ');
			return formattedLanguages;
		} else {
			return 'n/a';
		}
	};

	useEffect(() => {
		if (!packageLoading && packageData) {
			setIsLoaded(true);
			setPackage(packageData);
			setPhotos(convertPhotos(packageData.photos));
			setAvailability(formatAvailability(packageData.availability));
			setLanguages(formatLanguages(packageData.language));
		}
	}, [packageLoading, packageData]);

	if (!packageLoading && packageData == undefined) {
		return (
			<div className='relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-transparent py-6 sm:py-12'>
				<div className='relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10'>
					<div className='mx-auto max-w-md'>
						<div className='divide-y divide-gray-300/50'>
							<div className='space-y-6 text-base leading-7 text-gray-600'>
								<div className='rounded-lg'>
									<Image
										src='https://i.ibb.co/2kHkNcZ/pckg-not-found.jpg'
										alt='package-not-found'
										width={500}
										height={500}
										sizes='auto'
										className='rounded-lg'
										style={{ objectFit: 'cover' }}
									/>
								</div>
								<p className='pb-8'>
									Are you lost, traveller? Your destination is either unavailable or not a valid location.
								</p>
							</div>
							<div className='pt-8 text-base font-semibold leading-7'>
								<p className='text-gray-900'>Looking for a new experience?</p>
								<p>
									<a href={`/tours/`} className='text-warning'>
										View our tours &rarr;
									</a>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	/* ====================         VARIABLE DECLARATIONS         ====================*/

	const ratePerPax = Package?.rates?.map((rate) => rate.ratePerPax);
	const minRate = ratePerPax?.[ratePerPax.length - 1];
	const inclusions = Package?.inclusions?.map((inclusion) => {
		return <li key={inclusion}>{inclusion}</li>;
	});
	const exclusions = Package?.exclusions?.map((exclusion) => {
		return <li key={exclusion}>{exclusion}</li>;
	});


	const SLIDE_COUNT = photos.length;
	const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
	const OPTIONS: EmblaOptionsType = { loop: false, containScroll: 'trimSnaps', dragFree: false};
	const PLUGINS: EmblaPluginType = OPTIONS ? [AutoPlay(autoplayOptions)] : [];

	return (
		<div className='flex flex-col w-full font-poppins'>
			<div aria-label='Package Header' className='flex flex-col max-w-7xl xl:px-0 px-4 pb-4 md:pb-10'>
				{isLoaded ? (
					<div>
						<p className='font-semibold font-playfair text-black text-lg md:text-xl lg:text-3xl pb-2 md:pb-4 lg:pb-6'>{Package?.name}</p>
						<div className='w-full'>
							{SLIDES.length > 0 && <CarouselGallery slides={SLIDES} photos={photos} options={OPTIONS} plugins={PLUGINS}/>}
						</div>
					</div>
				) : (
					<div>
						<Spacer y={4} />
						<Skeleton isLoaded={isLoaded} className={`rounded-lg ${isLoaded === false ? 'w-1/2' : ''}`}>
							<div className='text-3xl'>.</div>
						</Skeleton>
						<Spacer y={6} />
						<div>
							<Skeleton isLoaded={isLoaded} className='rounded-lg'>
								<div className='h-[300px] md:h-[400px] lg:h-[500px]'>.</div>
							</Skeleton>
						</div>
					</div>
				)}
			</div>
			<div aria-label='Package Body' className='flex lg:flex-row flex-col max-w-7xl xl:px-0 px-4'>
				{isLoaded ? (
					<div aria-label='Package Info' className='lg:w-4/6'>
						<div aria-label='About'>
							<div className='w-full text-black text-sm'>
								<h1 className='font-semibold pb-2 md:pb-3 lg:pb-4 text-base md:text-lg font-playfair'>About</h1>
								<div className='w-full text-black text-xs md:text-sm'>
									{showDescription ? (
										<p className='text-justify whitespace-pre-wrap w-full overflow-hidden'>
											{Package?.description && Package.description.replaceAll('\\n', '\n').replaceAll('\\', '')}
										</p>
									) : (
										<div className={`${showDescription ? '' : 'gradient-mask'}`}>
											<p
												className='text-justify whitespace-pre-wrap h-fit max-h-28 overflow-hidden'
												style={{
													display: '-webkit-box',
													WebkitLineClamp: 6, // Number of lines before truncating
													WebkitBoxOrient: 'vertical',
													maxHeight: '10rem', // Maximum height before truncating
												}}
											>
												{Package?.description && Package.description.replaceAll('\\n', '\n').replaceAll('\\', '')}
											</p>
										</div>
									)}
									<div className='pt-4 pb-2'>
										<span
											onClick={() => setShowDescription(!showDescription)}
											className='font-semibold text-sm underline underline-offset-2 hover:bg-transparent cursor-pointer'
										>
											{showDescription ? 'Read Less' : 'Read More...'}
										</span>
									</div>
								</div>
							</div>
							<div className='w-full text-black pt-2 mb-4 text-sm'>
								starts as low as&nbsp;
								<span className='text-xl font-medium'>{`₱${Number(minRate).toLocaleString('en-US', {
									minimumFractionDigits: 2,
								})}`}</span>
								&nbsp;per adult&nbsp;
								<span className='italic opacity-30'>(see rates below for full pricing)</span>
							</div>
							<div
								className={`w-full p-3 my-6 bg-nude hover:bg-nuder hover:transition-colors rounded-xl text-chocolate ${
									Package?.notice === '' ? 'hidden' : ''
								}`}
							>
								<h1 className='flex items-center text-xs font-semibold pb-2'>
									<FaExclamationCircle />
									&nbsp;&nbsp;Note :
								</h1>
								<p className='text-sm'>{Package?.notice}</p>
							</div>
						</div>
						<Divider />
						<div aria-label='Tooltips' className='flex flex-col py-4'>
							<div>
								<Tooltip
									placement={(window.innerWidth <= 768) ? 'top' : 'right'}
									closeDelay={100}
									content={
										<div className='px-1 py-2'>
											<div className='text-small font-bold text-black'>Duration</div>
											<div className='text-tiny text-black w-48 text-justify'>
												Estimated duration of the tour. This may change during the actual tour.
											</div>
										</div>
									}
								>
									<div className='flex w-fit px-4 h-8 items-center'>
										<p className='text-sm flex h-4 whitespace-pre-wrap'>
											<span className='text-lg'>
												<MdTimelapse />
											</span>
											&nbsp; Duration: {Package?.duration} hour/s
										</p>
									</div>
								</Tooltip>
							</div>
							<div>
								<Tooltip
									placement={(window.innerWidth <= 768) ? 'top' : 'right'}
									closeDelay={100}
									content={
										<div className='px-1 py-2'>
											<div className='text-small font-bold text-black'>Cancellation</div>
											<div className='text-tiny text-black w-48 text-justify'>
												For a full refund, cancel at least {Package?.cancellation} hours prior to the start date of the
												experience.
											</div>
										</div>
									}
								>
									<div className='flex w-fit px-4 h-8 items-center'>
										<p className='text-sm flex h-4 whitespace-pre-wrap'>
											<span className='text-lg'>
												<MdCancel />
											</span>
											&nbsp;&nbsp;
											{Package?.cancellation ? `${Package?.cancellation}-hour` : 'No'} cancellation
										</p>
									</div>
								</Tooltip>
							</div>
							<div>
								<Tooltip
									placement={(window.innerWidth <= 768) ? 'top' : 'right'}
									closeDelay={100}
									content={
										<div className='px-1 py-2'>
											<div className='text-small font-bold text-black'>Availability</div>
											<div className='text-tiny text-black w-48 text-justify'>
												Some packages may or may not be available on certain days of the week.
											</div>
										</div>
									}
								>
									<div className='flex w-fit px-4 h-8 items-center'>
										<p className='text-sm flex h-4 whitespace-pre-wrap'>
											<span className='text-lg'>
												<MdOutlineGroups />
											</span>
											&nbsp; Available{' '}
											{availability === 'Saturday, Sunday' ||
											availability === 'Monday, Tuesday, Wednesday, Thursday, Friday' ||
											availability === 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday'
												? availability === 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday'
													? 'daily'
													: availability === 'Saturday, Sunday'
													? 'on weekends'
													: 'on weekdays'
												: availability}
										</p>
									</div>
								</Tooltip>
							</div>
							<div className='w-full'>
								<Tooltip
									placement={(window.innerWidth <= 768) ? 'top' : 'right'}
									closeDelay={100}
									content={
										<div className='px-1 py-2'>
											<div className='text-small font-bold text-black'>Live guide</div>
											<div className='text-tiny text-black w-48 text-justify'>
												The languages your tour guide is proficient in. Feel free to ask them anything about the tour.
											</div>
										</div>
									}
								>
									<div className='flex w-fit px-4 h-8 items-center truncate'>
										<p className='text-sm flex h-4'>
											<span className='text-lg'>
												<MdLanguage />
											</span>
											&nbsp; Live guide: {languages}
										</p>
									</div>
								</Tooltip>
							</div>
						</div>
						<Divider />
						<div aria-label='Accordions'>
							<Accordion
								defaultExpandedKeys={selectedAccordion}
								isCompact={true}
								selectionMode='multiple'
								itemClasses={{
									heading: 'font-medium',
									content: 'text-sm font-light text-justify pb-4',
								}}
							>
								<AccordionItem key='1' title='Rates and inclusions' className='text-black'>
									<div className='flex flex-col w-full sm:flex-row sm:mb-4'>
										<div
											aria-label='Rates Table'
											className={`sm:mx-2 min-w-fit flex justify-center ${ratePerPax?.[0] === '' ? 'hidden' : ''}`}
										>
											<div className='w-56'>
												<RatesTable rates={Package?.rates} />
											</div>
										</div>
										<div aria-label='Inclusions and Exclusions' className='mt-4 sm:my-4 mx-0 lg:mx-2 w-full'>
											<div className={`mb-4 ${Package?.inclusions?.[0] ? '' : 'hidden'}`}>
												<h1
													className={`text-md font-medium underline underline-offset-2 ${
														Package?.inclusions?.[0] ? '' : 'hidden'
													}`}
												>
													Inclusions
												</h1>
												<p className={`text-xs mx-4 md:text-sm sm:mx-4 ${Package?.inclusions?.[0] ? '' : 'hidden'}`}>
													{inclusions}
												</p>
											</div>
											<div className={`mb-4 ${Package?.exclusions?.[0] ? '' : 'hidden'}`}>
												<Divider />
												<Spacer y={2} />
												<h1
													className={`text-md font-medium underline underline-offset-2 ${
														Package?.exclusions?.[0] ? '' : 'hidden'
													}`}
												>
													Exclusions
												</h1>
												<p className={`text-xs md:text-sm sm:m-2 ${Package?.exclusions?.[0] ? '' : 'hidden'}`}>
													{exclusions}
												</p>
											</div>
										</div>
									</div>
								</AccordionItem>
								<AccordionItem key='2' title='Sample itinerary' className='text-black'>
									<Itinerary itinerary={Package?.itinerary} />
								</AccordionItem>
								<AccordionItem key='3' title='Help' className='text-black'>
									If you have any questions or need assistance, feel free to reach out to our support team. We are here
									to ensure that you have smooth and enjoyable experience. You may contact us at:
								<div className='mt-4'>
									{contactsData.map((contact) => (
										<div className='flex items-center mb-2' key={contact.key}>
											<div className='mr-4'>{getContactIcon(contact.key)}</div>
											{contact.value === 'VTSCebuPH' ? (
												<div>
													<a href='https://m.facebook.com/profile.php/?id=100069180882389' target='_blank' rel='noopener noreferrer'>
														{contact.value}
													</a>
												</div>
											) : (
												<div>{contact.value}</div>
											)}
										</div>
									))}
								</div>
								</AccordionItem>
							</Accordion>
							<Divider className='px-4' />
						</div>
					</div>
				) : (
					<div className='lg:w-4/6'>
						<div className='flex flex-col gap-4'>
							<div>
								<Skeleton isLoaded={isLoaded} className='rounded-lg w-36'>
									<h1 className='text-lg'>.</h1>
								</Skeleton>
							</div>
							<div className='flex flex-col gap-2 pb-2'>
								<Skeleton isLoaded={isLoaded} className='rounded-lg'>
									<p className='text-md'></p>
								</Skeleton>
								<Skeleton isLoaded={isLoaded} className='rounded-lg'>
									<p className='text-md'>.</p>
								</Skeleton>
								<Skeleton isLoaded={isLoaded} className='rounded-lg'>
									<p className='text-md'>.</p>
								</Skeleton>
								<Skeleton isLoaded={isLoaded} className='rounded-lg'>
									<p className='text-md'>.</p>
								</Skeleton>
								<Skeleton isLoaded={isLoaded} className='rounded-lg w-2/3'>
									<p className='text-md'>.</p>
								</Skeleton>
							</div>
							<Divider />
							<div className='flex flex-col w-48 gap-2 pb-2'>
								<Skeleton isLoaded={isLoaded} className='rounded-lg'>
									<p className='text-md'></p>
								</Skeleton>
								<Skeleton isLoaded={isLoaded} className='rounded-lg'>
									<p className='text-md'>.</p>
								</Skeleton>
								<Skeleton isLoaded={isLoaded} className='rounded-lg'>
									<p className='text-md'>.</p>
								</Skeleton>
								<Skeleton isLoaded={isLoaded} className='rounded-lg'>
									<p className='text-md'>.</p>
								</Skeleton>
								<Skeleton isLoaded={isLoaded} className='rounded-lg'>
									<p className='text-md'>.</p>
								</Skeleton>
							</div>
							<Divider />
							<div className=''>
								<Skeleton isLoaded={isLoaded} className='rounded-lg h-64'>
									<p className='text-md'>.</p>
								</Skeleton>
							</div>
							<Divider />
						</div>
					</div>
				)}
				<Spacer x={10} />
				<div aria-label='Booking Form' className='py-10 lg:py-0 lg:w-2/6'>
					<BookingForm />
				</div>
			</div>
			<Spacer y={14} />
			<div aria-label='Package Footer' className='max-w-7xl xl:px-0 px-4'>
				{isLoaded ? (
					<h1 className='font-playfair text-2xl text-black font-semibold py-4 text-center lg:text-start'>
						Explore more of {Package?.location}
					</h1>
				) : (
					<Skeleton className='w-2/5 rounded-lg my-8'>
						<div className='h-8 w-full rounded-lg bg-default-200'></div>
					</Skeleton>
				)}
				<div className='flex flex-row'>
					<Recommendations location={Package?.location} count={3} />
				</div>
			</div>
			<Spacer y={48} />
		</div>
	);
}
