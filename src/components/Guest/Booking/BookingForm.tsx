'use client';

import { Button, Card, CardHeader, CardBody, CardFooter, Divider, Input } from '@nextui-org/react';
import { Formik } from 'formik';
import { bookingFormSchema } from '@/utils/bookingSchema';

export const BookingForm = () => {
	return (
		<div className='sticky top-36'>
			<Formik
				initialValues={{
					fullName: '',
					email: '',
					contactNumber: '',
					localGuest: 0,
					foreignGuest: 0,
					tourDate: null,
					pickupInfo: '',
				}}
				validationSchema={bookingFormSchema}
				onSubmit={(values, { setSubmitting }) => {
					setTimeout(() => {
						alert(JSON.stringify(values, null, 2));
						setSubmitting(false);
					}, 2000);
				}}
			>
				{(formik) => (
					<form onSubmit={formik.handleSubmit} className='bg-white'>
						<Card>
							<CardHeader className='flex flex-col items-start ml-4'>
								<span className='text-3xl font-semibold'>Booking Form</span>
								<span className='font-medium'>Please fill up this form to book.</span>
							</CardHeader>
							<CardBody className='md:gap-4 gap-2'>
								<Input
									size='sm'
									isRequired
									disabled={formik.isSubmitting}
									id='fullName'
									name='fullName'
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									label='Full name'
								/>
								{formik.touched.fullName && formik.errors.fullName ? (
									<div className='text-sm text-red-700 ml-1'>{formik.errors.fullName}</div>
								) : null}
								<Input
									size='sm'
									isRequired
									disabled={formik.isSubmitting}
									id='email'
									name='email'
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									type='email'
									label='Email'
								/>
								{formik.touched.email && formik.errors.email ? (
									<div className='text-sm text-red-700 ml-1'>{formik.errors.email}</div>
								) : null}
								<Input
									size='sm'
									isRequired
									disabled={formik.isSubmitting}
									id='contactNumber'
									name='contactNumber'
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									label='Contact number (+639xxxxxxxxx)'
								/>
								{formik.touched.contactNumber && formik.errors.contactNumber ? (
									<div className='text-sm text-red-700 ml-1'>{formik.errors.contactNumber}</div>
								) : null}
								<div className='flex flex-row gap-4'>
									<Input
										size='sm'
										isRequired
										disabled={formik.isSubmitting}
										id='localGuest'
										name='localGuest'
										onBlur={formik.handleBlur}
										onChange={formik.handleChange}
										type='number'
										min='0'
										label='No. of local guests'
									/>
									{formik.touched.localGuest && formik.errors.localGuest ? (
										<div className='text-sm text-red-700 ml-1'>{formik.errors.localGuest}</div>
									) : null}
									<Input
										size='sm'
										isRequired
										disabled={formik.isSubmitting}
										id='foreignGuest'
										name='foreignGuest'
										onBlur={formik.handleBlur}
										onChange={formik.handleChange}
										type='number'
										min='0'
										label='No. of foreign guests'
									/>
									{formik.touched.foreignGuest && formik.errors.foreignGuest ? (
										<div className='text-sm text-red-700 ml-1'>{formik.errors.foreignGuest}</div>
									) : null}
								</div>
								<Input
									size='sm'
									isRequired
									disabled={formik.isSubmitting}
									id='tourDate'
									name='tourDate'
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									type='date'
									label='Tour date'
									placeholder='mm/dd/yyyy'
								/>
								{formik.touched.tourDate && formik.errors.tourDate ? (
									<div className='text-sm text-red-700 ml-1'>{String(formik.errors.tourDate)}</div>
								) : null}
								<Input
									size='sm'
									disabled={formik.isSubmitting}
									id='pickupInfo'
									name='pickupInfo'
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									label='Pick-up information'
								/>
								{formik.touched.pickupInfo && formik.errors.pickupInfo ? (
									<div className='text-sm text-red-700 ml-1'>{formik.errors.pickupInfo}</div>
								) : null}
							</CardBody>
							<CardFooter className='ml-2 mb-2 justify-center'>
								{!formik.isSubmitting ? (
									<Button
										type='submit'
										variant='ghost'
										color='secondary'
										radius='full'
										className='font-semibold w-1/2 mr-4'
									>
										Submit
									</Button>
								) : (
									<Button
										isLoading
										variant='solid'
										color='secondary'
										radius='full'
										className='font-semibold w-1/2 mr-4'
									>
										Submit
									</Button>
								)}
							</CardFooter>
						</Card>
					</form>
				)}
			</Formik>
		</div>
	);
};
