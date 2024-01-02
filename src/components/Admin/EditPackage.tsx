'use client';
import React, { FormEvent, useEffect } from 'react';
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Button,
	Input,
	Textarea,
	Tooltip,
	Select,
	SelectItem,
	Selection,
	Divider,
} from '@nextui-org/react';
import { IAddPackage } from '../../types/types';
import addPackageDefault from '@/utils/defaults';
import { availabilityData, languagesData, locationData } from '@/utils/data';
import TableRates from './TableRates';
import TableInclusions from './TableInclusion';
import TableExclusions from './TableExclusion';
import TableItinerary from './TableItinerary';
import ButtonUpload from './ButtonUpload';
import { useQuery } from '@tanstack/react-query';
import { fetchPackage } from '@/queries/fetchPackages';
import axios from 'axios';

async function editPackage(data: FormData, id: any) {
	try {
		const response = await axios.patch(`/api/package/${id}`, data);
		console.log(response.data);
	} catch (error) {
		console.error('An error occurred while updating package:', error);
		throw error;
	}
}

interface Props {
	readonly id: any;
}

export default function EditPackage({ id }: Props) {
	const [form, setForm] = React.useState<any>(addPackageDefault);
	const [availability, setAvailability] = React.useState<Selection>(new Set(['Monday']));
	const [language, setLanguage] = React.useState<Selection>(new Set(['English']));
	const [location, setLocation] = React.useState<string>('Metro Cebu');
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	const { data: packageData, isLoading: packageLoading } = useQuery({
		queryKey: ['packages', id.id],
		queryFn: () => fetchPackage(id.id),
	});

	useEffect(() => {
		if (!packageLoading && packageData) {
			const data = {
				id: packageData.id,
				name: packageData.name,
				description: packageData.description,
				type: packageData.type,
				location: packageData.location,
				duration: packageData.duration,
				cancellation: packageData.cancellation,
				notice: packageData.notice,
				availability: packageData.availability,
				language: packageData.language,
				rates: packageData.rates,
				inclusions: packageData.inclusions,
				exclusions: packageData.exclusions,
				itinerary: packageData.itinerary,
				photos: packageData.photos,
			};

			setForm(data);
			setAvailability(new Set(packageData.availability.split(',')));
			setLanguage(new Set(packageData.language.split(',')));
			setLocation(packageData.location);
		}
	}, [packageLoading, packageData]);

	const handleSaveClick = async (e: FormEvent<HTMLFormElement>) => {
		setIsLoading(true);
		e.preventDefault();
		const formData = new FormData();
		// Append text fields from the form
		Object.entries(form).forEach(([key, value]: any) => {
			if (key !== 'photos') {
				formData.append(key, JSON.stringify(value));
			} else if (key === 'photos' && value.length > 0) {
				if (typeof value === 'string') {
					formData.append(key, JSON.stringify(value));
				} else {
					const photosArray = value as File[];
					photosArray.forEach((photo, index) => {
						formData.append('photos', photo);
					});
				}
			}
		});

		for (const pair of formData.entries()) {
			console.log(pair[0] + ', ' + pair[1]);
		}

		// Log the formData to check its content
		console.log(formData);

		await editPackage(formData, packageData.id);
		window.location.href = '/admin/packages';
	};

	const handleReturn = () => {
		window.location.href = '/admin/packages';
	};

	const availabilitySelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedValues = e.target.value.split(',');
		const sortedSelectedAvailability = availabilityData
			.filter((item) => selectedValues.includes(item.value))
			.map((item) => item.value);

		setAvailability(new Set(sortedSelectedAvailability));
		const availability = sortedSelectedAvailability.toString();
		setForm({ ...form, ['availability']: availability });
	};

	const languageSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedValues = e.target.value.split(',');
		const sortedSelectedLanguages = languagesData
			.filter((item) => selectedValues.includes(item.name))
			.map((item) => item.name);

		setLanguage(new Set(sortedSelectedLanguages));
		const language = sortedSelectedLanguages.toString();
		setForm({ ...form, ['language']: language });
	};

	const locationSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setLocation(e.target.value);
		setForm({ ...form, ['location']: e.target.value });
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	return (
		<form onSubmit={(e) => handleSaveClick(e)}>
			<Card className='max-w-[800px]'>
				<CardHeader className='flex flex-col gap-1 font-bold'>Edit Package</CardHeader>
				<CardBody className='w-full'>
					<div className='flex flex-col gap-4'>
						<div className='flex flex-col gap-4'>
							<Input
								value={form?.name || ''}
								name='name'
								onChange={onChange}
								type='text'
								size='sm'
								labelPlacement='outside'
								label='Package Name'
								placeholder='Enter package name'
								isRequired
							/>
							<div className='flex md:flex-row flex-col w-full items-center gap-4'>
								<Input
									value={form?.type || ''}
									name='type'
									onChange={onChange}
									type='text'
									size='sm'
									labelPlacement='outside'
									label='Type'
									placeholder='Enter type'
									className='w-full md:w-1/2'
									isRequired
								/>
								<Select
									label='Location'
									labelPlacement='outside'
									placeholder='Select Location'
									selectedKeys={[location]}
									size='sm'
									className='w-full md:w-1/2'
									onChange={locationSelectionChange}
								>
									{locationData?.map((location) => (
										<SelectItem key={location.value} value={location.value}>
											{location.value}
										</SelectItem>
									))}
								</Select>
							</div>
						</div>
						<div className='flex flex-col gap-4'>
							<Textarea
								className='w-[100%]'
								name='description'
								value={
									(form?.description &&
										form.description
											.replaceAll('\\n', '\n')
											.toString()
											.replaceAll('\\', '')) ||
									''
								}
								onChange={onChange}
								type='text'
								size='sm'
								labelPlacement='outside'
								label='Description'
								placeholder='Enter package description'
								isRequired
								minRows={10}
							/>
							<Textarea
								className='w-[100%]'
								name='notice'
								value={form?.notice || ''}
								onChange={onChange}
								type='text'
								size='sm'
								labelPlacement='outside'
								label='Notice'
								placeholder='Enter notice'
								minRows={4}
							/>
						</div>
						<div className='flex gap-4'>
							<Input
								value={form?.duration || ''}
								className='w-[50%]'
								name='duration'
								onChange={onChange}
								type='text'
								size='sm'
								min='1'
								labelPlacement='outside'
								label='Package Duration (in hours)'
								placeholder='i.e. 12, 8-10'
								isRequired
							/>
							<Tooltip
								placement='top'
								delay={500}
								closeDelay={100}
								content="Leave empty for 'No cancellation' policies."
							>
								<Input
									value={form?.cancellation || ''}
									className='w-[50%]'
									name='cancellation'
									onChange={onChange}
									type='text'
									size='sm'
									labelPlacement='outside'
									label='Cancellation Policy (in hours)'
									placeholder='i.e. 24, 48'
									isRequired
								/>
							</Tooltip>
						</div>
						<div className='flex gap-4'>
							<Select
								label='Availability'
								labelPlacement='outside'
								selectionMode='multiple'
								placeholder='Select Availability'
								selectedKeys={availability}
								size='sm'
								className='w-[50%]'
								onChange={availabilitySelectionChange}
							>
								{availabilityData?.map((availability) => (
									<SelectItem key={availability.value} value={availability.value}>
										{availability.label}
									</SelectItem>
								))}
							</Select>
							<Select
								label='Language'
								labelPlacement='outside'
								selectionMode='multiple'
								placeholder='Select Language'
								selectedKeys={language}
								size='sm'
								className='w-[50%]'
								onChange={languageSelectionChange}
							>
								{languagesData?.map((language) => (
									<SelectItem key={language.name} value={language.name}>
										{language.name}
									</SelectItem>
								))}
							</Select>
						</div>
						<Divider className='my-0' />
						<div className='flex md:flex-row flex-col gap-4'>
							<div className='flex w-full gap-4'>
								<TableRates onChange={onChange} form={form} />
							</div>
							<div className='flex flex-col w-full gap-4'>
								<TableInclusions onChange={onChange} form={form} />
								<TableExclusions onChange={onChange} form={form} />
							</div>
						</div>

						<Divider className='my-0' />
						<TableItinerary onChange={onChange} form={form} />
						<Divider className='my-0' />
						<ButtonUpload onChange={onChange} form={form} />
					</div>
				</CardBody>
				<CardFooter className='flex gap-4'>
					<Button color='default' variant='light' onPress={handleReturn} className='font-semibold'>
						Return
					</Button>
					<Button
						color='secondary'
						type='submit'
						disabled={packageLoading || isLoading}
						className={`${isLoading && ' bg-secondary/60'}`}
					>
						Save
					</Button>
				</CardFooter>
			</Card>
		</form>
	);
}
