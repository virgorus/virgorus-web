'use client';
import { Button, Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react';
import { IAddPackage } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';

export const CatalogCard = ({ catPackage }: { catPackage: IAddPackage }) => {
	return (
		<Card className='max-w-6xl min-w-fit w-full h-fit mx-auto'>
			<CardHeader className='flex flex-col items-start gap-2 h-fit p-4'>
				<span className='font-bold text-gray-400 uppercase sm:text-md text-sm'>{catPackage.type}</span>
				<p
					className={`font-bold h-16 overflow-hidden 'text-lg' md:'text-2xl`}
					style={{
						display: '-webkit-box',
						WebkitLineClamp: 2, // Number of lines before truncating
						WebkitBoxOrient: 'vertical',
						lineHeight: '1.5rem', // Adjust to control line height
						maxHeight: '3rem', // Maximum height before truncating
					}}
				>
					{catPackage.name}
				</p>
				<p
					className='sm:text-small text-xs text-default-400  w-full overflow-hidden'
					style={{
						display: '-webkit-box',
						WebkitLineClamp: 4, // Number of lines before truncating
						WebkitBoxOrient: 'vertical',
						lineHeight: '1rem', // Adjust to control line height
						maxHeight: '4rem', // Maximum height before truncating
						height: '4rem',
					}}
				>
					{catPackage.description}
				</p>
			</CardHeader>
			<CardBody className='min-w-fit w-full h-48 relative my-2'>
				<Image
					src={String(catPackage?.photos[0])}
					alt='Picture of the tour'
					fill={true}
					style={{
						objectFit: 'cover',
						width: '100%',
						height: '100%',
					}}
					sizes='auto'
					placeholder='blur'
					blurDataURL='../../../public/placeholder.png'
				/>
			</CardBody>
			<CardFooter className='flex justify-between gap-2 my-2 p-4'>
				<div className='flex flex-col mr-10'>
					<span className='md:text-small text-sm'>For as low as</span>
					<div className='flex gap-1'>
						<span className='sm:text-small text-sm font-semibold text-olive'>
							{`₱${Number(catPackage.rates ? catPackage?.rates[(catPackage?.rates?.length - 1) | 0]?.ratePerPax : 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
						</span>
						<span className='sm:text-small text-sm whitespace-nowrap'> / person</span>
					</div>
				</div>
				<Link href={`/tours/${catPackage.location}/${catPackage.id}`}>
					<Button radius='full' className='bg-primary text-white'>
						Book Now
					</Button>
				</Link>
			</CardFooter>
		</Card>
	);
};
