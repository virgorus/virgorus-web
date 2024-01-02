'use client';

import React from 'react';
import { Card, Skeleton } from '@nextui-org/react';

export const CatalogCardSuspense = () => {
	return (
		<Card className='max-w-96 w-full h-fit mx-auto' radius='lg'>
			<div className='space-y-3 p-4'>
				<Skeleton className='w-4/5 rounded-xl mb-10'>
					<div className='h-5 w-full rounded-lg bg-default-200'></div>
				</Skeleton>
				<Skeleton className='w-3/5 rounded-lg'>
					<div className='h-3 w-3/5 rounded-lg bg-default-200'></div>
				</Skeleton>
				<Skeleton className='w-4/5 rounded-lg'>
					<div className='h-3 w-4/5 rounded-lg bg-default-200'></div>
				</Skeleton>
				<Skeleton className='w-2/5 rounded-lg'>
					<div className='h-3 w-2/5 rounded-lg bg-default-300'></div>
				</Skeleton>
				<Skeleton className='w-3/5 rounded-lg'>
					<div className='h-3 w-2/5 rounded-lg bg-default-300'></div>
				</Skeleton>
			</div>
			<Skeleton className='rounded-none'>
				<div className='h-48 rounded-lg bg-default-300'></div>
			</Skeleton>
			<div className='space-y-3 p-4'>
				<Skeleton className='w-1/6 rounded-lg'>
					<div className='h-3 w-1/6 rounded-lg bg-default-200'></div>
				</Skeleton>
				<Skeleton className='w-2/6 rounded-lg'>
					<div className='h-3 w-2/6 rounded-lg bg-default-200'></div>
				</Skeleton>
			</div>
		</Card>
	);
};
