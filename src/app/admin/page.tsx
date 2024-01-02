'use client';

import Dashboard from '@/components/Admin/Dashboard';
import NavbarAdmin from '@/components/Admin/NavbarAdmin';
import { SessionProvider } from 'next-auth/react';

export default function AdminPage() {
	return (
		<SessionProvider>
			<main className='flex min-h-screen flex-col items-center justify-between bg-white'>
				<section className='flex flex-col w-full h-fit items-center'>
					<NavbarAdmin />
					<div className='flex w-full p-10 '>
						<Dashboard />
					</div>
				</section>
			</main>
		</SessionProvider>
	);
}
