import React from 'react';
import Image from 'next/image';
import touch from '@/assets/images/touch-nature.jpeg';
import { FaPhone, FaEnvelope, FaFacebookSquare } from 'react-icons/fa';
import { Button, Link } from '@nextui-org/react';

const Contact = () => {
	return (
		<div className='flex w-full min-h-fit bg-nude md:p-10 p-4'>
			<div className='flex sm:flex-row flex-col max-w-7xl min-h-[90vh] justify-center mx-auto md:gap-10 gap-4 md:items-center items-start'>
				<div className='w-full h-full md:mt-0 mt-10'>
					<Image src={touch} alt='plaza cebu image' style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
				</div>
				<div className='flex flex-col sm:gap-10 gap-6 w-full text-primary my-4'>
					<h1 className='font-playfair lg:text-4xl text-2xl'>Get In Touch</h1>
					<p className='lg:text-lg text-base font-light lg:text-left'>
						Contact us at Virgorus Adventures! We&apos;re here to assist you on your journey of a lifetime. Whether you
						have inquiries about our tours, need assistance with bookings, or simply want to share your travel dreams,
						our dedicated team is ready to help.
					</p>
					<div className='flex flex-col gap-4'>
						<div className='flex gap-4 items-center'>
							<span className='lg:text-4xl text-2xl'>
								<FaFacebookSquare />
							</span>
							<h2 className='lg:text-lg text-sm font-light lg:text-left'>Virgorus Tours</h2>
						</div>
						<div className='flex gap-4 items-center'>
							<span className='lg:text-4xl text-2xl'>
								<FaEnvelope />
							</span>
							<h2 className='lg:text-lg text-sm font-light lg:text-left'>dev.virgorus@gmail.com</h2>
						</div>
						<div className='flex gap-4 items-center'>
							<span className='lg:text-4xl text-2xl'>
								<FaPhone />
							</span>
							<h2 className='lg:text-lg text-sm font-light lg:text-left'>09123456789</h2>
						</div>
					</div>
					<div>
						<Link href='https://www.facebook.com/VTSCebuPH'>
							<Button color='primary' size='lg' radius='sm'>
								Visit Our Page
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contact;
