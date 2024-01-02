'use client';
import React from 'react';
import EditPackage from '@/components/Admin/EditPackage';
import NavbarAdmin from '@/components/Admin/NavbarAdmin';
import { SessionProvider } from 'next-auth/react';

const EditPage = (context: any) => {
	const id = context.params;
	return (
		<SessionProvider>
			<main className='flex min-h-screen flex-col items-center justify-between bg-white'>
				<section className='flex flex-col w-full h-fit items-center'>
					<NavbarAdmin />
					<div className='flex max-w-6xl md:py-10 py-6 px-2'>
						<EditPackage id={id} />
					</div>
				</section>
			</main>
		</SessionProvider>
	);
};

export default EditPage;
