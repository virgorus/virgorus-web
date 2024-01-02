'use client';
import React from 'react';
import { Next13ProgressBar } from 'next13-progressbar';
import NavbarGuest from '@/components/Guest/NavbarGuest';

function GuestPageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<NavbarGuest />
			{children}
			<Next13ProgressBar height='2px' color='#FF7F5C' options={{ showSpinner: false }} showOnShallow />
		</>
	);
}

export default GuestPageLayout;
