import React from 'react';
import { Button, Link } from '@nextui-org/react';
import Image from 'next/image';
import simala from '@/assets/images/Simala-cebu.png';
import beach from '@/assets/images/Beach-cebu.jpg';
import temple from '@/assets/images/Temple-cebu.png';

const WhyUs = () => {
	return (
		<div className='flex flex-col w-full max-w-6xl mx-auto gap-4 min-h-fit'>
			<div className='flex w-full justify-between items-center xl:px-0 px-4'>
				<h1 className='font-playfair lg:text-6xl md:text-4xl text-2xl'>Why Virgorus?</h1>
				<Link href='/about'>
					<Button color='primary' size='lg' radius='sm'>
						About Us
					</Button>
				</Link>
			</div>
			<div className='flex w-full items-center xl:px-0 px-4'>
				<p className='lg:text-lg text-base font-playfair lg:text-left text-justify'>
					We redefine travel with a commitment to meticulous planning, ensuring every journey is a masterpiece of
					organization and discovery. From seamless itineraries to curated experiences, <span className='font-semibold'>we blend the cultural curiosity of a Virgo with the nature-loving affinity of a Taurus</span>, crafting unforgettable tours where every detail is as vibrant as your adventure.
				</p>
			</div>
			<div className='flex w-full md:h-[380px] h-[200px] items-center md:gap-3 gap-1 xl:px-0 px-4 mt-6'>
				<div className='flex md:w-2/6 w-4/6 md:h-[380px] h-[200px] overflow-hidden justify-center items-center'>
					<Image
						src={simala}
						alt='simala-image'
						style={{
							objectFit: 'cover',
							width: '100%',
							height: '100%',
						}}
						className='md:w-full w-fit h-full'
					/>
				</div>
				<div className='flex w-full md:h-[380px] h-[200px] overflow-hidden justify-center items-center'>
					<Image
						src={temple}
						alt='temple-image'
						style={{
							objectFit: 'cover',
							width: '100%',
							height: '100%',
						}}
						className='md:w-full w-fit h-full'
					/>
				</div>
				<div className='flex md:w-2/6 w-4/6 md:h-[380px] h-[200px] overflow-hidden justify-center items-center'>
					<Image
						src={beach}
						alt='beach-image'
						style={{
							objectFit: 'cover',
							width: '100%',
							height: '100%',
						}}
						className='md:w-full w-fit min-h-full'
					/>
				</div>
			</div>
		</div>
	);
};

export default WhyUs;
