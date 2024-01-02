import React from 'react';
import Image from 'next/image';
import landingImage from '@/assets/images/landing-image2.jpg';

const Hero = () => {
	return (
		<div aria-label='Hero' className='max-w-6xl flex flex-col justify-center items-start h-fit'>
			<div className='w-full justify-center flex'>
				<div
					aria-label='Hero Text'
					className='xl:text-justify font-playfair xl:translate-y-10 translate-y-0 h-fit items-start justify-center flex flex-col xl:px-0 md:px-16 px-4 xl:py-0 py-10'
				>
					<div className='xl:text-[6rem] md:text-[3rem] text-[2rem]'>Discover Paradise in Every Step</div>
					<div className='text-justify md:text-lg text-base xl:-translate-y-28 translate-y-0 xl:pl-56 xl:pr-0 xl:mt-0 mt-4'>
						Explore the vibrant culture of Cebu and the natural wonders of Bohol with our tours. From historic landmarks
						to the mesmerizing Chocolate Hills, our journeys promise an unforgettable blend of adventure and relaxation
						in the heart of the Philippines.
					</div>
				</div>
			</div>
			<div className='xl:px-0 md:px-16 px-4'>
				<Image
					src={landingImage}
					alt='island photo'
					style={{
						objectFit: 'cover',
						width: 'auto',
						height: 'auto',
					}}
					priority
				/>
			</div>
		</div>
	);
};

export default Hero;
