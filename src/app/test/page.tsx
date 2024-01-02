'use client';

import React from 'react';
import { IAddPackage } from '@/types/types';
import addPackageDefault from '@/utils/defaults';

import Inclusion from '@/components/Admin/TableInclusion';
import Exclusion from '@/components/Admin/TableExclusion';

export default function TestPage() {
	const [form, setForm] = React.useState<IAddPackage>(addPackageDefault);
	const onChange = () => {};
	return (
		<div className='w-[40rem] gap-4 items-center flex justify-center mx-auto h-screen'>
			<Inclusion onChange={onChange} form={form} />
			<Exclusion onChange={onChange} form={form} />
		</div>
	);
}
