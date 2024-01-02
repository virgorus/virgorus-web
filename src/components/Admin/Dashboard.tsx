'use client';
import { Card, CardBody, CardHeader, CardFooter, Image, Button } from '@nextui-org/react';

import React from 'react';

const Dashboard = () => {
	return (
		<div className='flex flex-col gap-8 w-full h-fit'>
			<div>
				<h1 className='text-2xl font-bold'>Welcome Motherfucker!</h1>
			</div>
			<div className='flex gap-8 items-center w-full justify-center'>
				<UserCountCard />
				<PackageCountCard />
				<GraphCard />
			</div>
		</div>
	);
};

const UserCountCard = () => {
	return (
		<Card className='flex h-[240px] w-[240px] bg-chocolate p-6 card-shadow-1' isPressable>
			<h4 className='text-white font-bold text-md uppercase'>User Engagement</h4>
			<CardHeader className='flex-col !items-start'></CardHeader>
			<CardBody className='flex items-center justify-center'>
				<h1 className='font-bold text-[60px] text-white'>{'+800'}</h1>
				<p className='text-tiny text-white/60 uppercase font-bold'>Emails sent</p>
			</CardBody>
		</Card>
	);
};

const PackageCountCard = () => {
	return (
		<Card className='flex h-[240px] w-[240px] bg-nude p-6 card-shadow-1' isPressable>
			<h4 className='text-chocolate font-bold text-md uppercase'>Virgorus Packages</h4>

			<CardHeader className='flex-col !items-start'></CardHeader>
			<CardBody className='flex items-center justify-center'>
				<h1 className='font-bold text-[60px] text-chocolate'>{'+40'}</h1>
				<p className='text-tiny text-chocolate/60 uppercase font-bold'>Packages</p>
			</CardBody>
		</Card>
	);
};

const GraphCard = () => {
	return (
		<Card className='flex h-[240px] w-[480px] bg-nude p-6 card-shadow-1' isPressable>
			<h4 className='text-chocolate font-bold text-md uppercase'>Analytics</h4>
			<p className='text-tiny text-chocolate/60 uppercase font-bold'>Monthly Projection</p>
			<CardHeader className='flex-col !items-start'></CardHeader>
			<CardBody className='flex items-center justify-center'>
				<h1 className='font-bold text-[60px] text-chocolate'>{'graph here'}</h1>
			</CardBody>
		</Card>
	);
};

export default Dashboard;
