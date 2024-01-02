'use client';
import React from 'react';
import { Next13ProgressBar } from 'next13-progressbar';

function AdminPageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			{children}
			<Next13ProgressBar height='2px' color='#FF7F5C' options={{ showSpinner: false }} showOnShallow />
		</>
	);
}

export default AdminPageLayout;
