'use client';

import NavbarGuest from '@/components/Guest/NavbarGuest';
import Hero from '@/components/Guest/Landing/Hero';
import About from '@/components/Guest/Landing/About';
import WhyUs from '@/components/Guest/Landing/WhyUs';
import Contact from '@/components/Guest/Landing/Contact';
import SitemapFooter from '@/components/Footer';
import { Spacer } from '@nextui-org/react';

export default function Home() {
	return (
		<main className='flex flex-col items-center justify-between bg-white min-h-screen w-full'>
			<NavbarGuest />
			<section className='flex flex-col w-full h-fit items-center justify-center mx-aut text-black'>
				<Hero />
				<Spacer y={20} />
				<About />
				<Spacer y={10} />
				<WhyUs />
				<Spacer y={14} />
				<Contact />
			</section>
			<SitemapFooter />
		</main>
	);
}
