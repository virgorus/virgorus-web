import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPackages } from '@/queries/fetchPackages';
import { IAddPackage } from '@/types/types';
import landingImage from '@/assets/images/landing-image.jpg';
import Image from 'next/image';
import { Button, Link } from '@nextui-org/react';
import { Recommendations } from '../Booking/Recommendations';

const About = () => {
	const [packages, setPackages] = useState<IAddPackage[]>([]);
	const { data: packagesData, isLoading: packagesLoading } = useQuery({
		queryKey: ['packages'],
		queryFn: fetchPackages,
	});

	useEffect(() => {
		if (!packagesLoading && packagesData) {
			setPackages(
				packagesData.map((pd: any) => ({
					id: pd.id,
					name: pd.name,
					description: pd.description,
					type: pd.type,
					rate: pd.rates[0].ratePerPax,
					photos: pd.photos,
				}))
			);
		}
	}, [packagesLoading, packagesData]);
	return (
		<div aria-label='About Us' className='flex flex-col h-fit w-full justify-start text-white relative'>
			{/* About */}
			<div className='md:bg-primary bg-none absolute w-full md:h-[100vh] h-[80vh] -z-0'></div>
			<div className='flex flex-col font-poppins w-full z-10'>
				<div className='flex flex-col justify-start pt-10 md:pb-0 pb-10 max-w-6xl mx-auto md:bg-none bg-primary xl:px-0 md:px-16 px-4'>
					<h1 className='font-playfair lg:text-6xl md:text-4xl text-2xl'>Virgorus Organizes Everything</h1>
					<div className='flex md:flex-row flex-col-reverse justify-evenly lg:pt-6 lg:pb-16 pt-6 sm:pb-16 pb-0 gap-4'>
						<div className='flex flex-col md:justify-between md:items-start items-end xl:w-3/5 w-full mr-auto xl:h-[300px] lg:h-[200px] min-h-fit gap-4'>
							<p className='lg:text-lg text-base font-extralight lg:text-left text-justify lg:mt-4'>
								Our tours go beyond exploration—they are meticulously organized adventures that seamlessly blend
								excitement, comfort, and cultural richness, ensuring that every moment becomes a cherished memory.
							</p>
							<Link href={`/tours`}>
								<Button color='default' size='lg' radius='sm' className='font-poppins text-primary'>
									See Destinations
								</Button>
							</Link>
						</div>
						<div className='overflow-hidden object-cover w-full h-fit xl:hidden flex'>
							<Image
								src={landingImage}
								alt='about image'
								style={{
									objectFit: 'cover',
									width: 'auto',
									height: 'auto',
								}}
								className='min-h-[200px] w-fit'
							/>
						</div>
					</div>
				</div>
				<div className='absolute right-0 flex top-[138px] max-w-[660px] items-center overflow-hidden'>
					<Image
						src={landingImage}
						alt='about image'
						style={{
							objectFit: 'cover',
							width: 'auto',
							height: 'auto',
						}}
						className='clip-path-div w-fit xl:block hidden'
					/>
				</div>
				{/* Packages */}
				<div className='flex flex-col justify-start max-w-6xl w-full mx-auto xl:px-0 md:px-16 px-4'>
					<div className='flex md:flex-row flex-col w-full items-center justify-between gap-4'>
						<h1 className='font-playfair lg:text-6xl sm:text-4xl text-2xl sm:mt-0 mt-10 md:text-white text-primary'>
							Explore Popular Packages
						</h1>
						<div className='w-fit'>
							<Link href={`/tours/all`}>
								<Button color='default' size='lg' radius='sm' className='font-poppins text-primary'>
									Browse All Packages
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
			<div className='h-fit w-full lg:my-10 my-4 lg:px-10'>
				<Recommendations location='' count={3} />
			</div>
		</div>
	);
};

export default About;
